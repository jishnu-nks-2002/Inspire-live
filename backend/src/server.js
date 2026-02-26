require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const { errorHandler } = require('./middleware/error');
const authRoutes = require('./routes/authRoutes');
const { blogRouter, adminRouter } = require('./routes/blogRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const serviceRoutes = require('./routes/Serviceroutes');

// ═══════════════════════════════════════════════════════════════════════════════
// DATABASE CONNECTION
// ═══════════════════════════════════════════════════════════════════════════════
connectDB();

// ═══════════════════════════════════════════════════════════════════════════════
// EXPRESS APP INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════════
const app = express();

// ═══════════════════════════════════════════════════════════════════════════════
// CORS CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════
const allowedOrigins = [
  'https://inspire-live.vercel.app',
  'https://inspire-live-225z.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('❌ Blocked by CORS:', origin);
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ═══════════════════════════════════════════════════════════════════════════════
// MIDDLEWARE - Body Parsing (MUST be before routes)
// ═══════════════════════════════════════════════════════════════════════════════
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ═══════════════════════════════════════════════════════════════════════════════
// REQUEST LOGGING (Development only)
// ═══════════════════════════════════════════════════════════════════════════════
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.originalUrl}`);
    next();
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATIC FILES
// ═══════════════════════════════════════════════════════════════════════════════
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT ROUTE
// ═══════════════════════════════════════════════════════════════════════════════
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Inspire Live Backend Running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      blogs: '/api/blogs',
      admin: '/api/admin',
      banners: '/api/banner',
      services: '/api/services',
      health: '/api/health'
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// API ROUTES
// ═══════════════════════════════════════════════════════════════════════════════
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRouter);
app.use('/api/admin', adminRouter);
app.use('/api/banner', bannerRoutes);
app.use('/api/services', serviceRoutes);

// ═══════════════════════════════════════════════════════════════════════════════
// HEALTH CHECK
// ═══════════════════════════════════════════════════════════════════════════════
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Blog API is running 🚀',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN RESET ROUTE (DEVELOPMENT ONLY - REMOVE IN PRODUCTION)
// ═══════════════════════════════════════════════════════════════════════════════
if (process.env.NODE_ENV === 'development') {
  app.get('/api/reset-admin-production', async (req, res) => {
    try {
      const User = require('./models/User');

      const deleted = await User.deleteOne({ email: 'admin@blog.com' });

      const newAdmin = await User.create({
        name: 'Super Admin',
        email: 'admin@blog.com',
        password: 'admin123',
        role: 'admin',
        isActive: true,
      });

      const isHashed = newAdmin.password.startsWith('$2');

      res.json({
        success: true,
        message: 'Admin reset successfully!',
        passwordIsHashed: isHashed,
        deletedCount: deleted.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 404 HANDLER (Must come before error handler)
// ═══════════════════════════════════════════════════════════════════════════════
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL ERROR HANDLER (MUST be last)
// ═══════════════════════════════════════════════════════════════════════════════
app.use(errorHandler);

// ═══════════════════════════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════════════════════════
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Allowed CORS origins:`, allowedOrigins.filter(Boolean).length);
  console.log(`📂 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('═══════════════════════════════════════════════════════════');
});

// ═══════════════════════════════════════════════════════════════════════════════
// GRACEFUL SHUTDOWN
// ═══════════════════════════════════════════════════════════════════════════════
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully...');
  process.exit(0);
});