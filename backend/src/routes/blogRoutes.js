const express = require('express');
const router = express.Router();
const {
  getBlogs, getBlog, getCategories, getTags, addComment,
  createBlog, updateBlog, deleteBlog, adminGetBlogs,
  approveComment, deleteComment, replyToComment, getStats,
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// ── Public routes ──────────────────────────────────────────────────────────────
router.get('/',           getBlogs);
router.get('/categories', getCategories);
router.get('/tags',       getTags);
router.get('/:id',        getBlog);
router.post('/:id/comments', addComment);

// ── Admin routes ───────────────────────────────────────────────────────────────
// All routes below require authentication
const adminRouter = express.Router();
adminRouter.use(protect, authorize('admin', 'editor'));

adminRouter.get('/stats', getStats);
adminRouter.get('/blogs', adminGetBlogs);

// Multi-field image upload  (img, img1, img2, detailsImg, smallImg, videoImg)
const blogUpload = upload.fields([
  { name: 'img',        maxCount: 1 },
  { name: 'detailsImg', maxCount: 1 },
  { name: 'img1',       maxCount: 1 },
  { name: 'img2',       maxCount: 1 },
  { name: 'smallImg',   maxCount: 1 },
  { name: 'videoImg',   maxCount: 1 },
]);

adminRouter.post('/blogs',        blogUpload, createBlog);
adminRouter.put('/blogs/:id',     blogUpload, updateBlog);
adminRouter.delete('/blogs/:id',  authorize('admin'), deleteBlog);

// Comment management
adminRouter.patch('/blogs/:id/comments/:commentId/approve', approveComment);
adminRouter.delete('/blogs/:id/comments/:commentId',        deleteComment);
adminRouter.post('/blogs/:id/comments/:commentId/reply',    replyToComment);

module.exports = { blogRouter: router, adminRouter };
