require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
// nn
const app = express();

// ─── Security Middleware ───
app.use(helmet());

// ─── CORS ───
app.use(cors({
  origin: ["http://localhost:5173", "https://iaomr-mern-project.vercel.app"], // MUST be your Vercel URL
  credentials: true,
}));

// ─── Rate Limiting ───
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
});
app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Too many auth attempts.',
  },
});

// ─── Body Parsing ───
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ───
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ─── MongoDB ───
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ─── Routes ───
app.use('/api/registration', require('./routes/registration'));


// app.use('/api/auth', authLimiter, require('./routes/auth'));
// app.use('/api/registrations', require('./routes/registrations'));
// app.use('/api/abstracts', require('./routes/abstracts'));
// app.use('/api/schedule', require('./routes/schedule'));
// app.use('/api/announcements', require('./routes/announcements'));
// app.use('/api/contact', require('./routes/contact'));
// app.use('/api/admin', require('./routes/admin'));

// ─── Health Check ───
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'IAOMR API running 🚀',
    time: new Date(),
  });
});

// ─── 404 (API only) ───
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
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