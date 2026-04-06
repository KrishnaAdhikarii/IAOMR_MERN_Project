const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Abstract = require('../models/Abstract');
const User = require('../models/User');
const { Contact } = require('../models/Schedule');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/admin/stats
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const [
      totalRegistrations, confirmedRegistrations, pendingRegistrations,
      totalAbstracts, acceptedAbstracts, totalUsers,
      revenueData, categoryBreakdown, newMessages
    ] = await Promise.all([
      Registration.countDocuments(),
      Registration.countDocuments({ status: 'confirmed' }),
      Registration.countDocuments({ status: 'pending' }),
      Abstract.countDocuments(),
      Abstract.countDocuments({ status: 'accepted' }),
      User.countDocuments({ role: 'user' }),
      Registration.aggregate([
        { $match: { paymentStatus: 'verified' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Registration.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      Contact.countDocuments({ status: 'new' }),
    ]);

    res.json({
      success: true,
      stats: {
        registrations: { total: totalRegistrations, confirmed: confirmedRegistrations, pending: pendingRegistrations },
        abstracts: { total: totalAbstracts, accepted: acceptedAbstracts },
        users: totalUsers,
        revenue: revenueData[0]?.total || 0,
        categoryBreakdown,
        newMessages,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/recent
router.get('/recent', protect, adminOnly, async (req, res) => {
  try {
    const [recentRegistrations, recentAbstracts] = await Promise.all([
      Registration.find().sort('-createdAt').limit(5),
      Abstract.find().sort('-createdAt').limit(5),
    ]);
    res.json({ success: true, recentRegistrations, recentAbstracts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const query = search
      ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }
      : {};
    const total = await User.countDocuments(query);
    const users = await User.find(query).sort('-createdAt').skip((page - 1) * limit).limit(Number(limit));
    res.json({ success: true, data: users, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/users/:id/role
router.put('/users/:id/role', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
