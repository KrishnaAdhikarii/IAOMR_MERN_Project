// const express = require('express');
// const router = express.Router();
// const { Announcement } = require('../models/Schedule');
// const { protect, adminOnly } = require('../middleware/auth');

// router.get('/', async (req, res) => {
//   try {
//     const announcements = await Announcement.find({ isActive: true })
//       .sort('-isPinned -createdAt').limit(10);
//     res.json({ success: true, data: announcements });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// router.post('/', protect, adminOnly, async (req, res) => {
//   try {
//     const ann = await Announcement.create({ ...req.body, author: req.user._id });
//     res.status(201).json({ success: true, data: ann });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// router.put('/:id', protect, adminOnly, async (req, res) => {
//   try {
//     const ann = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json({ success: true, data: ann });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// router.delete('/:id', protect, adminOnly, async (req, res) => {
//   try {
//     await Announcement.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: 'Deleted' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// module.exports = router;
