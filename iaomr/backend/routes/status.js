const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

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
router.post("/abstract-status", async (req, res) => {
  res.json({
    success: true,
    message: "Abstract status endpoint coming soon",
  });
});


// 📊 (Future) Presentation Status
router.post("/presentation-status", async (req, res) => {
  res.json({
    success: true,
    message: "Presentation status endpoint coming soon",
  });
});

module.exports = router;