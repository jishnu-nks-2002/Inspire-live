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

// ═══════════════════════════════════════════════════════════════════════════════
// CRITICAL: Route Order Matters!
// Most specific routes MUST come before dynamic parameter routes (:id, :slug)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Admin Routes (MUST come first - protected) ───────────────────────────────
// These routes have specific string paths that would otherwise match /:id

// GET /api/services/admin/all → all services including inactive
router.get('/admin/all', protect, serviceController.getAllServicesAdmin);

// PUT /api/services/reorder → update sort order
router.put('/reorder', protect, serviceController.reorderServices);

// ─── Public Routes (string-based, come before dynamic params) ─────────────────

// GET /api/services/slug/:slug → single service by slug (public detail page)
router.get('/slug/:slug', serviceController.getServiceBySlug);

// GET /api/services → all active services (sorted by order)
router.get('/', serviceController.getAllServices);

// ─── Admin CRUD Routes (protected, come after specific routes) ────────────────

// POST /api/services → create new service (with optional image uploads)
router.post('/', protect, serviceImageUpload, serviceController.createService);

// ─── Dynamic Parameter Routes (MUST be LAST) ───────────────────────────────────
// These will match any string, so they must come after all specific routes

// GET /api/services/:id → single service by MongoDB _id
router.get('/:id', protect, serviceController.getServiceById);

// PUT /api/services/:id → update existing service
router.put('/:id', protect, serviceImageUpload, serviceController.updateService);

// DELETE /api/services/:id → delete service and its Cloudinary images
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;