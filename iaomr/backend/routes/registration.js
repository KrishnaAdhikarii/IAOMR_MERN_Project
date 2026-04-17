const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");


const Registration = require("../models/Registration");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

function generateRegNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `IAOMR-${year}-${random}`;
}

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
router.get("/test-email", async (req, res) => {
  try {
    await sendEmail("krishnaadhikari0213@gmail.com", Buffer.from("Test"));
    res.send("Email sent");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
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

    // ✅ Generate Reg No
    let regNumber;
    let exists = true;

    while (exists) {
      regNumber = generateRegNumber();
      const check = await Registration.findOne({ regNumber });
      if (!check) exists = false;
    }

    // ✅ Generate QR
    const qrData = JSON.stringify({
      regNumber,
      name: form.name,
      paymentId: razorpay_payment_id,
    });

    const qrCode = await QRCode.toDataURL(qrData);

    // ✅ Save
    const registration = await Registration.create({
      name: form.name,
      email: form.email,
      phone: form.phone,
      category: form.category,
      amount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "PAID",
      regNumber,
      qrCode,
      formData: form,
    });


    res.json({
      success: true,
      regNumber,
      qrCode,
      amount,
      name: registration.name,
    });

    console.log("VERIFY HIT");
console.log("Generated Reg:", regNumber);

    const pdfBuffer = await generatePDF(registration);
    sendEmail(registration.email, pdfBuffer)
      .then(() => console.log("Email sent"))
      .catch(err => console.error("Email failed:", err));

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


/* =========================
   GET REGISTRATION (for success page)
========================= */
router.get("/:regNumber", async (req, res) => {
  try {
    const data = await Registration.findOne({
      regNumber: req.params.regNumber,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* =========================
   PDF
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
   EMAIL
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
    subject: "Registration Successful",
    text: "Your registration is confirmed. Receipt attached.",
    attachments: [
      {
        filename: "receipt.pdf",
        content: pdfBuffer,
      },
    ],
  });
}

module.exports = router;