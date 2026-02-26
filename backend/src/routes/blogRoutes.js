const express = require('express');
const blogRouter = express.Router();
const adminRouter = express.Router();
const blogController = require('../controllers/blogController');
const { uploadImage } = require('../middleware/uploadMiddleware');
const { protect, authorize } = require('../middleware/auth');

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC BLOG ROUTES (blogRouter) - /api/blogs
// ═══════════════════════════════════════════════════════════════════════════

// GET /api/blogs - Get all published blogs (with pagination, filters)
blogRouter.get('/', blogController.getBlogs);

// GET /api/blogs/categories - Get all categories
blogRouter.get('/categories', blogController.getCategories);

// GET /api/blogs/tags - Get all tags
blogRouter.get('/tags', blogController.getTags);

// GET /api/blogs/:id - Get single blog by ID or slug
blogRouter.get('/:id', blogController.getBlog);

// POST /api/blogs/:id/comments - Add comment to blog
blogRouter.post('/:id/comments', blogController.addComment);

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN BLOG ROUTES (adminRouter) - /api/admin
// ═══════════════════════════════════════════════════════════════════════════

// Protect all admin routes
adminRouter.use(protect);
adminRouter.use(authorize('admin', 'editor'));

// GET /api/admin/blogs - Get all blogs (including drafts)
adminRouter.get('/blogs', blogController.adminGetBlogs);

// GET /api/admin/stats - Get blog statistics
adminRouter.get('/stats', blogController.getStats);

// POST /api/admin/blogs - Create new blog with multiple image uploads
adminRouter.post(
  '/blogs',
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
adminRouter.put(
  '/blogs/:id',
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
adminRouter.delete('/blogs/:id', blogController.deleteBlog);

// PATCH /api/admin/blogs/:id/comments/:commentId/approve - Approve comment
adminRouter.patch('/blogs/:id/comments/:commentId/approve', blogController.approveComment);

// DELETE /api/admin/blogs/:id/comments/:commentId - Delete comment
adminRouter.delete('/blogs/:id/comments/:commentId', blogController.deleteComment);

// POST /api/admin/blogs/:id/comments/:commentId/reply - Reply to comment
adminRouter.post('/blogs/:id/comments/:commentId/reply', blogController.replyToComment);

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS - Must match server.js import: { blogRouter, adminRouter }
// ═══════════════════════════════════════════════════════════════════════════
module.exports = { blogRouter, adminRouter };