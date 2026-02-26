const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/Servicecontroller');
const { protect } = require('../middleware/auth');
const { uploadImage } = require('../middleware/uploadMiddleware');

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE IMAGE UPLOAD CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const serviceImageUpload = uploadImage.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'detailImage1', maxCount: 1 },
  { name: 'detailImage2', maxCount: 1 },
]);

// ═══════════════════════════════════════════════════════════════════════════════
// ROUTE ORDERING - CRITICAL!
// Specific routes MUST come before dynamic parameter routes (:id, :slug)
// Express matches routes top-to-bottom, first match wins
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN ROUTES (Protected - Require Authentication)
// ─────────────────────────────────────────────────────────────────────────────

// GET /api/services/admin/all
// Get all services (including inactive) for admin panel
router.get('/admin/all', protect, serviceController.getAllServicesAdmin);

// PUT /api/services/reorder
// Reorder services by updating their order property
router.put('/reorder', protect, serviceController.reorderServices);

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC ROUTES (No Authentication Required)
// ─────────────────────────────────────────────────────────────────────────────

// GET /api/services/slug/:slug
// Get single service by slug (for public detail pages)
router.get('/slug/:slug', serviceController.getServiceBySlug);

// GET /api/services
// Get all active services (public listing page)
router.get('/', serviceController.getAllServices);

// ─────────────────────────────────────────────────────────────────────────────
// CRUD ROUTES (Protected - Require Authentication)
// ─────────────────────────────────────────────────────────────────────────────

// POST /api/services
// Create new service with image uploads
router.post('/', protect, serviceImageUpload, serviceController.createService);

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC PARAMETER ROUTES (Protected - MUST BE LAST)
// ─────────────────────────────────────────────────────────────────────────────

// GET /api/services/:id
// Get single service by MongoDB _id (admin only)
router.get('/:id', protect, serviceController.getServiceById);

// PUT /api/services/:id
// Update service by MongoDB _id with image uploads
router.put('/:id', protect, serviceImageUpload, serviceController.updateService);

// DELETE /api/services/:id
// Delete service and its Cloudinary images by MongoDB _id
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;