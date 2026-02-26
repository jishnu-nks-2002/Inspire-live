const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const { uploadMedia } = require('../middleware/uploadMiddleware');
const { protect, authorize } = require('../middleware/auth');

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC BANNER ROUTES - /api/banner
// ═══════════════════════════════════════════════════════════════════════════

// GET /api/banner - Get active banner for frontend
router.get('/', bannerController.getPublicBanner);

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN BANNER ROUTES - /api/banner/admin
// ═══════════════════════════════════════════════════════════════════════════

// Protect all admin routes
router.use('/admin', protect, authorize('admin', 'editor'));

// GET /api/banner/admin - Get banner with all slides
router.get('/admin', bannerController.getBanner);

// POST /api/banner/admin/slides - Add new slide (with optional media upload)
router.post(
  '/admin/slides',
  uploadMedia.single('media'), // Field name: 'media'
  bannerController.addSlide
);

// PUT /api/banner/admin/slides/:slideId - Update slide
router.put(
  '/admin/slides/:slideId',
  uploadMedia.single('media'),
  bannerController.updateSlide
);

// DELETE /api/banner/admin/slides/:slideId - Delete slide
router.delete('/admin/slides/:slideId', bannerController.deleteSlide);

// PUT /api/banner/admin/slides/reorder - Reorder slides
router.put('/admin/slides/reorder', bannerController.reorderSlides);

// PUT /api/banner/admin/toggle - Toggle banner active state
router.put('/admin/toggle', bannerController.toggleBanner);

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS - Must match server.js import
// ═══════════════════════════════════════════════════════════════════════════
module.exports = router;