import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Search, Star, Eye, EyeOff, FileText } from 'lucide-react';

const CATEGORIES = ['All', 'Corporate', 'Business', 'Consulting', 'Innovations', 'Managements', 'Marketing'];
const STATUSES = ['All', 'Tutorial', 'TIPS', 'FREEBIES', 'News', 'Draft'];

export default function BlogList() {
  const [blogs, setBlogs]       = useState([]);
  const [total, setTotal]       = useState(0);
  const [page, setPage]         = useState(1);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus]     = useState('');
  const [deleting, setDeleting] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      if (category && category !== 'All') params.category = category;
      if (status && status !== 'All') params.status = status;
      const res = await blogService.getAll(params);
      setBlogs(res.data.data);
      setTotal(res.data.total);
    } catch {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, [page, category, status]);
  useEffect(() => { setPage(1); fetchBlogs(); }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    setDeleting(id);
    try {
      await blogService.delete(id);
      toast.success('Blog deleted');
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  const pages = Math.ceil(total / 10);

  const selectStyle = {
    background: '#ffffff',
    border: '1.5px solid #ecf0f0',
    color: '#1a425c',
    borderRadius: '12px',
    padding: '10px 14px',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0c1e21' }}>Blog Posts</h1>
          <p className="text-sm mt-0.5" style={{ color: '#67787a' }}>{total} posts total</p>
        </div>
        <Link
          to="/blogs/new"
          className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #1a598a, #015599)' }}
        >
          <Plus size={15} /> New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#a9b8b8' }} />
          <input
            type="text"
            placeholder="Search blogs…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-all"
            style={{ background: '#ffffff', border: '1.5px solid #ecf0f0', color: '#0c1e21' }}
            onFocus={e => e.target.style.borderColor = '#1a598a'}
            onBlur={e => e.target.style.borderColor = '#ecf0f0'}
          />
        </div>
        <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }} style={selectStyle}>
          {CATEGORIES.map(c => <option key={c} value={c === 'All' ? '' : c}>{c}</option>)}
        </select>
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} style={selectStyle}>
          {STATUSES.map(s => <option key={s} value={s === 'All' ? '' : s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid #ecf0f0' }}>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '3px solid #ecf0f0', borderTopColor: '#1a598a' }} />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#ecf0f0' }}>
              <FileText size={28} style={{ color: '#a9b8b8' }} />
            </div>
            <p className="font-medium" style={{ color: '#67787a' }}>No blog posts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ borderBottom: '1px solid #ecf0f0' }}>
                <tr>
                  {['Post', 'Category', 'Status', 'Published', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: '#a9b8b8' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog._id} className="transition-colors hover:bg-gray-50" style={{ borderBottom: '1px solid #ecf0f0' }}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {blog.img ? (
                          <img src={blog.img} alt="" className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                            onError={e => e.target.style.display = 'none'} />
                        ) : (
                          <div className="w-10 h-10 rounded-xl flex-shrink-0" style={{ background: '#ecf0f0' }} />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate max-w-xs" style={{ color: '#0c1e21' }}>{blog.title}</p>
                          {blog.isFeatured && (
                            <span className="flex items-center gap-1 text-xs" style={{ color: '#d97706' }}>
                              <Star size={10} fill="currentColor" /> Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm" style={{ color: '#1a425c' }}>{blog.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: '#1a598a12', color: '#1a598a' }}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: blog.isPublished ? '#1e8a8a' : '#a9b8b8' }}>
                        {blog.isPublished ? <Eye size={13} /> : <EyeOff size={13} />}
                        {blog.isPublished ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs" style={{ color: '#a9b8b8' }}>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Link to={`/blogs/edit/${blog._id}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                          style={{ color: '#a9b8b8', background: '#f8fafb', border: '1px solid #ecf0f0' }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#1a598a'; e.currentTarget.style.borderColor = '#1a598a40'; e.currentTarget.style.background = '#1a598a10'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#a9b8b8'; e.currentTarget.style.borderColor = '#ecf0f0'; e.currentTarget.style.background = '#f8fafb'; }}
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          disabled={deleting === blog._id}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-50"
                          style={{ color: '#a9b8b8', background: '#f8fafb', border: '1px solid #ecf0f0' }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#ef444440'; e.currentTarget.style.background = '#ef444410'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#a9b8b8'; e.currentTarget.style.borderColor = '#ecf0f0'; e.currentTarget.style.background = '#f8fafb'; }}
                        >
                          {deleting === blog._id
                            ? <span className="w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin block" style={{ borderColor: '#ef4444', borderTopColor: 'transparent' }} />
                            : <Trash2 size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200"
              style={p === page
                ? { background: 'linear-gradient(135deg, #1a598a, #015599)', color: '#ffffff' }
                : { background: '#ffffff', color: '#67787a', border: '1px solid #ecf0f0' }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}