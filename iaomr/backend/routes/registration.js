const express = require("express")
const router = express.Router()

const Razorpay = require("razorpay")
const crypto = require("crypto")
const PDFDocument = require("pdfkit")
const QRCode = require("qrcode")

const upload = require("../middleware/upload")

const Registration = require("../models/Registration")
const Counter = require("../models/Counter")

const {
  generatePDF,
  sendEmail,
} = require("../utils/pdfemail");

/* =========================
   RAZORPAY INIT
========================= */  

const razorpay = new Razorpay({
  key_id:
    process.env.RAZORPAY_KEY_ID,

  key_secret:
    process.env.RAZORPAY_KEY_SECRET,
})

/* =========================
   REG NUMBER GENERATOR
========================= */

async function generateRegNumber(
  category
) {
  const year =
    new Date().getFullYear()

  const categoryMap = {
    "Post Graduate": "PG",
    Faculty: "FAC",
    Practitioner: "PRA",
    "Foreign Delegate": "FOR",
  }

  const prefix =
    categoryMap[category] || "GEN"

  const counterKey =
    `IAOMR-${year}-${prefix}`

  const counter =
    await Counter.findOneAndUpdate(
      { key: counterKey },
      { $inc: { seq: 1 } },
      {
        new: true,
        upsert: true,
      }
    )

  const paddedNumber = String(
    counter.seq
  ).padStart(2, "0")

  return `${counterKey}${paddedNumber}`
}

/* =========================
   PDF GENERATOR
========================= */

// function generatePDF(data) {
//   return new Promise((resolve) => {
//     const doc = new PDFDocument()

//     const buffers = []

//     doc.on(
//       "data",
//       buffers.push.bind(buffers)
//     )

//     doc.on("end", () =>
//       resolve(Buffer.concat(buffers))
//     )

//     doc
//       .fontSize(18)
//       .text("Registration Receipt", {
//         align: "center",
//       })

//     doc.moveDown()

//     doc.text(`Name: ${data.name}`)
//     doc.text(`Email: ${data.email}`)
//     doc.text(`Phone: ${data.phone}`)

//     doc.text(
//       `Reg No: ${data.regNumber}`
//     )

//     doc.text(`Amount: ₹${data.amount}`)

//     doc.end()
//   })
// }

/* =========================
   CREATE ORDER
========================= */

router.post(
  "/create-order",
  async (req, res) => {
    try {
      const { amount } = req.body

      if (!amount || isNaN(amount)) {
        return res.status(400).json({
          message: "Invalid amount",
        })
      }

      const order =
        await razorpay.orders.create({
          amount:
            Number(amount) * 100,

          currency: "INR",

          payment_capture: 1,
        })

      res.json(order)
    } catch (err) {
      console.error(err)

      res.status(500).json({
        message:
          "Order creation failed",
      })
    }
  }
)

/* =========================
   VERIFY PAYMENT
========================= */

router.post(
  "/verify-payment",
  upload.single("photo"),
  async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
      } = req.body

      if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature
      ) {
        return res.status(400).json({
          message:
            "Missing Razorpay fields",
        })
      }

      if (!req.body.form) {
        return res.status(400).json({
          message: "Form missing",
        })
      }

      const form = JSON.parse(
        req.body.form
      )

      const body =
        razorpay_order_id +
        "|" +
        razorpay_payment_id

      const expectedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(body)
          .digest("hex")

      if (
        expectedSignature !==
        razorpay_signature
      ) {
        return res.status(400).json({
          message: "Invalid signature",
        })
      }

      const regNumber =
        await generateRegNumber(
          form.category
        )

      const qrCode =
        await QRCode.toDataURL(
          JSON.stringify({
            regNumber,
            name: form.name,
            paymentId:
              razorpay_payment_id,
          })
        )

      const registration =
        new Registration({
          ...form,

          amount,

          paymentId:
            razorpay_payment_id,

          orderId:
            razorpay_order_id,

          regNumber,

          qrCode,

          status: "PAID",

          photo: req.file
            ? {
              data: req.file.buffer,
              contentType:
                req.file.mimetype,
            }
            : undefined,
        })

      await registration.save()

      try {
        const pdfBuffer = await generatePDF({
          name: registration.name,
          email: registration.email,
          phone: registration.phone,
          regNumber: registration.regNumber,
          amount: registration.amount,
        })

        await sendEmail(registration, pdfBuffer)

        console.log(
          `Confirmation email sent to ${registration.email}`
        )
      } catch (emailErr) {
        console.error(
          "Email sending failed:",
          emailErr
        )
      }

      res.json({
        success: true,
        regNumber,
      })
    } catch (err) {
      console.error(err)

      res.status(500).json({
        message:
          "Payment verification failed",
      })
    }
  }
)

