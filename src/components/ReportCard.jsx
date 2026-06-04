import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, MessageCircle, AlertTriangle, TrendingUp, CheckCircle, Send, Plus, Radio, Shield, Activity, FileText, Lock, Loader2, Edit3, ArrowRight, Zap, LogOut, Menu, X, Bell, User, TrendingUp as TrendingIcon } from 'lucide-react';
import { sanitize, checkRateLimit } from '../security';
import { copyToClipboard } from '../utils';

export const ReportCard = memo(({ report, onVote, role, activeVote, onAddComment, onDeleteReport, index, currUsername, currentUserEmail, showToast }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [winWidth, setWinWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobile = winWidth < 768;

  const [isExpanded, setIsExpanded] = useState(false);
  const showReadMore = !isExpanded && report.content?.length > 180;
  const displayContent = showReadMore ? `${report.content.slice(0, 180)}...` : report.content;

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`bento-item border-${report.category} ${index % 2 === 0 ? '' : 'card-alt-v18'}`}
      style={{ marginBottom: '24px' }}
    >
      <div className="flashlight-glow"></div>
      
      <div className="v-stack" style={{ gap: '20px', alignItems: 'stretch', position: 'relative', zIndex: 2 }}>
        <div className="report-card-header flex-v6" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="v-stack" style={{ gap: '12px', alignItems: 'flex-start', flex: 1 }}>
            <div className="flex-v6" style={{ gap: '10px', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
              <span 
                className="badge-v7" 
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-secondary)',
                  fontSize: '10px', 
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer' 
                }}
                title="Click to copy Intel ID"
                onClick={async () => {
                  const ok = await copyToClipboard(report.id);
                  if (ok) showToast('LOG_COPIED', `Intel ID #${report.id.slice(0,8).toUpperCase()}... secure on clipboard.`, 'info');
                }}
              >#{report.id?.toString().slice(0, 8).toUpperCase()}</span>

              {report.institution_verified && (
                <span className="badge-v7" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '9px', fontWeight: '900' }}>
                  <Shield size={10} style={{ marginRight: '4px' }} /> INST_VERIFIED
                </span>
              )}

              <span className="badge-v7" style={{ background: 'var(--primary-glow)', color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '10px', fontWeight: '800' }}>
                {report.category.toUpperCase()}
              </span>

              {isPriority && <span className="trigger-v18" style={{ color: 'var(--accent-rose)', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)', fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={12} /> Priority</span>}
              {isTrending && <span className="trigger-v18" style={{ color: 'var(--primary-bright)', background: 'var(--primary-glow)', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingIcon size={12} /> Trending</span>}

              {isMobile && (
                <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginLeft: 'auto' }}>
                  {new Date(report.timestamp).toLocaleDateString()}
                </span>
              )}
            </div>
            <h3 style={{ fontSize: isMobile ? '17px' : '22px', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff', textAlign: 'left', fontFamily: 'var(--font-main)', marginTop: isMobile ? '4px' : '0' }}>{report.title}</h3>
          </div>

          {!isMobile && (
            <div className="vote-group-v8" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '4px', border: '1px solid var(--glass-border)' }}>
              <button
                className={`vote-btn-v8 ${activeVote === 1 ? 'up active' : ''}`}
                onClick={() => onVote(report.id, 1)}
                style={{ padding: '8px' }}
              >
                <ChevronUp size={20} strokeWidth={3} />
              </button>
              <span className="vote-count-v8" style={{ fontWeight: '800', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>{report.upvotes}</span>
              <button
                className={`vote-btn-v8 ${activeVote === -1 ? 'down active' : ''}`}
                onClick={() => onVote(report.id, -1)}
                style={{ padding: '8px' }}
              >
                <ChevronDown size={20} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>

        <div className="v-stack" style={{ alignItems: 'flex-start', gap: '8px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', textAlign: 'left', fontWeight: '400', width: '100%', whiteSpace: 'pre-wrap' }}>
            {displayContent}
          </p>
          {showReadMore && (
            <button
              onClick={() => setIsExpanded(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                padding: 0,
                marginTop: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Read More
            </button>
          )}
        </div>

        {report.image_url && (
          <div className="report-image-v30" style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#000' }}>
            <img src={report.image_url} alt="Intel Media" style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.9 }} />
          </div>
        )}

        {isMobile ? (
          <div className="footer-v6 flex-v6" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="flex-v6" style={{ gap: '12px', width: 'auto' }}>
              <div className="vote-group-v8">
                <button
                  className={`vote-btn-v8 ${activeVote === 1 ? 'up active' : ''}`}
                  onClick={() => onVote(report.id, 1)}
                  style={{ padding: '8px 12px', height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none' }}
                  aria-label="Upvote report"
                >
                  <ChevronUp size={20} strokeWidth={3} />
                </button>
                <span className="vote-count-v8" style={{ fontWeight: '800', fontSize: '13px', fontFamily: 'var(--font-mono)', minWidth: '18px', textAlign: 'center' }}>{report.upvotes}</span>
                <button
                  className={`vote-btn-v8 ${activeVote === -1 ? 'down active' : ''}`}
                  onClick={() => onVote(report.id, -1)}
                  style={{ padding: '8px 12px', height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none' }}
                  aria-label="Downvote report"
                >
                  <ChevronDown size={20} strokeWidth={3} />
                </button>
              </div>

              <button
                className="flex-v6"
                style={{ fontSize: '13px', color: 'var(--text-secondary)', gap: '8px', cursor: 'pointer', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '0 16px', borderRadius: '20px', height: '38px', fontWeight: '600', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => setShowComments(!showComments)}
                aria-label="Toggle comments panel"
              >
                <MessageCircle size={16} />
                <span>{report.comments?.length || 0}</span>
              </button>
            </div>

            <div className="flex-v6" style={{ gap: '8px', width: 'auto' }}>
              {(role === 'Admin' || role === 'Professor') && (
                <button 
                  className="btn-premium level-2" 
                  style={{ padding: '8px 12px', fontSize: '11px', height: '38px', display: 'flex', alignItems: 'center', borderRadius: '20px' }}
                >
                  <CheckCircle size={14} style={{ marginRight: '4px' }} /> VERIFY
                </button>
              )}

              {(role === 'Admin' || isOwner) && (
                <button
                  className="btn-premium level-3"
                  style={{ padding: '8px 12px', color: 'var(--accent-rose)', fontSize: '11px', height: '38px', display: 'flex', alignItems: 'center', borderRadius: '20px' }}
                  onClick={() => onDeleteReport && onDeleteReport(report.id)}
                >
                  PURGE
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="footer-v6 flex-v6" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px', justifyContent: 'space-between' }}>
            <div className="flex-v6" style={{ gap: '20px' }}>
              <button
                className="flex-v6"
                style={{ fontSize: '12px', color: 'var(--text-secondary)', gap: '6px', cursor: 'pointer', background: 'none', border: 'none', fontWeight: '600', transition: '0.2s' }}
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle size={16} /> {report.comments?.length || 0} <span style={{ opacity: 0.6 }}>Comments</span>
              </button>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                {new Date(report.timestamp).toLocaleDateString()}
              </div>
            </div>

            <div className="flex-v6" style={{ gap: '12px' }}>
              {(role === 'Admin' || role === 'Professor') && (
                <button 
                  className="btn-premium level-2" 
                  style={{ padding: '6px 12px', fontSize: '11px', height: 'auto' }}
                >
                  <CheckCircle size={14} /> VERIFY
                </button>
              )}

              {(role === 'Admin' || isOwner) && (
                <button
                  className="btn-premium level-3"
                  style={{ padding: '6px 12px', color: 'var(--accent-rose)', fontSize: '11px', height: 'auto' }}
                  onClick={() => onDeleteReport && onDeleteReport(report.id)}
                >
                  PURGE_LOG
                </button>
              )}
            </div>
          </div>
        )}

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="comment-thread-v11"
              style={{ marginTop: '20px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px', overflow: 'hidden' }}
            >
              <div className="v-stack" style={{ gap: '16px', alignItems: 'stretch', marginBottom: '20px' }}>
                {(report.comments || []).map(c => (
                  <div key={c.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '11px', fontWeight: '700' }}>
                      <span style={{ color: 'var(--primary)' }}>{c.user}</span>
                      <span style={{ color: 'var(--text-dim)' }}>· {new Date(c.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', opacity: 0.8 }}>{c.text}</p>
                    {c.proof_url && (
                      <div className="report-image-v30" style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#000', marginTop: '8px' }}>
                        <img src={c.proof_url} alt="Resolution Proof" style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.9 }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={submitComment} className="flex-v6" style={{ gap: '12px' }}>
                <input
                  className="input-v3"
                  style={{ padding: '12px 16px', fontSize: '13px', borderRadius: '8px' }}
                  placeholder="Add an anonymous comment..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                />
                <button type="submit" className="btn-premium level-1" style={{ padding: '12px', borderRadius: '8px' }}><Send size={14} /></button>
              </form>

              {errorMsg && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-v6" style={{ color: 'var(--accent-rose)', fontSize: '11px', fontWeight: '700', marginTop: '12px', gap: '8px', justifyContent: 'flex-start' }}>
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



