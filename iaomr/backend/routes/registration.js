const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const upload = require("../middleware/upload");


const Registration = require("../models/Registration");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function generateRegNumber(category) {
  const year = new Date().getFullYear();

  // CATEGORY PREFIX
  const categoryMap = {
    "Post Graduate": "PG",
    Faculty: "FAC",
    Practitioner: "PRA",
    "Foreign Delegate": "FOR",
  };

  const prefix = categoryMap[category] || "GEN";

  // FIND LAST REGISTRATION
  const lastRegistration = await Registration.findOne({
    regNumber: new RegExp(`^IAOMR-${year}-${prefix}`),
  })
    .sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastRegistration) {
    const lastRegNo = lastRegistration.regNumber;

    // EXTRACT NUMBER
    const match = lastRegNo.match(/(\d+)$/);

    if (match) {
      nextNumber = parseInt(match[1]) + 1;
    }
  }

  // PAD WITH ZEROS
  const paddedNumber = String(nextNumber).padStart(2, "0");

  return `IAOMR-${year}-${prefix}${paddedNumber}`;
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

    res.status(500).json({
      message: "Order creation failed",
    });
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
const mongoose = require("mongoose");

router.post("/verify-payment", (req, res, next) => {
  console.log("🔥 HIT VERIFY ROUTE");
  next();
},
  upload.single("photo"),
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
      } = req.body;

      if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature
      ) {
        return res.status(400).json({
          message: "Missing Razorpay fields",
        });
      }

      if (!req.body.form) {
        return res
          .status(400)
          .json({ message: "Form data missing" });
      }

      let form;

      try {
        form = JSON.parse(req.body.form);
      } catch (err) {
        return res.status(400).json({
          message: "Invalid form JSON",
        });
      }

      // VERIFY SIGNATURE
      const body =
        razorpay_order_id +
        "|" +
        razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(body.toString())
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return res
          .status(400)
          .json({ message: "Invalid signature" });
      }

      // GENERATE UNIQUE REG NUMBER
      const regNumber = await generateRegNumber(
        form.category
      );

      // GENERATE QR
      const qrData = JSON.stringify({
        regNumber,
        name: form.name,
        paymentId: razorpay_payment_id,
      });

      const qrCode = await QRCode.toDataURL(qrData);

      // CREATE REGISTRATION OBJECT
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

      // SAVE TO DB
      await registration.save();

      console.log("✅ SAVED:", registration.regNumber);

      // GENERATE PDF
      const pdfBuffer = await generatePDF(
        registration
      );

      // SEND EMAIL
      sendEmail(registration.email, pdfBuffer)
        .then(() =>
          console.log("✅ Email sent")
        )
        .catch((err) =>
          console.error("❌ Email failed:", err)
        );

      // SEND RESPONSE
      res.json({
        success: true,
        regNumber: registration.regNumber,
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);
router.get("/photo/:id", async (req, res) => {
  try {
    const registration =
      await Registration.findById(req.params.id);

    if (
      !registration ||
      !registration.photo ||
      !registration.photo.data
    ) {
      return res.status(404).send("No photo");
    }

    res.set(
      "Content-Type",
      registration.photo.contentType
    );

    res.send(registration.photo.data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});


/* =========================
   GET REGISTRATION (for success page)
========================= */
router.get("/:regNumber", async (req, res) => {
  try {
    const data = await Registration.findOne({
      regNumber: req.params.regNumber,
    }).select("-photo");

    res.json(data);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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
/* =========================
   EMAIL
========================= */
async function sendEmail(registration, pdfBuffer) {

  // CATEGORY-BASED WHATSAPP LINKS
  const whatsappLinks = {
    "Post Graduate":
      "https://chat.whatsapp.com/PG-LINK",

    Faculty:
      "https://chat.whatsapp.com/FACULTY-LINK",

    Practitioner:
      "https://chat.whatsapp.com/PRACTITIONER-LINK",

    "Foreign Delegate":
      "https://chat.whatsapp.com/FOREIGN-LINK",
  };

  const whatsappLink =
    whatsappLinks[registration.category] ||
    "https://chat.whatsapp.com/GENERAL-LINK";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    
    <h2 style="color:#0b5394;">
      Registration Confirmed – Your ID & Payment Receipt
    </h2>

    <p>
      Dear Dr. <strong>${registration.name}</strong>,
    </p>

    <p>
      Thank you for registering for the
      <strong>24th NATIONAL IAOMR PG CONVENTION 2026</strong>,
      scheduled to be held from
      <strong>6th to 8th August 2026</strong>
      at
      <strong>
        Anil Neerukonda Institute Of Dental Sciences,
        Visakhapatnam, Andhra Pradesh
      </strong>.
    </p>

    <p>
      We are pleased to confirm that your registration
      has been successfully completed and your payment
      has been received.
    </p>

    <hr />

    <h3>📋 REGISTRATION DETAILS</h3>

    <p>
      <strong>🪪 Registration ID:</strong>
      ${registration.regNumber}
    </p>

    <p>
      <strong>👤 Registered Name:</strong>
      ${registration.name}
    </p>

    <p>
      <strong>📧 Email Address:</strong>
      ${registration.email}
    </p>

    <p>
      <strong>📦 Category:</strong>
      ${registration.category}
    </p>

    <hr />

    <h3>Registration Includes:</h3>

    <p>
      2 Breakfasts, 2 Lunches, 1 Gala Banquet, Gift,
      Attendance Certificate & Visit to Trade Exhibition,
      Inclusive of 18% GST.
    </p>

    <p>
      If you need any corrections to your name spelling,
      kindly inform us in advance.
    </p>

    <p>
      Please find your official payment receipt attached
      to this email for your records.
    </p>

    <hr />

    <h3>📲 WhatsApp Group</h3>

    <p>
      Join your category WhatsApp group:
    </p>

    <p>
      <a
        href="${whatsappLink}"
        style="
          background:#25D366;
          color:white;
          padding:10px 18px;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
        "
      >
        Join WhatsApp Group
      </a>
    </p>

    <hr />

    <h3>📞 Contact Information</h3>

    <p><strong>For Registration Queries:</strong></p>
    <p>
      Dr. B Badari Ramakrishna -
      +91 9885426232
    </p>

    <p>
      Dr. V Rahul Marshal -
      +91 9848720046
    </p>

    <p><strong>For Scientific Queries:</strong></p>
    <p>
      Dr. N. Rajesh -
      +91 9885067499
    </p>

    <p><strong>For Hospitality and Accommodation:</strong></p>

    <p>
      Dr. K.V. Lokesh -
      +91 9885164196
      (Preferably WhatsApp)
    </p>

    <p>
      📧 24thiaomrpgconvention2026@gmail.com
    </p>

    <p>
      🌐 www.iaomrpgconvene2026.com
    </p>

    <br />

    <p>
      We look forward to welcoming you to the
      IAOMR 24th National PG Convention, 2026.
    </p>

    <br />

    <p>
      Warm regards,<br />
      <strong>Organizing Committee</strong><br />
      24th National IAOMR PG Convention, 2026
    </p>

  </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: registration.email,

    subject:
      "Registration Confirmed – Your ID & Payment Receipt—IAOMR 24th National PG Convention 2026",

    html,

    attachments: [
      {
        filename: "receipt.pdf",
        content: pdfBuffer,
      },
    ],
  });
}

module.exports = router;