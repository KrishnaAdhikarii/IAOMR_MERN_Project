const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Personal Info
  title:        { type: String, enum: ['Dr.', 'Prof.', 'Mr.', 'Ms.', 'Mrs.'], default: 'Dr.' },
  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, lowercase: true, trim: true },
  phone:        { type: String, required: true, trim: true },
  // Professional Info
  designation:  { type: String, required: true },
  institution:  { type: String, required: true },
  city:         { type: String, required: true },
  state:        { type: String, required: true },
  iaomrMemberId: { type: String, trim: true },
  // Category & Pricing
  category:     { type: String, enum: ['student', 'faculty', 'accompanying', 'foreign'], required: true },
  registrationType: { type: String, enum: ['early', 'regular', 'late', 'spot'], required: true },
  amount:       { type: Number, required: true },
  // Payment
  paymentMethod: { type: String, enum: ['upi', 'neft', 'internet_banking', 'other'] },
  transactionId: { type: String, trim: true },
  paymentStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  paymentDate:   Date,
  // Convention options
  preConference: { type: Boolean, default: false },
  accommodation: { type: Boolean, default: false },
  accommodationDetails: { type: String },
  dietaryPreference: { type: String, enum: ['veg', 'non-veg', 'vegan', 'jain'], default: 'veg' },
  // Status
  status:        { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  registrationId: { type: String, unique: true },
  confirmationSent: { type: Boolean, default: false },
  // Documents
  photoUrl:      String,
  remarks:       String,
}, { timestamps: true });

// Auto-generate registrationId
RegistrationSchema.pre('save', async function(next) {
  if (!this.registrationId) {
    const count = await mongoose.model('Registration').countDocuments();
    this.registrationId = `IAOMR2026-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Registration', RegistrationSchema);
