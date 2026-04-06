const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name:     { type: String, required: [true, 'Name is required'], trim: true },
  email:    { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true,
              match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
  password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  phone:    { type: String, trim: true },
  institution: { type: String, trim: true },
  designation: { type: String, trim: true },
  isVerified:  { type: Boolean, default: false },
  resetPasswordToken:   String,
  resetPasswordExpire:  Date,
}, { timestamps: true });

// Hash password before save
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Match password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT
UserSchema.methods.getSignedJwt = function() {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

module.exports = mongoose.model('User', UserSchema);
