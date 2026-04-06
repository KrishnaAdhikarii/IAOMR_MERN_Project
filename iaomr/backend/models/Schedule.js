const mongoose = require('mongoose');

const ScheduleItemSchema = new mongoose.Schema({
  day:       { type: Number, enum: [1, 2, 3], required: true },
  date:      { type: String, required: true }, // "6th August 2026"
  startTime: { type: String, required: true },
  endTime:   { type: String, required: true },
  title:     { type: String, required: true },
  type:      { type: String, enum: ['session', 'lecture', 'break', 'social', 'inauguration', 'valedictory', 'registration'] },
  speaker:   String,
  venue:     String,
  description: String,
  order:     { type: Number, default: 0 },
}, { timestamps: true });

const AnnouncementSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  type:      { type: String, enum: ['general', 'important', 'deadline', 'update'], default: 'general' },
  isActive:  { type: Boolean, default: true },
  isPinned:  { type: Boolean, default: false },
  author:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expiresAt: Date,
}, { timestamps: true });

const ContactSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true },
  phone:    String,
  subject:  String,
  message:  { type: String, required: true },
  status:   { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  ipAddress: String,
}, { timestamps: true });

module.exports = {
  Schedule:     mongoose.model('Schedule', ScheduleItemSchema),
  Announcement: mongoose.model('Announcement', AnnouncementSchema),
  Contact:      mongoose.model('Contact', ContactSchema),
};
