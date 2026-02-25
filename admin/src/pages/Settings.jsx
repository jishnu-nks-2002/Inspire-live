// Settings.jsx — save as src/pages/Settings.jsx
import { useState } from 'react';
import { authService } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwdForm.newPassword !== pwdForm.confirm) return toast.error('Passwords do not match');
    if (pwdForm.newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await authService.updatePassword({ currentPassword: pwdForm.currentPassword, newPassword: pwdForm.newPassword });
      toast.success('Password updated successfully');
      setPwdForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', background: '#f8fafb', border: '1.5px solid #ecf0f0',
    color: '#0c1e21', borderRadius: '12px', padding: '10px 14px',
    fontSize: '14px', outline: 'none', transition: 'border-color 0.2s',
  };

  const card = { background: '#ffffff', border: '1px solid #ecf0f0', borderRadius: '16px', padding: '24px' };

  const METHOD_COLORS = {
    GET:    { bg: '#1a598a12', color: '#1a598a' },
    POST:   { bg: '#1e8a8a12', color: '#1e8a8a' },
    PUT:    { bg: '#d9770612', color: '#d97706' },
    DELETE: { bg: '#ef444412', color: '#ef4444' },
  };

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#0c1e21' }}>Settings</h1>
        <p className="text-sm mt-0.5" style={{ color: '#67787a' }}>Manage your account</p>
      </div>

      {/* Account info */}
      <div style={card}>
        <div className="flex items-center gap-2 mb-5">
          <User size={16} style={{ color: '#1a598a' }} />
          <h2 className="font-semibold text-sm" style={{ color: '#0c1e21' }}>Account Info</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Name', value: user?.name },
            { label: 'Email', value: user?.email },
            { label: 'Role', value: user?.role },
            { label: 'Status', value: user?.isActive ? '✅ Active' : '🚫 Inactive' },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl p-3" style={{ background: '#f8fafb', border: '1px solid #ecf0f0' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#a9b8b8' }}>{label}</p>
              <p className="text-sm font-semibold" style={{ color: '#0c1e21' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Change password */}
      <div style={card}>
        <div className="flex items-center gap-2 mb-5">
          <Lock size={16} style={{ color: '#1a598a' }} />
          <h2 className="font-semibold text-sm" style={{ color: '#0c1e21' }}>Change Password</h2>
        </div>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          {[
            { key: 'currentPassword', label: 'Current Password' },
            { key: 'newPassword', label: 'New Password' },
            { key: 'confirm', label: 'Confirm New Password' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#67787a' }}>{label}</label>
              <div className="relative">
                <input type={showPwd ? 'text' : 'password'} value={pwdForm[key]} required
                  onChange={e => setPwdForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{ ...inputStyle, paddingRight: key === 'currentPassword' ? '44px' : '14px' }}
                  placeholder="••••••••"
                  onFocus={e => e.target.style.borderColor = '#1a598a'}
                  onBlur={e => e.target.style.borderColor = '#ecf0f0'}
                />
                {key === 'currentPassword' && (
                  <button type="button" onClick={() => setShowPwd(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: '#a9b8b8' }}>
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-60 disabled:transform-none flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #1a598a, #015599)' }}>
            {loading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Updating…</> : 'Update Password'}
          </button>
        </form>
      </div>

      {/* API Endpoints */}
      <div style={card}>
        <h2 className="font-semibold text-sm mb-4" style={{ color: '#0c1e21' }}>API Endpoints</h2>
        <div className="space-y-1 font-mono text-xs">
          {[
            ['GET',    '/api/blogs',              'List published blogs'],
            ['GET',    '/api/blogs/:id',          'Get single blog'],
            ['GET',    '/api/blogs/categories',   'List categories'],
            ['POST',   '/api/blogs/:id/comments', 'Submit comment'],
            ['POST',   '/api/auth/login',         'Admin login'],
            ['GET',    '/api/admin/blogs',         '🔒 All blogs'],
            ['POST',   '/api/admin/blogs',         '🔒 Create blog'],
            ['PUT',    '/api/admin/blogs/:id',     '🔒 Update blog'],
            ['DELETE', '/api/admin/blogs/:id',     '🔒 Delete blog'],
            ['GET',    '/api/admin/stats',         '🔒 Dashboard stats'],
            ['GET',    '/api/banner',              'Public banner'],
            ['GET',    '/api/banner/admin',        '🔒 Admin banner'],
          ].map(([method, path, desc]) => (
            <div key={path} className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid #ecf0f0' }}>
              <span className="w-14 text-center py-0.5 rounded-lg text-xs font-bold flex-shrink-0"
                style={{ background: METHOD_COLORS[method]?.bg, color: METHOD_COLORS[method]?.color }}>
                {method}
              </span>
              <span className="flex-1" style={{ color: '#1a425c' }}>{path}</span>
              <span className="hidden sm:block" style={{ color: '#a9b8b8' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}