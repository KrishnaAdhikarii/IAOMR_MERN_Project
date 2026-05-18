const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const upload = require("../middleware/upload");
const mongoose = require("mongoose");

const Registration = require("../models/Registration");

/* =========================
   RAZORPAY INIT
========================= */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* =========================
   REG NUMBER GENERATOR
========================= */
async function generateRegNumber(category) {
  const year = new Date().getFullYear();

  const categoryMap = {
    "Post Graduate": "PG",
    Faculty: "FAC",
    Practitioner: "PRA",
    "Foreign Delegate": "FOR",
  };

  const prefix = categoryMap[category] || "GEN";

  const lastRegistration = await Registration.findOne({
    regNumber: new RegExp(`^IAOMR-${year}-${prefix}`),
  }).sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastRegistration) {
    const match = lastRegistration.regNumber.match(/(\d+)$/);
    if (match) nextNumber = parseInt(match[1]) + 1;
  }

  return `IAOMR-${year}-${prefix}${String(nextNumber).padStart(2, "0")}`;
}

/* =========================
   CREATE ORDER
========================= */
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      payment_capture: 1,
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

/* =========================
   PDF GENERATOR
========================= */
function generatePDF(data) {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    doc.fontSize(18).text("Registration Receipt", { align: "center" });
    doc.moveDown();

    doc.text(`Name: ${data.name}`);
    doc.text(`Email: ${data.email}`);
    doc.text(`Phone: ${data.phone}`);
    doc.text(`Reg No: ${data.regNumber}`);
    doc.text(`Amount: ₹${data.amount}`);

    doc.end();
  });
}

/* =========================
   TRANSPORTER (GLOBAL - FIXED)
========================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // MUST BE APP PASSWORD
  },
});

/* =========================
   EMAIL FUNCTION
========================= */
async function sendEmail(registration, pdfBuffer) {

  const whatsappLinks = {
    "Post Graduate": "https://chat.whatsapp.com/PG-LINK",
    Faculty: "https://chat.whatsapp.com/FACULTY-LINK",
    Practitioner: "https://chat.whatsapp.com/PRA-LINK",
    "Foreign Delegate": "https://chat.whatsapp.com/FOREIGN-LINK",
  };

  const whatsappLink =
    whatsappLinks[registration.category] ||
    "https://chat.whatsapp.com/GENERAL-LINK";

  const html = `
  <div style="font-family:Arial; line-height:1.6;">
    <h2>Registration Confirmed</h2>

    <p>Dear Dr. <b>${registration.name}</b>,</p>

    <p>Your registration is confirmed for IAOMR 2026.</p>

    <h3>Details:</h3>
    <p><b>ID:</b> ${registration.regNumber}</p>
    <p><b>Name:</b> ${registration.name}</p>
    <p><b>Email:</b> ${registration.email}</p>
    <p><b>Category:</b> ${registration.category}</p>

    <h3>WhatsApp Group</h3>
    <a href="${whatsappLink}">Join Group</a>
  </div>
  `;

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: registration.email,
    subject: "Registration Confirmed - IAOMR 2026",
    html,
    attachments: [
      {
        filename: "receipt.pdf",
        content: pdfBuffer,
      },
    ],
  });

  console.log("MAIL RESPONSE:", info.messageId);
}

/* =========================
   VERIFY PAYMENT ROUTE (FIXED)
========================= */
router.post(
  "/verify-payment",
  upload.single("photo"),
  async (req, res) => {
    try {
      console.log("VERIFY HIT");

      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
      } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ message: "Missing Razorpay fields" });
      }

      if (!req.body.form) {
        return res.status(400).json({ message: "Form missing" });
      }

      const form = JSON.parse(req.body.form);

      // VERIFY SIGNATURE
      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ message: "Invalid signature" });
      }

      // REG NUMBER
      const regNumber = await generateRegNumber(form.category);

      // QR
      const qrCode = await QRCode.toDataURL(
        JSON.stringify({
          regNumber,
          name: form.name,
          paymentId: razorpay_payment_id,
        })
      );

      // SAVE DB
      const registration = new Registration({
        ...form,
        amount,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        regNumber,
        qrCode,
        status: "PAID",
        photo: req.file
          ? {
              data: req.file.buffer,
              contentType: req.file.mimetype,
            }
          : undefined,
      });

      await registration.save();

      console.log("SAVED:", regNumber);

      // 🔥 SEND RESPONSE FIRST (IMPORTANT FIX)
      res.json({
        success: true,
        regNumber,
      });

      // 🔥 EMAIL IN BACKGROUND (NO TIMEOUT)
      (async () => {
        try {
          const pdfBuffer = await generatePDF(registration);
          await sendEmail(registration, pdfBuffer);
          console.log("EMAIL SENT SUCCESS");
        } catch (err) {
          console.error("EMAIL ERROR:", err);
        }
      })();

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;