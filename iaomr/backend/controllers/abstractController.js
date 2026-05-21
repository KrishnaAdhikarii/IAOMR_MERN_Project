const Abstract = require("../models/Abstract");

const Registration = require(
  "../models/Registration"
);

// ==============================
// GENERATE ABSTRACT ID
// ==============================

const generateAbstractId = (
  presentationType,
  count
) => {
  const prefix =
    presentationType === "Paper"
      ? "P"
      : "PO";

  return `IAOMR2026-${prefix}-${String(
    count
  ).padStart(4, "0")}`;
};

// ==============================
// WORD COUNT
// ==============================

const countWords = (text) => {
  return (
    text
      ?.trim()
      ?.split(/\s+/)
      ?.filter(Boolean).length || 0
  );
};

// ==============================
// SUBMIT ABSTRACT
// ==============================

exports.submitAbstract = async (
  req,
  res,
  next
) => {
  try {

    const {
      registrationId,
      title,
      presentationType,
      abstractFormat,
      category,
      reviewCategory,
      introduction,
      aimsObjectives,
      materialsMethods,
      results,
      conclusion,
      unstructuredAbstract,
    } = req.body;

    // ==========================
    // VALIDATION
    // ==========================

    if (
      !registrationId ||
      !title ||
      !presentationType ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields",
      });
    }

    // ==========================
    // VERIFY REGISTRATION
    // ==========================

    const registration =
      await Registration.findOne({
        registrationId,
      });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message:
          "Invalid Registration ID",
      });
    }

    // ==========================
    // PREVENT DUPLICATE ABSTRACTS
    // ==========================

    const existingAbstract =
      await Abstract.findOne({
        registrationId,
        title,
      });

    if (existingAbstract) {
      return res.status(400).json({
        success: false,
        message:
          "Abstract already submitted",
      });
    }

    // ==========================
    // ABSTRACT ID
    // ==========================

    const total =
      await Abstract.countDocuments();

    const abstractId = generateAbstractId(
      presentationType,
      total + 1
    );

    // ==========================
    // WORD COUNT
    // ==========================

    let wordCount = 0;

    if (
      abstractFormat === "Structured"
    ) {

      const fields = [
        introduction,
        aimsObjectives,
        materialsMethods,
        results,
        conclusion,
      ];

      wordCount = countWords(
        fields.join(" ")
      );

    } else {

      wordCount = countWords(
        unstructuredAbstract
      );
    }

    // ==========================
    // WORD LIMIT
    // ==========================

    if (wordCount > 250) {
      return res.status(400).json({
        success: false,
        message:
          "Abstract exceeds 250 words",
      });
    }

    // ==========================
    // CREATE ABSTRACT
    // ==========================

    const abstract =
      await Abstract.create({

        registrationId,

        abstractId,

        title,

        presentationType,

        abstractFormat,

        category,

        reviewCategory,

        wordCount,

        author:
          registration.fullName,

        email:
          registration.email,

        phone:
          registration.phone,

        institution:
          registration.institution,

        structuredAbstract: {
          introduction,
          aimsObjectives,
          materialsMethods,
          results,
          conclusion,
        },

        unstructuredAbstract,
      });

    res.status(201).json({
      success: true,

      message:
        "Abstract submitted successfully",

      abstract,
    });

  } catch (error) {
    next(error);
  }
};

// ==============================
// GET ALL ABSTRACTS
// ==============================

exports.getAllAbstracts = async (
  req,
  res,
  next
) => {
  try {

    const {
      status,
      presentationType,
      category,
      search,
    } = req.query;

    const query = {};

    // FILTERS

    if (status) {
      query.status = status;
    }

    if (presentationType) {
      query.presentationType =
        presentationType;
    }

    if (category) {
      query.category = category;
    }

    // SEARCH

    if (search) {
      query.$or = [
        {
          abstractId: {
            $regex: search,
            $options: "i",
          },
        },

        {
          title: {
            $regex: search,
            $options: "i",
          },
        },

        {
          author: {
            $regex: search,
            $options: "i",
          },
        },

        {
          registrationId: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const abstracts =
      await Abstract.find(query).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: abstracts.length,
      abstracts,
    });

  } catch (error) {
    next(error);
  }
};

// ==============================
// GET SINGLE ABSTRACT
// ==============================

exports.getSingleAbstract =
  async (req, res, next) => {
    try {

      const abstract =
        await Abstract.findById(
          req.params.id
        );

      if (!abstract) {
        return res.status(404).json({
          success: false,
          message:
            "Abstract not found",
        });
      }

      res.json({
        success: true,
        abstract,
      });

    } catch (error) {
      next(error);
    }
  };

// ==============================
// UPDATE STATUS
// ==============================

exports.updateAbstractStatus =
  async (req, res, next) => {
    try {

      const {
        status,
        reviewerRemarks,
      } = req.body;

      const allowedStatuses = [
        "Under Review",
        "Accepted",
        "Rejected",
        "Corrections Required",
      ];

      if (
        !allowedStatuses.includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid status",
        });
      }

      const abstract =
        await Abstract.findByIdAndUpdate(
          req.params.id,
          {
            status,
            reviewerRemarks,
          },
          {
            new: true,
          }
        );

      if (!abstract) {
        return res.status(404).json({
          success: false,
          message:
            "Abstract not found",
        });
      }

      res.json({
        success: true,
        message:
          "Status updated successfully",
        abstract,
      });

    } catch (error) {
      next(error);
    }
  };

// ==============================
// DELETE ABSTRACT
// ==============================

exports.deleteAbstract = async (
  req,
  res,
  next
) => {
  try {

    const abstract =
      await Abstract.findByIdAndDelete(
        req.params.id
      );

    if (!abstract) {
      return res.status(404).json({
        success: false,
        message:
          "Abstract not found",
      });
    }

    res.json({
      success: true,
      message:
        "Abstract deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};