// ════════════════════════════════════════════════════════
// COMMENTS.jsx — save as src/pages/Comments.jsx
// ════════════════════════════════════════════════════════
import { useEffect, useState } from 'react';
import { blogService, commentService } from '../services/api';
import toast from 'react-hot-toast';
import { CheckCircle, Trash2, Reply, X } from 'lucide-react';

export function Comments() {
  const [blogs, setBlogs]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [replyModal, setReplyModal] = useState(null);
  const [replyText, setReplyText]   = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await blogService.getAll({ limit: 100 });
      setBlogs(res.data.data.filter(b => b.comments?.length > 0));
    } catch { toast.error('Failed to load comments'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const approve = async (blogId, commentId) => {
    try { await commentService.approve(blogId, commentId); toast.success('Comment approved'); fetchBlogs(); }
    catch { toast.error('Failed to approve'); }
  };

  const remove = async (blogId, commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try { await commentService.delete(blogId, commentId); toast.success('Deleted'); fetchBlogs(); }
    catch { toast.error('Failed to delete'); }
  };

  const sendReply = async () => {
    if (!replyText.trim()) return;
    setSubmitting(true);
    try {
      await commentService.reply(replyModal.blogId, replyModal.commentId, { desc: replyText });
      toast.success('Reply sent'); setReplyModal(null); setReplyText(''); fetchBlogs();
    } catch { toast.error('Failed to send reply'); }
    finally { setSubmitting(false); }
  };

  const allComments = blogs.flatMap(blog =>
    (blog.comments || []).map(c => ({ ...c, blogId: blog._id, blogTitle: blog.title }))
  );
  const pending  = allComments.filter(c => !c.isApproved);
  const approved = allComments.filter(c => c.isApproved);

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '3px solid #ecf0f0', borderTopColor: '#1a598a' }} />
    </div>
  );

  const CommentRow = ({ comment }) => (
    <div className="rounded-2xl p-5 transition-all hover:shadow-sm" style={{ background: '#ffffff', border: '1px solid #ecf0f0' }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-semibold text-sm" style={{ color: '#0c1e21' }}>{comment.authorName}</span>
            {comment.email && <span className="text-xs" style={{ color: '#a9b8b8' }}>({comment.email})</span>}
            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
              style={comment.isApproved
                ? { background: '#1e8a8a15', color: '#1e8a8a' }
                : { background: '#d9770615', color: '#d97706' }}>
              {comment.isApproved ? 'Approved' : 'Pending'}
            </span>
          </div>
          <p className="text-sm mb-2" style={{ color: '#1a425c' }}>{comment.desc}</p>
          <p className="text-xs" style={{ color: '#a9b8b8' }}>
            On: <span style={{ color: '#67787a' }}>{comment.blogTitle}</span>
            {comment.date && ` · ${new Date(comment.date).toLocaleDateString()}`}
          </p>
          {comment.replies?.length > 0 && (
            <div className="mt-3 ml-4 space-y-2 pl-4" style={{ borderLeft: '2px solid #ecf0f0' }}>
              {comment.replies.map((r, i) => (
                <div key={i} className="text-sm">
                  <span className="font-semibold" style={{ color: '#1a598a' }}>{r.authorName}: </span>
                  <span style={{ color: '#67787a' }}>{r.desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {!comment.isApproved && (
            <button onClick={() => approve(comment.blogId, comment._id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{ color: '#a9b8b8', background: '#f8fafb', border: '1px solid #ecf0f0' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#1e8a8a'; e.currentTarget.style.background = '#1e8a8a10'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#a9b8b8'; e.currentTarget.style.background = '#f8fafb'; }}>
              <CheckCircle size={15} />
            </button>
          )}
          <button onClick={() => { setReplyModal({ blogId: comment.blogId, commentId: comment._id, authorName: comment.authorName }); setReplyText(''); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{ color: '#a9b8b8', background: '#f8fafb', border: '1px solid #ecf0f0' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#1a598a'; e.currentTarget.style.background = '#1a598a10'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#a9b8b8'; e.currentTarget.style.background = '#f8fafb'; }}>
            <Reply size={15} />
          </button>
          <button onClick={() => remove(comment.blogId, comment._id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{ color: '#a9b8b8', background: '#f8fafb', border: '1px solid #ecf0f0' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = '#ef444410'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#a9b8b8'; e.currentTarget.style.background = '#f8fafb'; }}>
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 lg:p-8 space-y-7">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#0c1e21' }}>Comments</h1>
        <p className="text-sm mt-0.5" style={{ color: '#67787a' }}>{pending.length} pending · {approved.length} approved</p>
      </div>

      {pending.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full" style={{ background: '#d97706' }} />
            <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#d97706' }}>Pending Approval ({pending.length})</h2>
          </div>
          <div className="space-y-3">{pending.map(c => <CommentRow key={c._id} comment={c} />)}</div>
        </div>
      )}

      {approved.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full" style={{ background: '#1e8a8a' }} />
            <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#1e8a8a' }}>Approved ({approved.length})</h2>
          </div>
          <div className="space-y-3">{approved.map(c => <CommentRow key={c._id} comment={c} />)}</div>
        </div>
      )}

      {allComments.length === 0 && (
        <div className="text-center py-20 rounded-2xl" style={{ background: '#ffffff', border: '1px solid #ecf0f0' }}>
          <p style={{ color: '#a9b8b8' }}>No comments yet</p>
        </div>
      )}

      {/* Reply modal */}
      {replyModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md rounded-2xl p-6 shadow-xl" style={{ background: '#ffffff', border: '1px solid #ecf0f0' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold" style={{ color: '#0c1e21' }}>Reply to {replyModal.authorName}</h3>
              <button onClick={() => setReplyModal(null)} style={{ color: '#a9b8b8' }} className="hover:text-gray-700 transition-colors"><X size={19} /></button>
            </div>
            <textarea rows={4} value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write your reply…"
              className="w-full rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none transition-all"
              style={{ background: '#f8fafb', border: '1.5px solid #ecf0f0', color: '#0c1e21', resize: 'none' }}
              onFocus={e => e.target.style.borderColor = '#1a598a'}
              onBlur={e => e.target.style.borderColor = '#ecf0f0'}
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setReplyModal(null)} className="px-4 py-2 text-sm rounded-xl transition-all" style={{ color: '#67787a', background: '#ecf0f0' }}>Cancel</button>
              <button onClick={sendReply} disabled={submitting || !replyText.trim()}
                className="text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:shadow-md disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #1a598a, #015599)' }}>
                {submitting ? 'Sending…' : 'Send Reply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;