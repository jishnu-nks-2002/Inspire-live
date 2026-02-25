require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const { errorHandler } = require('./middleware/error');
const authRoutes = require('./routes/authRoutes');
const { blogRouter, adminRouter } = require('./routes/blogRoutes');
const bannerRoutes  = require('./routes/bannerRoutes'); 

// Connect to MongoDB
connectDB();

const app = express();

// ─── CORS Configuration ───────────────────────────────────────────────────────
const allowedOrigins = [
  'https://inspire-live.vercel.app',           // Your Vercel deployment
  'http://localhost:5173',                     // Local Vite dev
  'http://localhost:3000',                     // Alternative local port
  process.env.CLIENT_URL,                      // From .env
  process.env.ADMIN_URL,                       // From .env
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',  authRoutes);
app.use('/api/blogs', blogRouter);
app.use('/api/admin', adminRouter);
app.use('/api/banner', bannerRoutes); 

// Health check
app.get('/api/health', (req, res) =>
  res.json({ success: true, message: 'Blog API is running 🚀' })
);

// ⚠️ TEMPORARY ADMIN RESET ENDPOINT - REMOVE AFTER USE! ⚠️
app.get('/api/reset-admin-secret-xyz', async (req, res) => {
  try {
    const User = require('./models/User');
    
    // Delete existing admin
    const deleted = await User.deleteOne({ email: 'admin@blog.com' });
    console.log('🗑️  Deleted old admin:', deleted.deletedCount);
    
    // Create fresh admin (password will be auto-hashed by pre-save hook)
    const newAdmin = await User.create({
      name: 'Super Admin',
      email: 'admin@blog.com',
      password: 'admin123',
      role: 'admin',
      isActive: true,
    });
    
    const isHashed = newAdmin.password.startsWith('$2');
    
    console.log('✅ New admin created:', newAdmin.email);
    console.log('🔒 Password hashed:', isHashed);
    
    res.json({ 
      success: true, 
      message: '✅ Admin reset complete!',
      details: {
        email: 'admin@blog.com',
        password: 'admin123',
        passwordIsHashed: isHashed,
        deletedCount: deleted.deletedCount,
        newUserId: newAdmin._id
      }
    });
  } catch (error) {
    console.error('❌ Reset error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});
// ⚠️ END TEMPORARY ENDPOINT ⚠️

// 404 handler
app.use((req, res) =>
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
);

// Error handler (must be last)
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 API Docs: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Allowed CORS origins:`, allowedOrigins);
});