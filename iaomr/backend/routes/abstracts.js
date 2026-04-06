const express = require('express');
const router = express.Router();
const Abstract = require('../models/Abstract');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/abstracts
router.post('/', async (req, res) => {
  try {
    const abstract = await Abstract.create({ ...req.body, user: req.user?._id });
    res.status(201).json({ success: true, data: abstract, message: 'Abstract submitted successfully!' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET /api/abstracts/my
router.get('/my', protect, async (req, res) => {
  try {
    const abstracts = await Abstract.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, data: abstracts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/abstracts (admin)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status, category, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    const total = await Abstract.countDocuments(query);
    const data = await Abstract.find(query).sort('-createdAt')
      .skip((page - 1) * limit).limit(Number(limit));
    res.json({ success: true, data, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/abstracts/:id/review (admin)
router.put('/:id/review', protect, adminOnly, async (req, res) => {
  try {
    const { status, reviewComments, awardCategory } = req.body;
    const abstract = await Abstract.findByIdAndUpdate(req.params.id,
      { status, reviewComments, awardCategory, reviewedBy: req.user._id, reviewedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, data: abstract });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
