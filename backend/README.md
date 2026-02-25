# Blog MERN Stack Backend + Admin Panel

Complete backend API and admin panel for your Next.js blog.

---

## 📁 Project Structure

```
blog-backend/          ← Express + MongoDB API
  src/
    config/
      database.js      ← MongoDB connection
    models/
      User.js          ← Admin user model
      Blog.js          ← Blog post model (mirrors your JSON structure)
    controllers/
      authController.js   ← Login, register, me
      blogController.js   ← Full CRUD + comments
    routes/
      authRoutes.js    ← /api/auth/*
      blogRoutes.js    ← /api/blogs/* and /api/admin/*
    middleware/
      auth.js          ← JWT protect + role authorize
      error.js         ← Centralized error handler
      upload.js        ← Multer image upload
    server.js          ← Entry point
  seed.js              ← Seed admin + blogs from JSON

blog-admin/            ← React + Vite + Tailwind admin UI
  src/
    context/
      AuthContext.jsx  ← Auth state
    services/
      api.js           ← Axios wrappers for all API calls
    components/
      Layout.jsx       ← Sidebar + navigation shell
    pages/
      Login.jsx        ← Admin login
      Dashboard.jsx    ← Stats overview
      BlogList.jsx     ← Blog management table
      BlogForm.jsx     ← Create / Edit blog with image upload
      Comments.jsx     ← Approve / reply / delete comments
      Settings.jsx     ← Password change + API reference
```

---

## 🚀 Backend Setup

### 1. Install dependencies
```bash
cd blog-backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog_db
JWT_SECRET=change_this_to_something_long_and_random
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:5173
```

### 3. Seed initial data (optional)
Copy your `blogs.json` to `blog-backend/blogs-seed.json`, then:
```bash
node seed.js
```
This creates an admin user (`admin@blog.com` / `admin123`) and imports your JSON blogs.

### 4. Run the server
```bash
npm run dev      # development with nodemon
npm start        # production
```

API runs at: `http://localhost:5000`

---

## 🖥️ Admin Panel Setup

### 1. Install dependencies
```bash
cd blog-admin
npm install
```

### 2. Run dev server
```bash
npm run dev
```

Admin panel runs at: `http://localhost:5173`

Login with: `admin@blog.com` / `admin123`

### 3. Build for production
```bash
npm run build
```

---

## 🔌 Connecting to your Next.js Frontend

Your existing `getBlogs.js` / `getBlogById` already support the API. Just set:

```env
# In your Next.js .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

The API response format matches what your components expect:
```json
{
  "success": true,
  "data": { /* blog object with all same fields as JSON */ }
}
```

---

## 📡 API Reference

### Public Endpoints (no auth required)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/blogs` | List blogs (paginated, filterable) |
| GET | `/api/blogs/:id` | Get single blog by ID or slug |
| GET | `/api/blogs/categories` | All categories |
| GET | `/api/blogs/tags` | All tags |
| POST | `/api/blogs/:id/comments` | Submit comment (goes to pending) |

#### Query parameters for `/api/blogs`:
- `?page=1&limit=9` — pagination
- `?category=Business` — filter by category
- `?tag=Marketing` — filter by tag
- `?search=innovation` — full-text search
- `?status=Tutorial` — filter by status
- `?sort=-createdAt` — sort field

### Auth Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/login` | Login `{email, password}` |
| POST | `/api/auth/register` | Register new admin |
| GET | `/api/auth/me` | Get current user (🔒) |
| PUT | `/api/auth/update-password` | Change password (🔒) |

### Admin Endpoints (🔒 require Bearer token)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/blogs` | All blogs including drafts |
| POST | `/api/admin/blogs` | Create blog (supports multipart/form-data for images) |
| PUT | `/api/admin/blogs/:id` | Update blog |
| DELETE | `/api/admin/blogs/:id` | Delete blog (admin only) |
| PATCH | `/api/admin/blogs/:id/comments/:commentId/approve` | Approve comment |
| DELETE | `/api/admin/blogs/:id/comments/:commentId` | Delete comment |
| POST | `/api/admin/blogs/:id/comments/:commentId/reply` | Reply to comment |

---

## 🖼️ Image Upload

Images are uploaded via multipart/form-data. Supported fields:
- `img` — main listing image
- `detailsImg` — details page hero
- `img1`, `img2` — inline content grid
- `smallImg` — sidebar thumbnail
- `videoImg` — video section poster

Uploaded files are served at: `http://localhost:5000/uploads/filename.jpg`

You can also just pass a URL string for images (from CDN or existing paths).

---

## 🔐 Security Notes

1. Change `JWT_SECRET` in production
2. Change the default admin password after first login
3. In production, configure CORS to only allow your actual domain
4. Consider adding rate limiting (`express-rate-limit`) for production
5. Uploaded images are stored locally — for production use AWS S3 or Cloudinary

---

## 🗄️ Blog Document Schema

```js
{
  title, slug,           // required
  desc, desc1, desc2,    // paragraphs (short)
  body,                  // full rich-text content
  img, detailsImg,       // images
  img1, img2, img3, img4, img5, img6, smallImg,
  slider: [String],      // slider images array
  category, tags,        // taxonomy
  status,                // Tutorial | TIPS | FREEBIES | News | Draft
  author, author_role, authorImg,
  day, month,            // display date helpers
  videoUrl, videoImg,    // video section
  isPublished,           // true = live, false = draft
  isFeatured,
  comments: [{
    authorName, email, desc,
    isApproved,           // moderation flag
    date,
    replies: [{ authorName, desc, date }]
  }],
  blogTopList: [{ iconName, name, path }],
  createdAt, updatedAt   // auto-managed
}
```
