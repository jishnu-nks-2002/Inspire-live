const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/Servicecontroller');
const { protect } = require('../middleware/auth');
const { uploadImage } = require('../middleware/uploadMiddleware');

// ─── Multer fields config for service images ──────────────────────────────────
// Accepts up to 3 named image fields per request
const serviceImageUpload = uploadImage.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'detailImage1', maxCount: 1 },
  { name: 'detailImage2', maxCount: 1 },
]);

// ─── Public Routes ────────────────────────────────────────────────────────────
// These do NOT require authentication — used by the frontend

// GET /api/services → all active services (sorted by order)
router.get('/', serviceController.getAllServices);

// GET /api/services/slug/:slug → single service by slug
router.get('/slug/:slug', serviceController.getServiceBySlug);

// ─── Admin Routes (protected) ─────────────────────────────────────────────────
// All routes below require a valid JWT via the protect middleware

// GET /api/services/admin/all → all services including inactive
router.get('/admin/all', protect, serviceController.getAllServicesAdmin);

// GET /api/services/:id → single service by MongoDB _id
router.get('/:id', protect, serviceController.getServiceById);

// POST /api/services → create new service (with optional image uploads)
router.post('/', protect, serviceImageUpload, serviceController.createService);

// PUT /api/services/reorder → update sort order for multiple services
// NOTE: must come before /:id to avoid "reorder" being treated as an id
router.put('/reorder', protect, serviceController.reorderServices);

// PUT /api/services/:id → update existing service (with optional image uploads)
router.put('/:id', protect, serviceImageUpload, serviceController.updateService);

// DELETE /api/services/:id → delete service and its Cloudinary images
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;