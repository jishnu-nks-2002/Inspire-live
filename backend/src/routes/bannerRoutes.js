const express = require('express');
const router = express.Router();
const bannerCtrl = require('../controllers/bannerController');
const upload = require('../middleware/uploadMiddleware');

// ── Use the SAME auth middleware your blogRoutes/adminRouter uses ────────────
// Look at your blogRoutes.js and copy exactly the same import
const { protect } = require('../middleware/auth');

// ── Public ─────────────────────────────────────────────────────────────────
// GET /api/banner  (no auth — used by your Next.js frontend)
router.get('/', bannerCtrl.getPublicBanner);

// ── Admin (protected) ──────────────────────────────────────────────────────
// IMPORTANT: specific routes MUST come before param routes (:slideId)

// GET /api/banner/admin
router.get('/admin', protect, bannerCtrl.getBanner);

// PUT /api/banner/admin/toggle
router.put('/admin/toggle', protect, bannerCtrl.toggleBanner);

// PUT /api/banner/admin/slides/reorder  ← BEFORE /:slideId
router.put('/admin/slides/reorder', protect, bannerCtrl.reorderSlides);

// POST /api/banner/admin/slides
router.post('/admin/slides', protect, upload.single('media'), bannerCtrl.addSlide);

// PUT /api/banner/admin/slides/:slideId
router.put('/admin/slides/:slideId', protect, upload.single('media'), bannerCtrl.updateSlide);

// DELETE /api/banner/admin/slides/:slideId
router.delete('/admin/slides/:slideId', protect, bannerCtrl.deleteSlide);

module.exports = router;