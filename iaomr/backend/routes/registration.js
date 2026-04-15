const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const Registration = require("../models/Registration");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* =========================
   CREATE ORDER
========================= */
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      payment_capture: 1,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
});
// hh

/* =========================
   VERIFY PAYMENT + SAVE + EMAIL
========================= */
router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      form,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const registration = await Registration.create({
      ...form,
      amount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "PAID",
    });

    const pdfBuffer = await generatePDF(registration);

    await sendEmail(registration.email, pdfBuffer);

    res.json({
      success: true,
      message: "Payment verified & registration saved",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification failed" });
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

    doc.fontSize(12).text(`Name: ${data.name}`);
    doc.text(`Email: ${data.email}`);
    doc.text(`Phone: ${data.phone}`);
    doc.text(`Category: ${data.category}`);
    doc.text(`Amount Paid: ₹${data.amount}`);
    doc.text(`Payment ID: ${data.paymentId}`);
    doc.text(`Order ID: ${data.orderId}`);

    doc.end();
  });
}

/* =========================
   EMAIL SENDER
========================= */
async function sendEmail(to, pdfBuffer) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Registration Receipt - IAOMR",
    text: "Your registration is successful. Receipt attached.",
    attachments: [
      {
        filename: "receipt.pdf",
        content: pdfBuffer,
      },
    ],
  });
}

module.exports = router;