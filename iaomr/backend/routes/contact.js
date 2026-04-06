const express = require('express');
const router = express.Router();
const { Contact } = require('../models/Schedule');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const msg = await Contact.create({ ...req.body, ipAddress: req.ip });
    res.status(201).json({ success: true, message: 'Message sent successfully! We will get back to you soon.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const messages = await Contact.find().sort('-createdAt');
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, data: msg });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
