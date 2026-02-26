const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { uploadImage } = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth'); // Your auth middleware

// ─── Public Routes ───────────────────────────────────────────────────────────

// GET /api/blogs - Get all published blogs (with pagination, filters)
router.get('/', blogController.getBlogs);

// GET /api/blogs/categories - Get all categories
router.get('/categories', blogController.getCategories);

// GET /api/blogs/tags - Get all tags
router.get('/tags', blogController.getTags);

// GET /api/blogs/:id - Get single blog by ID or slug
router.get('/:id', blogController.getBlog);

// POST /api/blogs/:id/comments - Add comment to blog
router.post('/:id/comments', blogController.addComment);

// ─── Admin Routes ────────────────────────────────────────────────────────────

// Protect admin routes
router.use('/admin', protect, authorize('admin', 'editor'));

// GET /api/admin/blogs - Get all blogs (including drafts)
router.get('/admin', blogController.adminGetBlogs);

// GET /api/admin/stats - Get blog statistics
router.get('/admin/stats', blogController.getStats);

// POST /api/admin/blogs - Create new blog
// Supports multiple image fields
router.post(
  '/admin',
  uploadImage.fields([
    { name: 'img', maxCount: 1 },
    { name: 'detailsImg', maxCount: 1 },
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 },
    { name: 'img4', maxCount: 1 },
    { name: 'img5', maxCount: 1 },
    { name: 'img6', maxCount: 1 },
    { name: 'smallImg', maxCount: 1 },
    { name: 'videoImg', maxCount: 1 },
  ]),
  blogController.createBlog
);

// PUT /api/admin/blogs/:id - Update blog
router.put(
  '/admin/:id',
  uploadImage.fields([
    { name: 'img', maxCount: 1 },
    { name: 'detailsImg', maxCount: 1 },
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 },
    { name: 'img4', maxCount: 1 },
    { name: 'img5', maxCount: 1 },
    { name: 'img6', maxCount: 1 },
    { name: 'smallImg', maxCount: 1 },
    { name: 'videoImg', maxCount: 1 },
  ]),
  blogController.updateBlog
);

// DELETE /api/admin/blogs/:id - Delete blog
router.delete('/admin/:id', blogController.deleteBlog);

// PATCH /api/admin/blogs/:id/comments/:commentId/approve - Approve comment
router.patch('/admin/:id/comments/:commentId/approve', blogController.approveComment);

// DELETE /api/admin/blogs/:id/comments/:commentId - Delete comment
router.delete('/admin/:id/comments/:commentId', blogController.deleteComment);

// POST /api/admin/blogs/:id/comments/:commentId/reply - Reply to comment
router.post('/admin/:id/comments/:commentId/reply', blogController.replyToComment);

module.exports = router;