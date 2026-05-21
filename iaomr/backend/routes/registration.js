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
const Counter = require("../models/Counter");

async function generateRegNumber(category) {
  const year = new Date().getFullYear();

  const categoryMap = {
    "Post Graduate": "PG",
    Faculty: "FAC",
    Practitioner: "PRA",
    "Foreign Delegate": "FOR",
  };

  const prefix = categoryMap[category] || "GEN";

  // unique counter key
  const counterKey = `IAOMR-${year}-${prefix}`;

  // atomic increment
  const counter = await Counter.findOneAndUpdate(
    { key: counterKey },
    { $inc: { seq: 1 } },
    {
      new: true,
      upsert: true,
    }
  );

  const paddedNumber = String(counter.seq).padStart(2, "0");

  return `${counterKey}${paddedNumber}`;
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
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(registration, pdfBuffer) {
  console.log("📧 RESEND EMAIL FUNCTION CALLED");

  const whatsappLinks = {
    "Post Graduate":
      "https://chat.whatsapp.com/ECIKNDPyLPPLcjDrwPl8yG?mode=gi_t",
    Faculty: "https://chat.whatsapp.com/LeN7dANe12nJBtbkmdt8K3",
    Practitioner: "https://chat.whatsapp.com/LeN7dANe12nJBtbkmdt8K3",
    "Foreign Delegate": "https://chat.whatsapp.com/LeN7dANe12nJBtbkmdt8K3",
  };

  // fallback link if category not found
  const whatsappLink =
    whatsappLinks[registration.category] ||
    "https://chat.whatsapp.com/ECIKNDPyLPPLcjDrwPl8yG?mode=gi_t";

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    
    <h2 style="color:#0b5394;">
      Registration Confirmed 
    </h2>

    <p>Dear Dr. <b>${registration.name}</b>,</p>

    <p>
      Thank you for registering for the 
      <b>24th NATIONAL IAOMR PG CONVENTION 2026</b>, 
      scheduled from <b>6th to 8th August 2026</b> at 
      <b>Anil Neerukonda Institute of Dental Sciences (ANIDS)</b>,
      Visakhapatnam, Andhra Pradesh.
    </p>

    <p>
      We are pleased to confirm that your registration has been
      successfully completed and your payment has been received.
    </p>

    <hr />

    <h3>📋 Registration Details</h3>

    <p>🪪 <b>Registration ID:</b> ${registration.regNumber}</p>
    <p>👤 <b>Registered Name:</b> ${registration.name}</p>
    <p>📧 <b>Email Address:</b> ${registration.email}</p>
    <p>📦 <b>Category:</b> ${registration.category}</p>

    <hr />

    <p>
      <b>Registration Includes:</b><br/>
      • 2 Breakfasts<br/>
      • 2 Lunches<br/>
      • 1 Gala Banquet<br/>
      • Delegate Gift<br/>
      • Attendance Certificate<br/>
      • Access to Trade Exhibition<br/>
      • Inclusive of 18% GST
    </p>

    <p>
      If you require any corrections to your registered details,
      kindly inform us in advance.
    </p>

    <h3>📞 Contact Details</h3>

    <p>
      <b>For Registration Queries:</b><br/>
      Dr. B Badari Ramakrishna – +91 9885426232<br/>
      Dr. V Rahul Marshal – +91 9848720046
    </p>

    <p>
      <b>For Scientific Queries:</b><br/>
      Dr. N. Rajesh – +91 9885067499
    </p>

    <p>
      <b>For Hospitality & Accommodation:</b><br/>
      Dr. K.V. Lokesh – +91 9885164196 (Preferably WhatsApp)<br/>
      Email: 24thiaomrpgconvention2026@gmail.com
    </p>

    <p>
      Website:
      <a href="https://iaomrpgconvene2026.com">
        www.iaomrpgconvene2026.com
      </a>
    </p>

    <p>
      Please join the WhatsApp group for 
      <b>${registration.category}</b> delegates
      for important updates and communication.
    </p>

    <p>
      <a
        href="${whatsappLink}"
        style="
          display:inline-block;
          padding:10px 18px;
          background:#25D366;
          color:white;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
        "
      >
        Join WhatsApp Group
      </a>
    </p>

    <p>
      <a
        href="https://www.instagram.com/24thiaomr_nationalpgconvention?igsh=MW1ldGNlY3V4b3Rmeg%3D%3D&utm_source=qr"
        style="
          display:inline-block;
          padding:10px 18px;
          background:#F472B6;
          color:black;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
        "
      >
        Follow US on Instagram
      </a>
    </p>

    <br/>

    <img
      src="https://iaomrpgconvene2026.com/assets/AnidsLogo-CEqdCiRq.jpeg"
      alt=" Logo"
      style="width:150px;"
    />

    <p style="margin-top:20px;">
      Anil Neerukonda Institute of Dental Sciences (ANIDS)<br/>
      Sangivalasa, Bheemunipatnam Mandal,<br/>
      Visakhapatnam District, Andhra Pradesh<br/>
      Phone: +91 8008901278; <a href="https://www.anids.edu.in" target="_blank">www.anids.edu.in</a>
    </p>

    <p>
      We look forward to welcoming you to the
      <b>IAOMR 24th National PG Convention 2026</b>.
    </p>

    <p>
      Warm regards,<br/>
      <b>Organizing Committee</b><br/>
      24th National IAOMR PG Convention 2026
    </p>

  </div>
  `;

  try {
    const result = await resend.emails.send({
      from:
        "IAOMR Registration <anidsomrvizag@iaomrpgconvene2026.com>",

      to: registration.email,

      subject:
        "Registration Confirmed - IAOMR PG CONVENTION 2026",

      html,

      // attachments: [
      //   {
      //     filename: "receipt.pdf",
      //     content: pdfBuffer.toString("base64"),
      //   },
      // ],
    });

    console.log("✅ EMAIL SENT:", result);

    return result;
  } catch (err) {
    console.error("❌ RESEND EMAIL ERROR:", err);
    throw err;
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

      try {
        await registration.save();
      } catch (err) {
        if (err.code === 11000) {
          return res.status(409).json({
            message: "Duplicate registration detected",
          });
        }

        throw err;
      }
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
   CHECK REGISTRATION
========================= */

router.get(
  "/check/:id",
  async (req, res) => {
    try {

      const registration =
        await Registration.findOne({
          regNumber: req.params.id,
        });

      if (!registration) {
        return res.status(404).json({
          success: false,
          message:
            "Registration not found",
        });
      }

      res.json({
        success: true,

        registration: {
          fullName:
            registration.name,

          email:
            registration.email,

          phone:
            registration.phone,

          institution:
            registration.institution,
        },
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  }
);

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