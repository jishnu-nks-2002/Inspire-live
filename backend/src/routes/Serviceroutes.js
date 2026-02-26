const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/Servicecontroller');
const { protect } = require('../middleware/auth');
const { uploadImage } = require('../middleware/uploadMiddleware');

// ─── Multer fields config for service images ──────────────────────────────────
const serviceImageUpload = uploadImage.fields([
  { name: 'heroImage',    maxCount: 1 },
  { name: 'detailImage1', maxCount: 1 },
  { name: 'detailImage2', maxCount: 1 },
]);

// ─── Public Routes ────────────────────────────────────────────────────────────

// GET /api/services → all active services (sorted by order)
router.get('/', serviceController.getAllServices);

// GET /api/services/slug/:slug → single service by slug (public detail page)
router.get('/slug/:slug', serviceController.getServiceBySlug);

// ─── Admin Routes (protected) ─────────────────────────────────────────────────
// ⚠️  IMPORTANT: All specific string routes MUST come before /:id
// otherwise Express matches "admin" and "reorder" as MongoDB IDs

// GET /api/services/admin/all → all services including inactive
router.get('/admin/all', protect, serviceController.getAllServicesAdmin);

// PUT /api/services/reorder → update sort order
// NOTE: must come before /:id to avoid "reorder" being treated as an id
router.put('/reorder', protect, serviceController.reorderServices);

// POST /api/services → create new service (with optional image uploads)
router.post('/', protect, serviceImageUpload, serviceController.createService);

// GET /api/services/:id → single service by MongoDB _id (must be LAST GET)
router.get('/:id', protect, serviceController.getServiceById);

// PUT /api/services/:id → update existing service (must be LAST PUT)
router.put('/:id', protect, serviceImageUpload, serviceController.updateService);

// DELETE /api/services/:id → delete service and its Cloudinary images
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;