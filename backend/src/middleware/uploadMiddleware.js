// This file re-exports from your existing uploadMiddleware
// Point this to your actual upload middleware file path
// e.g., require('../../middleware/upload') or wherever your existing file is

// ─── If you have a separate upload middleware, replace this with: ─────────────
// module.exports = require('./path/to/your/existing/uploadMiddleware');

// ─── Otherwise use this self-contained version ───────────────────────────────
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads/events',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ quality: 'auto:best', fetch_format: 'auto' }],
    resource_type: 'image',
  },
});

const imageFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  if (allowed.test(file.originalname.toLowerCase()) && allowed.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType, invalidate: true });
};

const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ success: false, message: err.message || 'Upload failed' });
  }
  next();
};

module.exports = { uploadImage, deleteFromCloudinary, handleMulterError, cloudinary };