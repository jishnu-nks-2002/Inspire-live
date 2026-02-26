const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const { uploadMedia } = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth'); // Your auth middleware

// ─── Public Routes ───────────────────────────────────────────────────────────

// GET /api/banner - Get active banner for frontend
router.get('/', bannerController.getPublicBanner);

// ─── Admin Routes ────────────────────────────────────────────────────────────

// Protect all admin routes (add your auth middleware)
router.use('/admin', protect, authorize('admin', 'editor'));

// GET /api/admin/banner - Get banner with all slides
router.get('/admin', bannerController.getBanner);

// POST /api/admin/banner/slides - Add new slide (with optional media upload)
router.post(
  '/admin/slides',
  uploadMedia.single('media'), // Field name: 'media'
  bannerController.addSlide
);

// PUT /api/admin/banner/slides/:slideId - Update slide
router.put(
  '/admin/slides/:slideId',
  uploadMedia.single('media'),
  bannerController.updateSlide
);

// DELETE /api/admin/banner/slides/:slideId - Delete slide
router.delete('/admin/slides/:slideId', bannerController.deleteSlide);

// PUT /api/admin/banner/slides/reorder - Reorder slides
router.put('/admin/slides/reorder', bannerController.reorderSlides);

// PUT /api/admin/banner/toggle - Toggle banner active state
router.put('/admin/toggle', bannerController.toggleBanner);

module.exports = router;