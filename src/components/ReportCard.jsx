import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, MessageCircle, AlertTriangle, TrendingUp, CheckCircle, Send, Plus, Radio, Shield, Activity, FileText, Lock, Loader2, Edit3, ArrowRight, Zap, LogOut, Menu, X, Bell, User, TrendingUp as TrendingIcon } from 'lucide-react';
import { sanitize, checkRateLimit } from '../security';
import { copyToClipboard } from '../utils';

export const ReportCard = memo(({ report, onVote, role, activeVote, onAddComment, onDeleteReport, index, currUsername, currentUserEmail, showToast }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isTrending = report.upvotes > 70;
  const isPriority = report.category === 'Safety' || report.category === 'Harassment';
  const isOwner = (report.user_id && report.author_email === currentUserEmail) || (report.author_email && report.author_email === currentUserEmail);

  const submitComment = (e) => {
    e.preventDefault();
    const cleanText = sanitize(commentText);
    if (!cleanText.trim()) return;

    const limit = checkRateLimit(`USER_${role}`, 'comment');
    if (!limit.ok) {
      setErrorMsg(`Wait ${limit.remaining}s before new comment.`);
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }

    onAddComment(report.id, cleanText, currUsername || 'ANON_OPERATIVE');
    setCommentText('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -12, scale: 1.01, transition: { duration: 0.2 } }}
      className={`card-v18 border-${report.category} ${index % 2 === 0 ? '' : 'card-alt-v18'}`}
      style={{ marginBottom: '32px' }}
    >
      <div className="v-stack" style={{ gap: '20px', alignItems: 'stretch' }}>
        <div className="flex-v6" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="v-stack" style={{ gap: '8px', alignItems: 'flex-start', flex: 1 }}>
            <div className="flex-v6" style={{ gap: '8px', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}>
              <span 
                className="badge-v7 category" 
                style={{ background: 'rgba(255,255,255,0.05)', fontSize: '10px', cursor: 'pointer' }}
                title="Click to copy Intel ID"
                onClick={async () => {
                  const ok = await copyToClipboard(report.id);
                  if (ok) showToast('LOG_COPIED', `Intel ID #${report.id.slice(0,8)}... secure on clipboard.`, 'info');
                }}
              >#{report.id?.toString().slice(0, 8).toUpperCase()}</span>
              {report.institution_verified && (
                <span className="badge-v7" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', border: 'none', fontSize: '9px', fontWeight: '900' }}>
                  <Shield size={10} style={{ marginRight: '4px' }} /> INST_VERIFIED
                </span>
              )}
              <span className="badge-v7 category" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '10px' }}>{report.category.toUpperCase()}</span>
              {isPriority && <span className="trigger-v18 trigger-priority"><AlertTriangle size={12} /> Priority</span>}
              {isTrending && <span className="trigger-v18 trigger-trending"><TrendingIcon size={12} /> Trending</span>}
            </div>
            <h3 className="h-title" style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.01em', color: '#fff', textAlign: 'left' }}>{report.title}</h3>
          </div>

          <div className="vote-group-v8">
            <button
              className={`vote-btn-v8 ${activeVote === 1 ? 'up active' : ''}`}
              onClick={() => onVote(report.id, 1)}
            >
              <ChevronUp size={22} strokeWidth={3} />
            </button>
            <span className="vote-count-v8">{report.upvotes}</span>
            <button
              className={`vote-btn-v8 ${activeVote === -1 ? 'down active' : ''}`}
              onClick={() => onVote(report.id, -1)}
            >
              <ChevronDown size={22} strokeWidth={3} />
            </button>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', opacity: 0.9, textAlign: 'left' }}>
          {report.content}
        </p>

        {report.image_url && (
          <div className="report-image-v30" style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
            <img src={report.image_url} alt="Intel Media" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        )}

        <div className="footer-v6 flex-v6" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '24px', justifyContent: 'space-between' }}>
          <div className="flex-v6" style={{ gap: '20px' }}>
            <button
              className="flex-v6"
              style={{ fontSize: '12px', color: 'var(--text-dim)', gap: '8px', cursor: 'pointer', background: 'none', border: 'none', fontWeight: '700' }}
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle size={16} /> {report.comments?.length || 0} Comments
            </button>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', opacity: 0.5 }}>
              {new Date(report.timestamp).toLocaleDateString()}
            </div>
          </div>

          {(role === 'Admin' || role === 'Professor') && (
            <button className="btn-v6 secondary" style={{ padding: '8px 16px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}><CheckCircle size={14} /> VERIFY</button>
          )}

          {(role === 'Admin' || isOwner) && (
            <button
              className="action-btn-v14 danger"
              style={{ padding: '8px 16px', color: '#ef4444' }}
              onClick={() => onDeleteReport && onDeleteReport(report.id)}
            >
              DELETE_LOG
            </button>
          )}
        </div>

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="comment-thread-v11 overflow-hidden"
              style={{ marginTop: '24px', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}
            >
              {(report.comments || []).map(c => (
                <div key={c.id} className="comment-v11">
                  <div className="c-head" style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '11px', fontWeight: '800' }}>
                    <span style={{ color: 'var(--primary)' }}>{c.user}</span>
                    <span style={{ color: 'var(--text-dim)', opacity: 0.5 }}>· {new Date(c.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{c.text}</p>
                </div>
              ))}

              <form onSubmit={submitComment} className="comment-input-group-v11">
                <input
                  className="comment-input-v11"
                  placeholder="Add an anonymous comment..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                />
                <button type="submit" className="comment-btn-v11"><Send size={14} /></button>
              </form>

              {errorMsg && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-v6" style={{ color: '#ef4444', fontSize: '10px', fontWeight: '800', marginTop: '12px', gap: '8px', justifyContent: 'flex-start' }}>
                  <AlertTriangle size={12} /> {errorMsg.toUpperCase()}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});
