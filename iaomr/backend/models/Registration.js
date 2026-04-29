const mongoose = require("mongoose");
// hj
const registrationSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,
    gender: String,
    category: String,
    designation: String,
    iaomrNumber: String,
    pgYear: String,
    dciNumber: String,
    country: String,
    state: String,
    city: String,
    institution: String,
    address: String,
    accompanying: Boolean,
    accompanyingName: String,
    amount: Number,
    paymentId: String,
    regNumber: { type: String, unique: true },
    qrCode: String,
    orderId: String,
    status: { type: String, default: "PENDING" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);