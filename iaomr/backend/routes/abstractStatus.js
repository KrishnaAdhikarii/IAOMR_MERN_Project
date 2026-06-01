const express = require("express");
const router = express.Router();
const Abstract = require("../models/Abstract");

router.post("/abstract", async (req, res) => {
  try {
    const { searchValue } = req.body;

    if (!searchValue) {
      return res.status(400).json({
        success: false,
        message: "Email or Registration Number is required",
      });
    }

    const value = searchValue.trim();

    const query = value.includes("@")
      ? {
          email: {
            $regex: `^${value}$`,
            $options: "i",
          },
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
        message: "Abstract not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: abstract,
    });
  } catch (error) {
    console.error("Abstract Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;