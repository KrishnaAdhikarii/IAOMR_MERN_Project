const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const { protect, adminOnly } = require('../middleware/auth');

// Pricing logic
const getPricing = (category, type) => {
  const prices = {
    student:      { early: 7080, regular: 7670, late: 8850, spot: 9440 },
    faculty:      { early: 7670, regular: 8260, late: 9440, spot: 10030 },
    accompanying: { early: 4720, regular: 5310, late: 6490, spot: 6490 },
    foreign:      { early: 200,  regular: 200,  late: 225,  spot: 225 },
  };
  return prices[category]?.[type] || 0;
};

const getRegistrationType = () => {
  const now = new Date();
  if (now <= new Date('2026-03-15')) return 'early';
  if (now <= new Date('2026-04-30')) return 'regular';
  if (now <= new Date('2026-07-10')) return 'late';
  return 'spot';
};

// POST /api/registrations  — Submit registration
router.post('/', async (req, res) => {
  try {
    const { category } = req.body;
    const regType = getRegistrationType();
    const amount = getPricing(category, regType);
    const registration = await Registration.create({
      ...req.body,
      registrationType: regType,
      amount,
      user: req.user?._id,
    });
    res.status(201).json({ success: true, data: registration, message: 'Registration submitted successfully!' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET /api/registrations/my  — My registrations
router.get('/my', protect, async (req, res) => {
  try {
    const regs = await Registration.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, data: regs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/registrations/:id  — Single registration (own or admin)
router.get('/:id', protect, async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id);
    if (!reg) return res.status(404).json({ success: false, message: 'Not found' });
    if (reg.user?.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    res.json({ success: true, data: reg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/registrations  — Admin: all registrations
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status, category, page = 1, limit = 20, search } = req.query;
    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { registrationId: { $regex: search, $options: 'i' } },
    ];
    const total = await Registration.countDocuments(query);
    const data = await Registration.find(query)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ success: true, data, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/registrations/:id/verify  — Admin verify payment
router.put('/:id/verify', protect, adminOnly, async (req, res) => {
  try {
    const { paymentStatus, remarks } = req.body;
    const reg = await Registration.findByIdAndUpdate(req.params.id,
      { paymentStatus, status: paymentStatus === 'verified' ? 'confirmed' : 'pending', remarks },
      { new: true }
    );
    res.json({ success: true, data: reg, message: `Registration ${paymentStatus}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/registrations/pricing/info
router.get('/pricing/info', (req, res) => {
  const type = getRegistrationType();
  res.json({
    success: true,
    currentType: type,
    pricing: {
      student:      { early: 7080, regular: 7670, late: 8850, spot: 9440 },
      faculty:      { early: 7670, regular: 8260, late: 9440, spot: 10030 },
      accompanying: { early: 4720, regular: 5310, late: 6490, spot: 6490 },
      foreign:      { early: 200,  regular: 200,  late: 225,  spot: 225 },
    },
    deadlines: {
      early:   '2026-03-15',
      regular: '2026-04-30',
      late:    '2026-07-10',
      spot:    '2026-08-08',
    },
  });
});

module.exports = router;
