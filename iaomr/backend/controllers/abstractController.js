const Abstract = require("../models/Abstract");
const Registration = require(
  "../models/Registration"
);



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


const countWords = (text) => {
  return text
    ?.trim()
    ?.split(/\s+/)
    ?.filter(Boolean).length || 0;
};

exports.submitAbstract = async (
  req,
  res,
  next
) => {
  try {

    // CHECK REGISTRATION ID

    const registration =
      await Registration.findOne({
        registrationId:
          req.body.registrationId,
      });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message:
          "Invalid Registration ID",
      });
    }

    // ABSTRACT COUNT

    const total =
      await Abstract.countDocuments();

    const abstractId = generateAbstractId(
      req.body.presentationType,
      total + 1
    );

    let wordCount = 0;

    // STRUCTURED

    if (
      req.body.abstractFormat ===
      "Structured"
    ) {
      const fields = [
        req.body.introduction,
        req.body.aimsObjectives,
        req.body.materialsMethods,
        req.body.results,
        req.body.conclusion,
      ];

      wordCount = countWords(
        fields.join(" ")
      );
    }

    // UNSTRUCTURED

    else {
      wordCount = countWords(
        req.body.unstructuredAbstract
      );
    }

    // WORD LIMIT

    if (wordCount > 250) {
      return res.status(400).json({
        success: false,
        message:
          "Abstract exceeds 250 words",
      });
    }

    // CREATE ABSTRACT

    const abstract =
      await Abstract.create({
        ...req.body,

        abstractId,

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
          introduction:
            req.body.introduction,

          aimsObjectives:
            req.body.aimsObjectives,

          materialsMethods:
            req.body.materialsMethods,

          results:
            req.body.results,

          conclusion:
            req.body.conclusion,
        },
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


exports.getAllAbstracts = async (
  req,
  res,
  next
) => {
  try {
    const abstracts =
      await Abstract.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      abstracts,
    });
  } catch (error) {
    next(error);
  }
};


exports.updateAbstractStatus =
  async (req, res, next) => {
    try {
      const abstract =
        await Abstract.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status,

            reviewerRemarks:
              req.body.reviewerRemarks,
          },
          { new: true }
        );

      res.json({
        success: true,
        abstract,
      });
    } catch (error) {
      next(error);
    }
  };

