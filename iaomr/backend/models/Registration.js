const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
    },

    photo: {
      data: Buffer,
      contentType: String,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Faculty",
        "Practitioner",
        "Post Graduate",
        "Foreign Delegate",
      ],
    },

    designation: {
      type: String,
      default: "",
    },

    iaomrNumber: {
      type: String,
      default: "",
      trim: true,
    },

    pgYear: {
      type: String,
      default: "",
    },

    dciNumber: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    institution: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    accompanying: {
      type: Boolean,
      default: false,
    },

    accompanyingCount: {
      type: Number,
      default: 0,
    },

    accompanyingNames: {
      type: [String],
      default: [],
    },

    foodPreference: {
      type: String,
      enum: ["VEG", "NON-VEG"],
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentId: {
      type: String,
      required: true,
      unique: true,
    },

    orderId: {
      type: String,
      required: true,
    },

    regNumber: {
      type: String,
      required: true,
      unique: true,
    },

    qrCode: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Registration",
  registrationSchema
);