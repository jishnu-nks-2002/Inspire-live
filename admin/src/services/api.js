import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({ baseURL: API_BASE });

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ───────────────────────────────────────────────────────────────────────
export const authService = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updatePassword: (data) => api.put('/auth/update-password', data),
};

// ── Blogs ──────────────────────────────────────────────────────────────────────
export const blogService = {
  getAll:    (params) => api.get('/admin/blogs', { params }),
  getById:   (id)     => api.get(`/blogs/${id}`),
  create:    (data)   => api.post('/admin/blogs', data),       // FormData for images
  update:    (id, data) => api.put(`/admin/blogs/${id}`, data),
  delete:    (id)     => api.delete(`/admin/blogs/${id}`),
  getStats:  ()       => api.get('/admin/stats'),
};

// ── Comments ───────────────────────────────────────────────────────────────────
export const commentService = {
  approve: (blogId, commentId) =>
    api.patch(`/admin/blogs/${blogId}/comments/${commentId}/approve`),
  delete: (blogId, commentId) =>
    api.delete(`/admin/blogs/${blogId}/comments/${commentId}`),
  reply: (blogId, commentId, data) =>
    api.post(`/admin/blogs/${blogId}/comments/${commentId}/reply`, data),
};
// api.js — add this alongside blogService, commentService, etc.

// ── Services ───────────────────────────────────────────────────────────────────
export const serviceService = {
  // Public
  getAll:       (params) => api.get('/services', { params }),
  getBySlug:    (slug)   => api.get(`/services/slug/${slug}`),

  // Admin (protected)
  getAllAdmin:   (params) => api.get('/services/admin/all', { params }),
  getById:      (id)     => api.get(`/services/${id}`),
  create:       (data)   => api.post('/services', data),         // FormData for images
  update:       (id, data) => api.put(`/services/${id}`, data),  // FormData for images
  reorder:      (data)   => api.put('/services/reorder', data),
  delete:       (id)     => api.delete(`/services/${id}`),
};

export default api;