/* =========================
   GET ALL REGISTRATIONS
========================= */

router.get(
  "/",
  async (req, res) => {
    try {
      const page =
        parseInt(req.query.page) || 1

      const limit =
        parseInt(req.query.limit) || 15

      const skip =
        (page - 1) * limit

      const search =
        req.query.search || ""

      const status =
        req.query.status || ""

      const category =
        req.query.category || ""

      const query = {}

      /* SEARCH */
      if (search) {
        query.$or = [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },

          {
            email: {
              $regex: search,
              $options: "i",
            },
          },

          {
            regNumber: {
              $regex: search,
              $options: "i",
            },
          },
        ]
      }

      /* STATUS */
      if (status) {
        query.status = status
      }

      /* CATEGORY */
      if (category) {
        query.category = category
      }

      /* TOTAL */
      const total =
        await Registration.countDocuments(
          query
        )

      /* DATA */
      const data =
        await Registration.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .select("-photo")

      res.json({
        data,
        total,
        page,
        totalPages:
          Math.ceil(total / limit),
      })
    } catch (err) {
      console.error(err)

      res.status(500).json({
        message:
          "Failed to fetch registrations",
      })
    }
  }
)





/* =========================
   EXPORT ALL REGISTRATIONS
========================= */

router.get("/export", async (req, res) => {
  try {
    const { search = "", status = "", category = "" } = req.query

    const query = {}

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          regNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ]
    }

    if (status) {
      query.status = status
    }

    if (category) {
      query.category = category
    }

    const registrations = await Registration.find(query)
      .sort({ createdAt: -1 })
      .select("-photo")

    res.json({
      success: true,
      count: registrations.length,
      data: registrations,
    })
  } catch (err) {
    console.error(err)

    res.status(500).json({
      success: false,
      message: "Export failed",
    })
  }
})







/* =========================
   UPDATE STATUS
========================= */

router.put(
  "/:id/verify",
  async (req, res) => {
    try {
      const { status } = req.body

      const registration =
        await Registration.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        )

      if (!registration) {
        return res.status(404).json({
          message:
            "Registration not found",
        })
      }

      res.json({
        success: true,
        registration,
      })
    } catch (err) {
      console.error(err)

      res.status(500).json({
        message:
          "Failed to update status",
      })
    }
  }
)



/* =========================
   PHOTO ROUTE
========================= */
router.get("/photo/reg/:regNumber", async (req, res) => {
  try {
    const registration = await Registration.findOne({
      regNumber: req.params.regNumber,
    });

    if (!registration) {
      return res.status(404).send("Registration not found");
    }

    if (!registration.photo || !registration.photo.data) {
      return res.status(404).send("No photo");
    }

    res.set("Content-Type", registration.photo.contentType);
    res.send(registration.photo.data);
  } catch (err) {
    console.error(err);
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
        })

      if (!registration) {
        return res.status(404).json({
          success: false,
          message:
            "Registration not found",
        })
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
      })
    } catch (err) {
      console.error(err)

      res.status(500).json({
        success: false,
        message: "Server Error",
      })
    }
  }
)


/* =========================
   GET BY REG NUMBER
   MUST BE LAST
========================= */

router.get(
  "/:regNumber",
  async (req, res) => {
    try {
      const data =
        await Registration.findOne({
          regNumber:
            req.params.regNumber,
        }).select("-photo")

      if (!data) {
        return res.status(404).json({
          message:
            "Registration not found",
        })
      }

      res.json(data)
    } catch (err) {
      res.status(500).json({
        message: err.message,
      })
    }
  }
)

module.exports = router