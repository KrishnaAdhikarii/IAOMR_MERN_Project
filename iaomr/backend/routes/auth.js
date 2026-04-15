// const express = require('express');
// const router = express.Router();
// const { body, validationResult } = require('express-validator');
// const User = require('../models/User');
// const { protect } = require('../middleware/auth');

// const validate = validations => async (req, res, next) => {
//   await Promise.all(validations.map(v => v.run(req)));
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
//   next();
// };

// // POST /api/auth/register
// router.post('/register',
//   validate([
//     body('name').trim().notEmpty().withMessage('Name required'),
//     body('email').isEmail().withMessage('Valid email required'),
//     body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
//   ]),
//   async (req, res) => {
//     try {
//       const { name, email, password, phone, institution, designation } = req.body;
//       const existing = await User.findOne({ email });
//       if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });
//       const user = await User.create({ name, email, password, phone, institution, designation });
//       const token = user.getSignedJwt();
//       res.status(201).json({
//         success: true,
//         message: 'Registered successfully',
//         token,
//         user: { id: user._id, name: user.name, email: user.email, role: user.role },
//       });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }
// );

// // POST /api/auth/login
// router.post('/login',
//   validate([
//     body('email').isEmail(),
//     body('password').notEmpty(),
//   ]),
//   async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email }).select('+password');
//       if (!user || !(await user.matchPassword(password))) {
//         return res.status(401).json({ success: false, message: 'Invalid credentials' });
//       }
//       const token = user.getSignedJwt();
//       res.json({
//         success: true,
//         token,
//         user: { id: user._id, name: user.name, email: user.email, role: user.role, institution: user.institution },
//       });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }
// );

// // GET /api/auth/me
// router.get('/me', protect, async (req, res) => {
//   res.json({ success: true, user: req.user });
// });

// // PUT /api/auth/profile
// router.put('/profile', protect, async (req, res) => {
//   try {
//     const { name, phone, institution, designation } = req.body;
//     const user = await User.findByIdAndUpdate(req.user._id,
//       { name, phone, institution, designation },
//       { new: true, runValidators: true }
//     );
//     res.json({ success: true, user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // PUT /api/auth/change-password
// router.put('/change-password', protect, async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;
//     const user = await User.findById(req.user._id).select('+password');
//     if (!(await user.matchPassword(currentPassword))) {
//       return res.status(400).json({ success: false, message: 'Current password incorrect' });
//     }
//     user.password = newPassword;
//     await user.save();
//     res.json({ success: true, message: 'Password updated' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// module.exports = router;
// // 