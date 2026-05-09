const mongoose = require("mongoose");
// hj
const registrationSchema = new mongoose.Schema(
  {
    name: String,
email: String,
    phone: String,
    gender: String,
    photo: {
      data: Buffer,
      contentType: String,
    },
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
    foodPreference: String,
    amount: Number,
    paymentId: String,
    regNumber: { type: String, unique: true },
    qrCode: String,
    orderId: String,
    status: { type: String, default: "PENDING" },
  },
  { timestamps: true }
);

// registrationSchema.index({ regNumber: 1 });
// registrationSchema.index({ paymentId: 1 });
// registrationSchema.index({ email: 1 });

module.exports = mongoose.model("Registration", registrationSchema);