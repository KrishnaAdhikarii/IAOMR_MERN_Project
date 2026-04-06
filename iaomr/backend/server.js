const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();

// ─── Security Middleware ───
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// ─── Rate Limiting ───
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many auth attempts.' },
});

// ─── Body Parsing ───
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ───
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ─── MongoDB Connection ───
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/iaomr_convention')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ─── API Routes ───
app.use('/api/auth', authLimiter, require('./routes/auth'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/abstracts', require('./routes/abstracts'));
app.use('/api/schedule', require('./routes/schedule'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/admin', require('./routes/admin'));

// ─── Health Check ───
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'IAOMR API running 🚀',
    time: new Date(),
  });
});

// ─── Serve Frontend (Vite build) ───
const frontendPath = path.join(__dirname, '../frontend/dist');

app.use(express.static(frontendPath));

// Catch-all: send React app
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ─── Global Error Handler ───
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

// ─── Start Server ───
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 IAOMR Server running on port ${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV}`);
});