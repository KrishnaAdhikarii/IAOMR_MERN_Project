const mongoose = require('mongoose');

const AbstractSchema = new mongoose.Schema({
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  registration:   { type: mongoose.Schema.Types.ObjectId, ref: 'Registration' },
  // Author Info
  presentingAuthor: { type: String, required: true },
  coAuthors:      [{ name: String, institution: String }],
  institution:    { type: String, required: true },
  email:          { type: String, required: true },
  phone:          { type: String, required: true },
  // Abstract Details
  title:          { type: String, required: true, maxlength: 200 },
  category:       { type: String, enum: ['case_report', 'original_research', 'review', 'poster'], required: true },
  topic:          { type: String, required: true },
  keywords:       [String],
  abstract:       { type: String, required: true, maxlength: 300 },
  // Full content sections
  introduction:   String,
  methodology:    String,
  results:        String,
  conclusion:     String,
  // Presentation
  presentationType: { type: String, enum: ['paper', 'poster', 'e-poster'], default: 'paper' },
  // Review
  abstractId:     { type: String, unique: true },
  status:         { type: String, enum: ['submitted', 'under_review', 'accepted', 'rejected', 'revision'], default: 'submitted' },
  reviewComments: String,
  reviewedBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt:     Date,
  // Award eligibility
  awardCategory:  { type: String, enum: ['best_paper', 'best_poster', 'none'], default: 'none' },
}, { timestamps: true });

AbstractSchema.pre('save', async function(next) {
  if (!this.abstractId) {
    const count = await mongoose.model('Abstract').countDocuments();
    this.abstractId = `ABS-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Abstract', AbstractSchema);
