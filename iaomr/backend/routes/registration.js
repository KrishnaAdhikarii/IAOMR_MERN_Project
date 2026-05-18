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

  const paddedNumber = String(nextNumber).padStart(2, "0");

  return `IAOMR-${year}-${prefix}${paddedNumber}`;
}

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
    doc.text(`Phone: ${data.phone || "N/A"}`);
    doc.text(`Reg No: ${data.regNumber}`);
    doc.text(`Amount: ₹${data.amount}`);

    doc.end();
  });
}

/* =========================
   EMAIL FUNCTION
========================= */
async function sendEmail(registration, pdfBuffer) {
  console.log("MAIL FUNCTION CALLED");

  const whatsappLinks = {
    "Post Graduate": "https://chat.whatsapp.com/PG-LINK",
    Faculty: "https://chat.whatsapp.com/FACULTY-LINK",
    Practitioner: "https://chat.whatsapp.com/PRACTITIONER-LINK",
    "Foreign Delegate": "https://chat.whatsapp.com/FOREIGN-LINK",
  };

  const whatsappLink =
    whatsappLinks[registration.category] ||
    "https://chat.whatsapp.com/GENERAL-LINK";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("SMTP VERIFIED SUCCESSFULLY");
  } catch (err) {
    console.error("SMTP VERIFY FAILED:", err);
  }

  const html = `
    <div style="font-family:Arial;">
      <h2>Registration Confirmed</h2>
      <p>Dear Dr. <b>${registration.name}</b></p>

      <p><b>ID:</b> ${registration.regNumber}</p>
      <p><b>Email:</b> ${registration.email}</p>
      <p><b>Category:</b> ${registration.category}</p>

      <a href="${whatsappLink}">Join WhatsApp Group</a>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"IAOMR Registration" <${process.env.EMAIL_USER}>`,
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

    console.log("MAIL SENT:", info.messageId);
  } catch (err) {
    console.error("EMAIL FAILED:", err);
  }
}

/* =========================
   CREATE ORDER
========================= */
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount" });
    }

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
   TEST EMAIL
========================= */
router.get("/test-email", async (req, res) => {
  try {
    await sendEmail(
      {
        name: "Test User",
        email: "krishnaadhikari0213@gmail.com",
        regNumber: "TEST001",
        category: "Post Graduate",
      },
      Buffer.from("Test PDF")
    );

    console.log("INSIDE EMAIL FUNCTION");

    res.send("Email sent");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

/* =========================
   VERIFY PAYMENT
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

      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ message: "Invalid signature" });
      }

      const regNumber = await generateRegNumber(form.category);

      const qrCode = await QRCode.toDataURL(
        JSON.stringify({
          regNumber,
          name: form.name,
          paymentId: razorpay_payment_id,
        })
      );

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

      res.json({
        success: true,
        regNumber,
      });

      /* =========================
         BACKGROUND EMAIL
      ========================= */
      setImmediate(() => {
        (async () => {
          try {
            const pdfBuffer = await generatePDF(registration);
            await sendEmail(registration, pdfBuffer);
          } catch (err) {
            console.error("EMAIL ERROR:", err);
          }
        })();
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Payment verification failed" });
    }
  }
);

/* =========================
   PHOTO ROUTE
========================= */
router.get("/photo/:id", async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration || !registration.photo) {
      return res.status(404).send("No photo");
    }

    res.set("Content-Type", registration.photo.contentType);
    res.send(registration.photo.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/* =========================
   GET BY REG NUMBER (MUST BE LAST)
========================= */
router.get("/:regNumber", async (req, res) => {
  try {
    const data = await Registration.findOne({
      regNumber: req.params.regNumber,
    }).select("-photo");

    if (!data) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;