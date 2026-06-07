const mongoose = require("mongoose");

const AbstractSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
    },

    abstractId: {
      type: String,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    presentationType: {
      type: String,
      enum: ["Paper", "Poster"],
      required: true,
    },

    abstractFormat: {
      type: String,
      enum: ["Structured", "Unstructured"],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    reviewCategory: {
      type: String,
      default: "",
    },

    wordCount: {
      type: Number,
      default: 0,
    },

    // AUTHOR DETAILS

    author: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    institution: {
      type: String,
      required: true,
    },
    delegateCategory: {
      type: String,
      default: "",
    },

    // FILE

    uploadedFile: {
      type: String,
      required: true,
    },

    // STRUCTURED ABSTRACT

    structuredAbstract: {
      introduction: {
        type: String,
        default: "",
      },

      aimsObjectives: {
        type: String,
        default: "",
      },

      materialsMethods: {
        type: String,
        default: "",
      },

      results: {
        type: String,
        default: "",
      },

      conclusion: {
        type: String,
        default: "",
      },
    },

    // UNSTRUCTURED ABSTRACT

    unstructuredAbstract: {
      type: String,
      default: "",
    },

    // REVIEW STATUS

    status: {
      type: String,
      enum: [
        "Under Review",
        "Accepted",
        "Rejected",
        "Corrections Required",
      ],
      default: "Under Review",
    },

    reviewerRemarks: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Abstract",
  AbstractSchema
);