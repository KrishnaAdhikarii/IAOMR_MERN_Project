const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const Abstract = require("../models/Abstract");

// 🔍 Get Registration ID by Email
router.post("/registration-id", async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    email = email.trim().toLowerCase();

    const user = await Registration.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No registration found with this email",
      });
    }

    return res.status(200).json({
      success: true,
      registrationId: user.regNumber ,
    });

  } catch (error) {
    console.error("❌ Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// 📄 (Future) Abstract Status
// 📄 Abstract Status
router.post("/abstract-status", async (req, res) => {
  try {
    let { email, registrationId } = req.body;

    if (!email || !registrationId) {
      return res.status(400).json({
        success: false,
        message: "Email and Registration ID are required",
      });
    }

    email = email.trim().toLowerCase();
    registrationId = registrationId.trim();

    const abstract = await Abstract.findOne({
      registrationId,
      email: { $regex: `^${email}$`, $options: "i" },
    }).select(
      "abstractId title author category presentationType status reviewerRemarks updatedAt"
    );

    if (!abstract) {
      return res.status(404).json({
        success: false,
        message: "No abstract submission found",
      });
    }

    return res.status(200).json({
      success: true,
      data: abstract,
    });
  } catch (error) {
    console.error("❌ Abstract Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// 📊 (Future) Presentation Status
router.post("/presentation-status", async (req, res) => {
  res.json({
    success: true,
    message: "Presentation status endpoint coming soon",
  });
});

module.exports = router;