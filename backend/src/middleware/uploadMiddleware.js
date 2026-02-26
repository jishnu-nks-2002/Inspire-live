const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// ─── Cloudinary Configuration ────────────────────────────────────────────────
// Configure with your credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Storage Configuration ───────────────────────────────────────────────────

// Storage for Images (blogs, banners, etc.)
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads/images', // Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }], // Auto optimization
    resource_type: 'image',
  },
});

// Storage for Videos (banners, blog content)
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads/videos',
    allowed_formats: ['mp4', 'webm', 'mov', 'avi'],
    resource_type: 'video',
  },
});

// Combined storage for both images and videos
const mediaStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const isVideo = /video/.test(file.mimetype);
    return {
      folder: isVideo ? 'uploads/videos' : 'uploads/images',
      allowed_formats: isVideo 
        ? ['mp4', 'webm', 'mov', 'avi']
        : ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      resource_type: isVideo ? 'video' : 'image',
      transformation: isVideo ? [] : [{ quality: 'auto', fetch_format: 'auto' }],
    };
  },
});

// ─── File Filters ────────────────────────────────────────────────────────────

const imageFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = allowed.test(file.originalname.toLowerCase());
  const mime = allowed.test(file.mimetype);
  
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed'));
  }
};

const videoFilter = (req, file, cb) => {
  const allowed = /mp4|webm|mov|avi/;
  const ext = allowed.test(file.originalname.toLowerCase());
  const mime = /video/.test(file.mimetype);
  
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Only video files (mp4, webm, mov, avi) are allowed'));
  }
};

const mediaFilter = (req, file, cb) => {
  const imageAllowed = /jpeg|jpg|png|gif|webp/;
  const videoAllowed = /mp4|webm|mov|avi/;
  const ext = file.originalname.toLowerCase();
  
  if (imageAllowed.test(ext) || videoAllowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed'));
  }
};

// ─── Multer Instances ────────────────────────────────────────────────────────

// For image-only uploads (blogs, thumbnails)
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10 MB for images
  },
});

// For video-only uploads
const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: videoFilter,
  limits: { 
    fileSize: 100 * 1024 * 1024, // 100 MB for videos
  },
});

// For mixed media uploads (images or videos)
const uploadMedia = multer({
  storage: mediaStorage,
  fileFilter: mediaFilter,
  limits: { 
    fileSize: 100 * 1024 * 1024, // 100 MB max
  },
});

// ─── Helper Functions ────────────────────────────────────────────────────────

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - The Cloudinary public_id (without extension)
 * @param {string} resourceType - 'image' or 'video'
 */
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw error;
  }
};

/**
 * Extract Cloudinary public_id from URL
 * Example: https://res.cloudinary.com/demo/image/upload/v1234/uploads/images/sample.jpg
 * Returns: uploads/images/sample
 */
const getPublicIdFromUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  
  const match = url.match(/\/v\d+\/(.+)\.\w+$/);
  return match ? match[1] : null;
};

/**
 * Check if URL is a Cloudinary URL
 */
const isCloudinaryUrl = (url) => {
  return url && url.includes('cloudinary.com');
};

// ─── Exports ─────────────────────────────────────────────────────────────────

module.exports = {
  uploadImage,
  uploadVideo,
  uploadMedia,
  cloudinary,
  deleteFromCloudinary,
  getPublicIdFromUrl,
  isCloudinaryUrl,
};