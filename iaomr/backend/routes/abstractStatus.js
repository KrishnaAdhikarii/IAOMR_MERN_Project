const express = require("express");
const router = express.Router();

const Registration = require("../models/Registration");
const Abstract = require("../models/Abstract");

/* ───────────────────────────────
   🔍 1. Get Registration ID by Email
─────────────────────────────── */
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
      registrationId: user.regNumber,
    });
  } catch (error) {
    console.error("❌ Registration ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ───────────────────────────────
   📄 2. Get Abstract Status
   (BY EMAIL or REGISTRATION ID)
─────────────────────────────── */
router.post("/abstract-status", async (req, res) => {
  try {
    let { searchValue } = req.body;

    if (!searchValue) {
      return res.status(400).json({
        success: false,
        message: "Email or Registration ID is required",
      });
    }

    const value = searchValue.trim();

    const query = value.includes("@")
      ? {
          email: { $regex: `^${value}$`, $options: "i" },
        }
      : {
          registrationId: value,
        };

    const abstract = await Abstract.findOne(query).select(
      "abstractId title author category presentationType status reviewerRemarks updatedAt"
    );

    if (!abstract) {
      return res.status(404).json({
        success: false,
        message: "No abstract found",
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

/* ───────────────────────────────
   📊 3. Presentation Status (Future)
─────────────────────────────── */
router.post("/presentation-status", async (req, res) => {
  return res.json({
    success: true,
    message: "Presentation status endpoint coming soon",
  });
});

module.exports = router;