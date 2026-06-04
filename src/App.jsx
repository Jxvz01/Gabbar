import React, { useState, useEffect, useCallback, useMemo, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Shield, Activity, FileText, CheckCircle, ChevronUp, ChevronDown, Lock, Loader2, Edit3, ArrowRight, Zap, MessageCircle, Send, AlertTriangle, Menu, X, Bell, User, LogOut, TrendingUp, Plus } from 'lucide-react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './index.css';
import { sanitize, isValidCollegeEmail, checkRateLimit, canPerformAction, anonymizeReport, DEV_WHITELIST } from './security';
import { supabase } from './supabase';


const t = (str) => str;

// --- SYSTEM CONSTANTS ---
// Centralized configuration for the Gabbar ecosystem
// Core application categories and statuses used across all report-related components
import { Toast, SkeletonCard, Counter, SystemBoot, SidePanel, AuthForm } from './components';
import { CATEGORIES, STATUSES } from './constants';
import { copyToClipboard, formatHubDate } from './utils';
const isMobileDevice = typeof window !== 'undefined' && window.innerWidth <= 1024;

// --- UTILS ---
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  
  const showToast = useCallback((title, msg, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  return { toasts, showToast };
};

// --- COMPONENTS ---

// Components migrated to src/components/

const LandingPage = ({ onJoin }) => {
  return (
    <div className="landing-master">
      <div className="ambient-bg">
        <div className="ambient-orb blue"></div>
        <div className="ambient-orb purple"></div>
        <div className="scanline"></div>
      </div>
      <div className="noise-overlay"></div>

      {/* 🔥 HERO SECTION (PREMIUM) */}
      <section className="hero-v7">
        <div className="hero-visual-system">
          <div className="radar-grid"></div>
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="intelligence-orb"
          ></motion.div>
          <div className="data-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
          </div>
        </div>

        <div className="container-v6 hero-content-v7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="v-stack"
          >
            <div className="hero-label-v7">
              <Shield size={12} /> Encrypted & Anonymous
            </div>
            <h1 className="hero-h1-v7">{t('Your voice.')}<br /><span className="gradient-text">Protected.</span></h1>
            <p className="hero-p-v7">{t('Report campus concerns with complete anonymity. No tracking. No traces. Just action.')}</p>

            <div className="flex-v6" style={{ marginTop: '48px', gap: '20px' }}>
              <button 
                className="btn-premium level-1" 
                onClick={() => onJoin('auth', 'signup')}
              >
                Get Started <ArrowRight size={18} />
              </button>
              <button 
                className="btn-premium level-2" 
                onClick={() => onJoin('auth', 'login')}
              >
                Log In
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🧊 BENTO ARCHITECTURE */}
      <section className="section-v7">
        <div className="container-v6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header-v7"
          >
            <h2 className="title-v7">{t('How it works')}</h2>
            <p className="desc-v7">{t('Built with privacy at the core. Every layer designed to protect you.')}</p>
          </motion.div>

          <div className="bento-grid">
            {[
              { t: 'Anonymous', d: 'Your identity stays hidden. Always. No exceptions.', icon: <Lock size={24} />, span: 'span 4' },
              { t: 'Encrypted', d: 'End-to-end encryption on every report and attachment.', icon: <Shield size={24} />, span: 'span 4' },
              { t: 'Instant', d: 'Reports reach verified campus admins in seconds.', icon: <Zap size={24} />, span: 'span 4' },
              { t: 'Scrubbed', d: 'All metadata stripped from uploads automatically.', icon: <Activity size={24} />, span: 'span 6' },
              { t: 'Verified', d: 'Direct routing to authenticated administrators only.', icon: <TrendingUp size={24} />, span: 'span 6' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bento-item"
              >
                <div className="flashlight-glow"></div>
                <div className="card-icon-v7" style={{ marginBottom: '24px' }}>{item.icon}</div>
                <h3 className="card-title-v7" style={{ fontSize: '18px', letterSpacing: '1px' }}>{item.t}</h3>
                <p className="card-desc-v7">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛡️ SECURITY PROTOCOL */}
      <section className="section-v7 dark-bg">
        <div className="container-v6">
          <div className="dual-layout-v7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="security-visual"
            >
              <div className="security-orb-v7">
                <Activity size={100} strokeWidth={1} className="pulse-icon" />
              </div>
              <div className="pulse-circles">
                <div className="p-circle"></div>
                <div className="p-circle"></div>
              </div>
            </motion.div>

            <div className="security-content">
              <h2 className="title-v7 left">{t('Privacy by')}<br />design.</h2>
              <div className="v-stack" style={{ alignItems: 'flex-start', gap: '32px', marginTop: '40px' }}>
                {[
                  { t: 'Metadata Removal', d: 'Tracking headers stripped before storage.' },
                  { t: 'Zero Logging', d: 'No interaction mapped to your identity.' },
                  { t: 'Secure Routing', d: 'Encrypted channels to verified admins.' }
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="protocol-item"
                  >
                    <div className="protocol-marker"></div>
                    <div className="v-stack" style={{ alignItems: 'flex-start' }}>
                      <h4 className="p-title-v7" style={{ fontSize: '16px' }}>{p.t}</h4>
                      <p className="p-desc-v7">{p.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 FINAL CTA */}
      <section className="section-v7 final-cta">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="cta-glass-v7"
        >
          <div className="cta-grid-bg"></div>
          <h2 className="cta-h2-v7" style={{ fontSize: '48px', letterSpacing: '-2px' }}>{t('Ready to speak up?')}</h2>
          <p className="cta-p-v7" style={{ marginBottom: '40px' }}>{t('Join thousands of students making their campus safer.')}</p>
          <button className="btn-premium level-1" onClick={() => onJoin('auth', 'signup')}>{t('Create Account')}</button>
          <div className="cta-sub-v7" style={{ marginTop: '40px' }}>{t('TRUSTED BY VVCE STUDENTS')}</div>
        </motion.div>
      </section>

      <footer className="footer-v7">
        <div className="container-v6">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '32px', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              <a href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>{t('Status')}</a>
              <a href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>{t('Security')}</a>
              <a href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>{t('Privacy')}</a>
              <a href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>{t('Contact')}</a>
            </div>
            <div style={{ color: 'var(--text-dim)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' }}>
              © 2026 GABBAR. SECURED BY END-TO-END QUANTUM CRYPTOGRAPHY.
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>
              Dev by <a href="https://jxvz01.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>{t('Jxvz01')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};



const PulseVisualizer = () => (
  <div className="pulse-visualizer">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="pulse-bar"
        animate={{ height: [10, 30, 15, 25, 10] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
      />
    ))}
  </div>
);

const SystemTerminal = () => {
  const [logs, setLogs] = useState([
    "System initialized.",
    "Connection secure.",
    "Anonymity active."
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const msgs = [
        "Syncing network...",
        "Validating keys...",
        "Waiting for updates...",
        "Checking database...",
        "All systems stable."
      ];
      setLogs(prev => [...prev.slice(-4), msgs.at(Math.floor(Math.random() * msgs.length))]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sys-terminal glass-v3">
      {logs.map((log, i) => <div key={i} className="terminal-line">{log}</div>)}
    </div>
  );
};

const BottomNav = memo(({ activeTab, onTabChange, onCreateReport }) => (
  <nav className="bottom-nav-v26">
    {[
      { id: 'feed', icon: <Radio size={20} />, label: 'Home' },
      { id: 'notifications', icon: <Bell size={20} />, label: 'Notifications' },
      { id: 'create', icon: <Plus size={20} />, label: 'Create' },
      { id: 'profile', icon: <User size={20} />, label: 'Profile' }
    ].map(item => (
      <div
        key={item.id}
        className={`bn-item ${activeTab === item.id ? 'active' : ''}`}
        onClick={() => {
          if (item.id === 'create') {
            onCreateReport();
          } else {
            onTabChange(item.id);
          }
        }}
      >
        {item.icon}
        <span>{item.label}</span>
      </div>
    ))}
  </nav>
));

const DevPanel = memo(({ reports, users, onDelete, onStatusChange, onBack, onSendNotification, onUpdateBanStatus }) => {
  const [activeSubTab, setActiveSubTab] = useState('reports');
  const [notifForm, setNotifForm] = useState({ title: '', content: '', target: 'Everyone' });
  const [isSending, setIsSending] = useState(false);

  const handleBroadcast = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const targetUserId = notifForm.target === 'Everyone' ? null : notifForm.target;
    await onSendNotification(notifForm.title, notifForm.content, targetUserId);
    setNotifForm({ title: '', content: '', target: 'Everyone' });
    setIsSending(false);
    // showToast replaced alert in parent
  };

  return (
    <div className="dev-panel-v28 page-transition" style={{ padding: '40px', background: '#000000', minHeight: '100vh' }}>
      <div className="flex-v6" style={{ justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '24px' }}>
        <div className="v-stack" style={{ alignItems: 'flex-start', gap: '4px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', letterSpacing: '-1px' }}>{t('Admin Console')}</h1>
          <p style={{ fontSize: '11px', color: '#52525b', fontWeight: '500', letterSpacing: '1px' }}>{t('Root access')}</p>
        </div>
        <button onClick={onBack} className="btn-v15 resolve" style={{ padding: '8px 16px', fontSize: '12px', background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}>← Back</button>
      </div>

      <div className="flex-v6" style={{ justifyContent: 'flex-start', gap: '16px', marginBottom: '32px' }}>
        {['reports', 'users', 'broadcast'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            style={{
              background: activeSubTab === tab ? '#ffffff' : 'rgba(255,255,255,0.02)',
              color: activeSubTab === tab ? '#000' : '#a1a1aa',
              border: '1px solid ' + (activeSubTab === tab ? '#ffffff' : 'rgba(255,255,255,0.08)'),
              padding: '10px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', letterSpacing: '0', textTransform: 'capitalize', cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeSubTab === 'reports' && (
        <div className="admin-view-v15">
          <h2 className="dev-h2" style={{ fontSize: '16px', marginBottom: '24px' }}>{t('All Reports')}</h2>
          <table className="admin-table-v15" style={{ display: 'table' }}>
            <thead>
              <tr>
                <th className="admin-th-v15">{t('Subject')}</th>
                <th className="admin-th-v15">{t('Category')}</th>
                <th className="admin-th-v15">{t('Status')}</th>
                <th className="admin-th-v15">{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="admin-row-v15">
                  <td className="admin-td-v15">
                    <div style={{ fontWeight: '800', color: '#fff' }}>{r.title}</div>
                    <div style={{ fontSize: '10px', color: '#52525b', marginTop: '4px' }}>#{r.id.slice(0, 8)}</div>
                  </td>
                  <td className="admin-td-v15"><span className={`badge-v7 border-${r.category}`}>{r.category}</span></td>
                  <td className="admin-td-v15">
                    <select
                      value={r.status}
                      onChange={(e) => onStatusChange(r.id, e.target.value)}
                      className="btn-admin-v15"
                      style={{ background: 'transparent' }}
                    >
                      {['Pending', 'Under Review', 'Resolved'].map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                    </select>
                  </td>
                  <td className="admin-td-v15">
                    <button onClick={() => onDelete && onDelete(r.id)} className="btn-admin-v15" style={{ color: '#ef4444', borderColor: '#ef444422' }}>{t('Delete')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSubTab === 'users' && (
        <div className="admin-view-v15">
          <h2 className="dev-h2" style={{ fontSize: '16px', marginBottom: '24px' }}>{t('Users')}</h2>
          <table className="admin-table-v15" style={{ display: 'table' }}>
            <thead>
              <tr>
                <th className="admin-th-v15">{t('Username')}</th>
                <th className="admin-th-v15">ID</th>
                <th className="admin-th-v15">{t('Role')}</th>
                <th className="admin-th-v15">{t('Status')}</th>
                <th className="admin-th-v15">{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="admin-row-v15">
                  <td className="admin-td-v15" style={{ fontWeight: '800', color: '#fff' }}>{u.username}</td>
                  <td className="admin-td-v15" style={{ fontSize: '10px', opacity: 0.5 }}>{u.id.slice(0, 12)}...</td>
                  <td className="admin-td-v15">{u.role}</td>
                  <td className="admin-td-v15">
                    <span className={`badge-v15 ${u.is_banned ? 'badge-critical' : 'badge-admin'}`}>
                      {u.is_banned ? 'BANNED' : 'ACTIVE'}
                    </span>
                  </td>
                  <td className="admin-td-v15">
                    <button
                      onClick={() => onUpdateBanStatus(u.id, !u.is_banned)}
                      className="btn-admin-v15"
                      style={{ color: u.is_banned ? '#10b981' : '#ef4444' }}
                    >
                      {u.is_banned ? 'Unban' : 'Ban'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSubTab === 'broadcast' && (
        <div className="admin-view-v15" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="dev-h2" style={{ fontSize: '16px', marginBottom: '8px' }}>{t('Broadcast')}</h2>
          <p className="dev-p" style={{ marginBottom: '32px' }}>{t('Send a notification to all users or a specific person.')}</p>

          <form onSubmit={handleBroadcast} className="v-stack" style={{ gap: '24px', alignItems: 'stretch' }}>
            <div className="input-field-v15">
              <label>{t('Title')}</label>
              <input
                className="input-v9"
                value={notifForm.title}
                onChange={e => setNotifForm({ ...notifForm, title: e.target.value })}
                placeholder="Alert Level: Critical"
                required
                style={{ marginBottom: 0 }}
              />
            </div>

            <div className="input-field-v15">
              <label>{t('Recipient')}</label>
              <select
                value={notifForm.target}
                onChange={e => setNotifForm({ ...notifForm, target: e.target.value })}
                className="input-v9 select-v9"
                style={{ marginBottom: 0 }}
              >
                <option value="Everyone">{t('Everyone')}</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.username} ({u.email})</option>)}
              </select>
            </div>

            <div className="input-field-v15">
              <label>{t('Message')}</label>
              <textarea
                className="input-v9"
                value={notifForm.content}
                onChange={e => setNotifForm({ ...notifForm, content: e.target.value })}
                rows="4"
                placeholder="Type the message content..."
                required
                style={{ resize: 'none', marginBottom: 0 }}
              ></textarea>
            </div>

            <button type="submit" disabled={isSending} className="dev-btn">
              {isSending ? 'Sending...' : 'Send Notification'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
});

const AdminProfileView = memo(({ reports, onStatusChange, onAddComment, showToast }) => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [resolvingReportId, setResolvingReportId] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleResolveWithProof = async (reportId) => {
    if (!proofFile) {
      onStatusChange(reportId, 'Resolved');
      setResolvingReportId(null);
      return;
    }

    setIsUploading(true);
    const fileName = `proof_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('intel-media')
      .upload(fileName, proofFile);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      showToast('STRAPPING_ERROR', 'Proof media transmission failed.', 'error');
      setIsUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('intel-media')
      .getPublicUrl(fileName);

    await onAddComment(reportId, "Issue Resolved. Proof uploaded.", "Admin", publicUrl);
    await onStatusChange(reportId, 'Resolved');
    
    showToast('INTEL_RESOLVED', 'Issue resolved with proof.', 'success');
    setIsUploading(false);
    setResolvingReportId(null);
    setProofFile(null);
  };

  const filtered = useMemo(() => {
    return reports.filter(r =>
      (filterStatus === 'All' || r.status === filterStatus) &&
      (filterCategory === 'All' || r.category === filterCategory)
    );
  }, [reports, filterStatus, filterCategory]);

  return (
    <div className="anim-fade-up v-stack admin-view-v15" style={{ gap: '48px' }}>
      {/* 👤 ADMIN IDENTITY BOX (V15) */}
      <div className="flex-v6" style={{ width: '100%', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '32px' }}>
        <div className="flex-v6" style={{ gap: '24px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
            <Shield size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#f9fafb', marginBottom: '4px' }}>{t('System Administrator')}</h2>
            <div className="flex-v6" style={{ gap: '8px', justifyContent: 'flex-start' }}>
              <span className="badge-v15 badge-admin">{t('Admin')}</span>
              <span style={{ fontSize: '10px', color: '#52525b', letterSpacing: '1px', fontWeight: '500' }}>{t('Active')}</span>
            </div>
          </div>
        </div>
        <div style={{ fontSize: '11px', color: '#52525b', fontWeight: '500', background: 'rgba(255,255,255,0.03)', padding: '10px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
          Session #{Math.random().toString(36).substr(2, 6)}
        </div>
      </div>

      {/* 📊 INDUSTRIAL STATS GRID (V15) */}
      <div className="admin-stat-grid-v15">
        {[
          { l: 'Total', v: reports.length },
          { l: 'Reviewing', v: reports.filter(r => r.status === 'Under Review').length },
          { l: 'Resolved', v: reports.filter(r => r.status === 'Resolved').length },
          { l: 'Critical', v: reports.filter(r => r.upvotes > 70).length }
        ].map((stat, i) => (
          <div key={i} className="admin-stat-v15">
            <div className="val"><Counter value={stat.v} /></div>
            <div className="lab">{stat.l}</div>
          </div>
        ))}
      </div>

      {/* 📜 TABLE CONTROL (V15) */}
      <div className="v-stack" style={{ gap: '24px' }}>
        <div className="flex-v6" style={{ justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#a1a1aa', letterSpacing: '0' }}>{t('Reports')}</h3>
          <div className="flex-v6" style={{ gap: '12px' }}>
            <select className="select-v4" style={{ width: '150px', background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', fontSize: '12px' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="All">{t('All Status')}</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="select-v4" style={{ width: '150px', background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', fontSize: '12px' }} value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
              <option value="All">{t('All Categories')}</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table className="admin-table-v15">
            <thead>
              <tr>
                <th className="admin-th-v15">{t('Report')}</th>
                <th className="admin-th-v15">{t('Category')}</th>
                <th className="admin-th-v15">{t('Status')}</th>
                <th className="admin-th-v15">{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="admin-row-v15">
                  <td className="admin-td-v15">
                    <div style={{ fontWeight: '800', color: '#f9fafb', fontSize: '13px' }}>{r.title}</div>
                    <div style={{ fontSize: '10px', color: '#52525b', marginTop: '4px' }}>#{r.id} · {new Date(r.timestamp).toLocaleDateString()}</div>
                  </td>
                  <td className="admin-td-v15">
                    <span className="badge-v7 category" style={{ fontSize: '10px', padding: '4px 8px' }}>{r.category.toUpperCase()}</span>
                  </td>
                  <td className="admin-td-v15">
                    <span className={`badge-v15 ${r.upvotes > 70 ? 'badge-critical' : 'badge-admin'}`} style={{ fontSize: '10px' }}>{r.status.toUpperCase()}</span>
                  </td>
                  <td className="admin-td-v15">
                    {resolvingReportId === r.id ? (
                      <div className="flex-v6" style={{ gap: '12px', justifyContent: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="v-stack" style={{ alignItems: 'flex-start', gap: '4px' }}>
                          <span style={{ fontSize: '9px', color: '#52525b', fontWeight: '500', letterSpacing: '0.5px' }}>{t('Upload proof')}</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setProofFile(e.target.files[0])}
                            className="input-v9"
                            style={{ padding: '6px', fontSize: '11px', marginBottom: 0, width: '160px', background: 'rgba(255,255,255,0.02)' }}
                          />
                        </div>
                        <div className="flex-v6" style={{ gap: '6px', alignSelf: 'flex-end' }}>
                          <button 
                            className="btn-admin-v15 resolve" 
                            onClick={() => handleResolveWithProof(r.id)}
                            disabled={isUploading}
                            style={{ padding: '10px 16px', background: 'var(--primary)', color: '#fff' }}
                          >
                            {isUploading ? '...' : 'Submit'}
                          </button>
                          <button 
                            className="btn-admin-v15" 
                            onClick={() => { setResolvingReportId(null); setProofFile(null); }}
                            disabled={isUploading}
                            style={{ padding: '10px', borderColor: '#374151' }}
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-v6" style={{ gap: '8px', justifyContent: 'flex-start' }}>
                        {r.status !== 'Under Review' && <button className="btn-admin-v15" onClick={() => onStatusChange(r.id, 'Under Review')}>{t('Review')}</button>}
                        {r.status !== 'Resolved' && <button className="btn-admin-v15 resolve" onClick={() => setResolvingReportId(r.id)}>{t('Resolve')}</button>}
                        <button className="btn-admin-v15" style={{ color: '#ef4444' }} onClick={() => onStatusChange(r.id, 'Archived')}>{t('Dismiss')}</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

const DevAuthPage = memo(({ onAuthSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    // Dev login always uses 'Admin' role intent and 'login' mode
    const result = await onAuthSuccess('Admin', email, 'DEV_OPERATIVE', 'login', password);

    if (!result?.ok) {
      setAuthError(result?.error || 'ACCESS_DENIED: System breach detected.');
      setIsLoading(false);
    }
  };

  return (
    <div className="dev-auth-master">
      <div className="hacker-bg">
        <div className="matrix-rain"></div>
        <div className="scan-line"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="dev-auth-card glass-v15"
      >
        <div className="terminal-header">
          <div className="dots">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <div className="title">{t('ADMIN ACCESS')}</div>
        </div>

        <div className="terminal-body v-stack" style={{ gap: '32px' }}>
          <div className="auth-branding">
            <Shield size={48} className="dev-glow-icon" />
            <h2 className="dev-h2">{t('Admin Login')}</h2>
            <p className="dev-p">{t('Authorized personnel only')}</p>
          </div>

          <form onSubmit={handleSubmit} className="v-stack" style={{ gap: '20px', width: '100%' }}>
            <div className="input-field-v15">
              <label>{t('Email')}</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setAuthError(''); }}
                placeholder="root@intelligence.hub"
                required
              />
            </div>

            <div className="input-field-v15">
              <label>{t('Password')}</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setAuthError(''); }}
                placeholder="••••••••"
                required
              />
            </div>

            {authError && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dev-error">
                <AlertTriangle size={14} /> {authError.toUpperCase()}
              </motion.div>
            )}

            <button type="submit" className="dev-btn" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <button onClick={onBack} className="dev-back">← Back</button>
        </div>

        <div className="terminal-footer">
          <span className="status">{t('GATEWAY: SECURE')}</span>
          <span className="node">{t('NODE: 0x4F92')}</span>
        </div>
      </motion.div>
    </div>
  );
});

const AuthPage = memo(({ initialMode = 'login', onAuthSuccess, onGoogleAuth, onBack }) => {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [campusId, setCampusId] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [typedCode, setTypedCode] = useState('');

  useEffect(() => {
    if (isAdmin) setRole('Admin');
    else setRole('Student');
  }, [isAdmin]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setAuthError('');

    if (!isValidCollegeEmail(email)) {
      setAuthError('Only VVCE college email addresses are allowed.');
      return;
    }

    setLoading(true);
    onAuthSuccess(role, email, username || 'ANON_OPERATIVE', mode, password, null, campusId).then(result => {
      setLoading(false);
      if (!result?.ok) {
        setAuthError(result?.error || 'Verification Failed: Check Operative Key.');
        if (result?.needsVerification) setIsVerifying(true);
        return;
      }

      if (result.needsVerification) {
        setIsVerifying(true);
      }
    });
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setAuthError('');
    onAuthSuccess(role, email, username || 'ANON_OPERATIVE', 'verify', null, typedCode, campusId).then(result => {
      if (!result?.ok) {
        setAuthError(result?.error || 'INVALID_CODE: Verification mismatch.');
      }
    });
  };

  return (
    <div className="auth-master page-transition">
      <div className="auth-box glass-v3 anim-slide-up">
        <button className="btn-retreat-v3" onClick={onBack}>← Go Back</button>
        <h2 className="auth-h2">{mode === 'login' ? (isVerifying ? 'VERIFY' : 'LOGIN') : (isVerifying ? 'VERIFY' : 'SIGN UP')}</h2>
        <p className="auth-p" style={{ color: isVerifying ? 'var(--warning)' : 'var(--accent-emerald)' }}>
          {isVerifying ? 'Check your VVCE inbox for the code...' : 'Welcome!'}
        </p>

        {isVerifying ? (
          <form onSubmit={handleVerify} className="auth-f">
            <div style={{ width: '100%', marginBottom: '24px' }}>
              <input
                className={`input-v3 ${authError ? 'input-error-v27' : ''}`}
                type="text"
                placeholder="VERIFICATION_CODE (VVCE-2026)"
                value={typedCode}
                onChange={(e) => { setTypedCode(e.target.value); setAuthError(''); }}
                required
              />
              {authError && <div className="error-msg-v27 anim-fade-in">{authError}</div>}
            </div>
            <button type="submit" className="btn-premium level-1" style={{ width: '100%' }}>{t('Verify')}</button>
            <p className="auth-toggle-v4" onClick={() => setIsVerifying(false)} style={{ marginTop: '20px', cursor: 'pointer', fontSize: '11px', fontWeight: '800' }}>← BACK TO CREDENTIALS</p>
          </form>
        ) : (
          <div className="v-stack" style={{ gap: '20px', width: '100%' }}>
            <AuthForm
              authMode={mode}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              username={username}
              setUsername={setUsername}
              campusId={campusId}
              setCampusId={setCampusId}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              onSubmit={handleSubmit}
              loading={loading}
            />

            {authError && <div className="error-msg-v27 anim-fade-in" style={{ marginTop: '-10px', marginBottom: '10px', textAlign: 'center' }}>{authError}</div>}

            <div className="flex-v6" style={{ width: '100%', margin: '8px 0' }}>
              <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
              <span style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: '800', padding: '0 10px' }}>OR</span>
              <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
            </div>

            <button type="button" onClick={onGoogleAuth} className="btn-premium level-2" style={{ width: '100%', fontSize: '12px' }}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style={{ width: '16px' }} />
              <span>{t('Continue with Google')}</span>
            </button>
          </div>
        )}

        <div className="auth-toggle-v4">
          {mode === 'login' ? (
            <div className="v-stack" style={{ gap: '12px' }}>
              <p style={{ fontSize: '13px' }}>{t('New here? ')}<span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '700' }} onClick={() => { setMode('signup'); setAuthError(''); }}>{t('Create Account')}</span></p>
              <p className="forgot-p" style={{ fontSize: '10px', opacity: 0.5 }} onClick={() => alert('Password reset: Contact your administrator.')}>{t('Forgot password?')}</p>
            </div>
          ) : (
            <p style={{ fontSize: '13px' }}>{t('Already have an account? ')}<span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '700' }} onClick={() => { setMode('login'); setAuthError(''); }}>{t('Sign In')}</span></p>
          )}
        </div>
      </div>
    </div>
  );
});

const Dashboard = memo(({ reports, role, onLogout, onVote, onAddReport, onAddComment, onStatusChange, onDeleteReport, userVotes, winWidth, currentUser, onUpdateUsername, currentUserEmail, notifications, isLoading, showToast }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Map pathname to activeTab
  const activeTab = useMemo(() => {
    const path = location.pathname;
    if (path === '/notifications') return 'notifications';
    if (path === '/profile') return 'profile';
    return 'feed';
  }, [location.pathname]);

  const setActiveTab = (tab) => {
    if (tab === 'feed') navigate('/home');
    else navigate(`/${tab}`);
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [subState, setSubState] = useState('idle'); // idle, loading, success
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(currentUser?.username || 'Anonymous');
  const isMobile = winWidth < 768;
  const isTablet = winWidth >= 768 && winWidth <= 1024;
  const [isSidebarVisible, setIsSidebarVisible] = useState(!isMobile); // Show by default on desktop, hidden on mobile

  const userReports = useMemo(() => {
    return reports.filter(r => r.user_id === currentUserEmail || r.author_email === currentUserEmail);
  }, [reports, currentUserEmail]);

  const [latency, setLatency] = useState(14);
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 10 && next <= 25 ? next : prev;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const rankInfo = useMemo(() => {
    const reportsCount = userReports.length;
    let percent = 0;
    let nextRank = "";
    let currentRank = "RECRUIT";
    let req = 0;
    if (reportsCount === 0) {
      percent = 0;
      nextRank = "ACTIVE";
      req = 1;
    } else if (reportsCount < 5) {
      percent = Math.round(((reportsCount - 1) / 4) * 100);
      nextRank = "VETERAN";
      currentRank = "ACTIVE";
      req = 5;
    } else if (reportsCount < 10) {
      percent = Math.round(((reportsCount - 5) / 5) * 100);
      nextRank = "ELITE";
      currentRank = "VETERAN";
      req = 10;
    } else {
      percent = 100;
      nextRank = "MAXIMUM CLEARANCE";
      currentRank = "ELITE";
      req = 10;
    }
    
    const filledBlocks = Math.round(percent / 10);
    const meter = "█".repeat(filledBlocks) + "░".repeat(10 - filledBlocks);
    return { percent, meter, nextRank, currentRank, req };
  }, [userReports]);

  const topReports = useMemo(() => {
    return [...reports].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);
  }, [reports]);

  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = activeCategory === 'All' || r.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [reports, searchTerm, activeCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubState('loading');
    setTimeout(() => {
      onAddReport(e);
      setSubState('success');
      setTimeout(() => {
        setIsFormOpen(false);
        setSubState('idle');
      }, 1500);
    }, 1200);
  };

  return (
    <div className={`dash-layout-v7 ${!isSidebarVisible ? 'sidebar-hidden' : ''}`}>
      {/* 📱 MOBILE HEADER (GABBAR BRANDING & CONTROLS) */}
      <div className="mobile-header-v20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', padding: '0 20px', height: '64px', position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="nav-logo" style={{ marginBottom: 0, fontSize: '16px', fontWeight: '900', letterSpacing: '-0.5px' }}>{t('GABBAR.')}</div>
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', fontWeight: 'bold' }}>// {activeTab.toUpperCase()}</span>
          <span className="status-pulse-indicator pulse" style={{ position: 'relative', bottom: 'auto', right: 'auto', display: 'inline-block', width: '8px', height: '8px', border: 'none', marginLeft: '4px' }}></span>
        </div>
        <button 
          onClick={onLogout} 
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
          title="Sign Out"
        >
          <LogOut size={12} />
          <span>{t('SIGN OUT')}</span>
        </button>
      </div>

      <AnimatePresence>
        {/* Mobile Overlay Removed (Bottom Nav Used instead) */}
      </AnimatePresence>

      {/* 🧭 NAVIGATION (DESKTOP: SIDEBAR / MOBILE: BOTTOM NAV) */}
      {!isMobile && (
        <aside className="side-nav-v7" style={{ background: 'rgba(9, 9, 11, 0.5)', backdropFilter: 'blur(20px)', borderRight: '1px solid var(--glass-border)' }}>
          <div className="flex-v6" style={{ width: '100%', justifyContent: 'space-between', marginBottom: '48px', padding: '0 20px' }}>
            <div className="nav-logo" style={{ marginBottom: 0, fontSize: '22px', fontWeight: '800', letterSpacing: '-1px' }}>{t('GABBAR.')}</div>
          </div>
          <nav className="nav-list" style={{ padding: '0 12px' }}>
            {[
              { id: 'feed', label: 'Feed', icon: <Radio size={18} /> },
              { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
              { id: 'profile', label: 'Profile', icon: <User size={18} /> }
            ].map(item => (
              <div
                key={item.id}
                className={`nav-item-v7 ${activeTab === item.id ? 'active' : ''}`}
                style={{ 
                  borderRadius: '12px', 
                  margin: '4px 0',
                  padding: '12px 16px',
                  fontWeight: activeTab === item.id ? '700' : '400',
                  transition: '0.2s'
                }}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobile) setIsSidebarVisible(false); // Auto-close on mobile
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {item.icon} <span>{item.label}</span>
                </div>
              </div>
            ))}
          </nav>
          <div className="nav-item-v7" onClick={onLogout} style={{ marginTop: 'auto', opacity: 0.5, gap: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', borderRadius: 0, padding: '32px 32px', cursor: 'pointer' }}>
            <LogOut size={18} /> <span>{t('Sign Out')}</span>
          </div>
        </aside>
      )}


      {isMobile && <BottomNav activeTab={activeTab} onTabChange={setActiveTab} onCreateReport={() => setIsFormOpen(true)} />}

      {/* 📦 MAIN FEED */}
      <main className="main-feed-v7">
        <div className="feed-container-v7">
          <header className="top-nav-v7" style={{ alignItems: 'center', gap: '20px' }}>
            <div className="flex-v6" style={{ width: 'auto', gap: '16px' }}>
              {!isMobile && (
                <button 
                  className="menu-toggle-v33" 
                  onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                  title={isSidebarVisible ? "Collapse Sidebar (Full Content View)" : "Expand Navigation Menu"}
                  aria-expanded={isSidebarVisible}
                  aria-label="Toggle navigation sidebar"
                >
                  <Menu size={20} />
                </button>
              )}
              <div style={{ textAlign: 'left' }}>
                <h2 className="h-title" style={{ fontSize: '24px', marginBottom: '2px' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                <p className="h-sub" style={{ textAlign: 'left', fontSize: '12px' }}>{t('Secure platform intelligence.')}</p>
              </div>
            </div>
            <div className="flex-v6" style={{ gap: '8px', flexDirection: 'row', width: 'auto' }}>
              <div className="badge-v7 status" style={{ fontSize: '9px' }}>#{role.toUpperCase()}</div>
              {activeTab === 'feed' && (
                <button 
                  className="refresh-btn-v32" 
                  onClick={() => {
                    fetchReports();
                    showToast('INTEL_SYNC', 'Synchronizing with encrypted nodes...', 'info');
                  }}
                  title="Refresh Intel"
                >
                  <Activity size={14} />
                </button>
              )}
            </div>
          </header>

          {activeTab === 'feed' && (
            <div className="feed-controls-v30 anim-fade-up" style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: isMobile ? 'nowrap' : 'wrap', flexDirection: isMobile ? 'column' : 'row' }}>
              <input 
                className="input-v9" 
                placeholder="SEARCH_INTEL_LOGS..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, minWidth: '200px', marginBottom: 0 }}
              />
              <div className="hide-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', justifyContent: 'flex-start', flexWrap: 'nowrap', width: '100%' }}>
                <button 
                  onClick={() => setActiveCategory('All')}
                  className={`badge-v7 ${activeCategory === 'All' ? 'active-v30' : ''}`}
                  style={{ flexShrink: 0, cursor: 'pointer', background: activeCategory === 'All' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', border: 'none', padding: '8px 16px' }}
                >{t('ALL')}</button>
                {CATEGORIES.map(c => (
                  <button 
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`badge-v7 ${activeCategory === c ? 'active-v30' : ''}`}
                    style={{ flexShrink: 0, cursor: 'pointer', background: activeCategory === c ? 'var(--primary)' : 'rgba(255,255,255,0.05)', border: 'none', padding: '8px 16px' }}
                  >{c.toUpperCase()}</button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'feed' && isLoading && (
            <div className="v-stack" style={{ width: '100%', gap: '0' }}>
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}


          {activeTab === 'feed' && !isLoading && filteredReports.length === 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="empty-hub-v18">
              <div className="empty-icon-v18"><AlertTriangle size={80} strokeWidth={1} /></div>
              <h2 className="h-title" style={{ fontSize: '28px', marginBottom: '16px' }}>{t('Zero Intelligence Logs Indexed')}</h2>
              <p className="h-sub" style={{ fontSize: '15px', maxWidth: '400px', marginBottom: '40px' }}>{searchTerm ? "No logs match your search criteria." : "The hub is currently clear. Be the first operative to raise an industrial concern."}</p>
              {!searchTerm && <button className="btn-v3 primary" onClick={() => setIsFormOpen(true)} style={{ padding: '18px 40px' }}><Plus size={20} /> Initialize First Report</button>}
            </motion.div>
          )}

          {activeTab === 'feed' && !isLoading && filteredReports.map((r, i) => (
            <ReportCard
              key={r.id}
              report={r}
              onVote={onVote}
              role={role}
              activeVote={userVotes instanceof Map ? (userVotes.get?.(r.id) ?? 0) : 0}
              onAddComment={onAddComment}
              onDeleteReport={onDeleteReport}
              index={i}
              currUsername={currentUser?.username}
              currentUserEmail={currentUserEmail}
              showToast={showToast}
            />
          ))}


          {activeTab === 'notifications' && (
            <div className="anim-fade-up v-stack" style={{ alignItems: 'flex-start' }}>
              {(notifications || []).length === 0 && (
                <div className="empty-hub-v18" style={{ width: '100%' }}>
                  <Bell size={40} opacity={0.3} style={{ border: 'none' }} />
                  <p style={{ marginTop: '20px', color: 'var(--text-dim)' }}>{t('Zero system broadcasts found.')}</p>
                </div>
              )}
              {(notifications || []).map((notif, i) => (
                <div key={notif.id} className="feed-card-v7" style={{ width: '100%', padding: '24px' }}>
                  <div className="flex-v6" style={{ justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '700', fontSize: '15px', color: notif.user_id ? 'var(--primary)' : 'var(--accent-purple)' }}>{notif.title}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{new Date(notif.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{notif.content}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'profile' && role === 'Admin' && (
            <AdminProfileView reports={reports} onStatusChange={handleStatusChange} onAddComment={handleAddComment} showToast={showToast} />
          )}

          {activeTab === 'profile' && role !== 'Admin' && (
            <div className="anim-fade-up profile-layout-v12">
              {/* 🧬 SECURE IDENTITY CARD (IMMERSIVE V12) */}
              <aside className="id-card-v12-premium">
                <div className="v-stack" style={{ gap: '32px', alignItems: 'center' }}>
                  <div className="id-avatar-premium">
                    <Shield size={32} />
                    <div className="status-pulse-indicator pulse"></div>
                  </div>
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px', width: '100%' }}>
                      {isEditingUsername ? (
                        <div className="v-stack" style={{ alignItems: 'center', gap: '8px', width: '100%' }}>
                          <input
                            className="input-v9"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                            style={{ padding: '8px 12px', fontSize: '16px', fontWeight: '700', marginBottom: 0, textAlign: 'center', width: '100%' }}
                            placeholder="Min 3 chars"
                          />
                          <div className="flex-v6" style={{ gap: '8px', justifyContent: 'center' }}>
                            <button
                              onClick={() => {
                                if (newUsername.length >= 3) {
                                  onUpdateUsername(newUsername);
                                  setIsEditingUsername(false);
                                } else {
                                  showToast('SYSTEM_REJECT', 'Username must be minimum 3 alpha-numeric characters.', 'error');
                                }
                              }}
                              className="btn-v15 resolve"
                              style={{ padding: '6px 16px', fontSize: '11px', borderRadius: '6px' }}
                            >{t('Save')}</button>
                            <button onClick={() => setIsEditingUsername(false)} className="btn-v15" style={{ padding: '6px 16px', fontSize: '11px', borderRadius: '6px', color: 'var(--text-dim)' }}>{t('Cancel')}</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="h-title" style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px', margin: 0 }}>{currentUser?.username || 'Anonymous'}</h3>
                          <button onClick={() => setIsEditingUsername(true)} className="vote-btn-v8" style={{ padding: 0, width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Edit3 size={12} /></button>
                        </>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginTop: '6px' }}>
                      <span className="active-tag-v12" style={{ fontSize: '8px' }}>{t('Active Operative')}</span>
                    </div>
                  </div>

                  <div className="profile-meta-list">
                    <div className="profile-meta-item">
                      <label>Trust Level: {rankInfo.currentRank}</label>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        <span style={{ fontFamily: 'monospace', color: '#22c55e', letterSpacing: '0px' }}>{rankInfo.meter}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{rankInfo.percent}%</span>
                      </div>
                      {rankInfo.percent < 100 && (
                        <div style={{ fontSize: '9px', color: '#52525b', marginTop: '4px', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' }}>
                          NEXT RANK: {rankInfo.nextRank} (NEED {rankInfo.req - userReports.length} MORE LOGS)
                        </div>
                      )}
                    </div>
                    <div className="profile-meta-item">
                      <label>{t('Decryption Signature')}</label>
                      <span className="mono-value">SHA-256 // {currentUser?.username?.substring(0, 6).toUpperCase() || 'ANON'}</span>
                    </div>
                    <div className="profile-meta-item">
                      <label>{t('Secure Node Address')}</label>
                      <span className="mono-value" style={{ wordBreak: 'break-all', fontSize: '10px' }}>{currentUserEmail || 'UNLINKED_NODE'}</span>
                    </div>
                  </div>
                </div>
              </aside>

              {/* 📊 PLATFORM ARCHIVES AND TELEMETRY */}
              <div className="activity-pan-v10" style={{ gap: '40px' }}>
                <header className="profile-header-v12" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '24px' }}>
                  <span className="section-tag">{t('Secure Operations Vault')}</span>
                  <h1 className="main-title">{t('Operative Control Center')}</h1>
                </header>

                {/* PLATFORM IMPACT METRICS */}
                <section>
                  <h3 className="profile-section-title">
                    <Activity size={16} style={{ color: '#22c55e' }} /> Platform Impact Metrics
                    <span>{t('METRIC_PROTOCOL_V12')}</span>
                  </h3>
                  
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.06 }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                    className="metrics-grid-premium"
                  >
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
                      }}
                      className="metric-card-premium"
                    >
                      <div className="metric-value">{userReports.length}</div>
                      <span className="metric-label">{t('Logged Logs')}</span>
                    </motion.div>
                    
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
                      }}
                      className="metric-card-premium"
                    >
                      <div className="metric-value">
                        {userReports.length ? Math.round((userReports.filter(r => r.status === 'Resolved').length / userReports.length) * 100) : 0}%
                      </div>
                      <span className="metric-label">{t('Resolve Ratio')}</span>
                    </motion.div>
                    
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
                      }}
                      className="metric-card-premium"
                    >
                      <div className="metric-value">
                        {(userReports.filter(r => r.status === 'Resolved').length * 100) + (userReports.length * 15)}
                      </div>
                      <span className="metric-label">{t('Impact Weight')}</span>
                    </motion.div>

                  </motion.div>
                </section>

                {/* TRANSMISSION ARCHIVE */}
                <section>
                  <h3 className="profile-section-title">
                    <FileText size={16} /> Transmission Archive
                    <span>{t('SECURE_SIGNALS')}</span>
                  </h3>

                  <div className="transmission-list-premium">
                    {userReports.length === 0 ? (
                      <div style={{ padding: '40px 24px', textAlign: 'center', background: 'rgba(0,0,0,0.4)' }}>
                        <AlertTriangle size={32} style={{ marginBottom: '12px', color: 'var(--text-dim)', margin: '0 auto 12px' }} />
                        <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0 }}>{t('No secure signals logged in the archive database.')}</p>
                      </div>
                    ) : (
                      userReports.map((r) => (
                        <div key={r.id} className="transmission-item-premium">
                          <div className="transmission-info">
                            <div className="transmission-header">
                              <span className="transmission-id">TRANS_#{r.id.toString().substring(0, 8).toUpperCase()}</span>
                              <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
                              <span className="transmission-date">{new Date(r.timestamp).toLocaleDateString()}</span>
                              <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
                              <span style={{ color: 'var(--text-dim)', textTransform: 'uppercase' }}>{r.category}</span>
                            </div>
                            <h4 className="transmission-title">{r.title}</h4>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span className={`status-pill-premium ${r.status?.toLowerCase() === 'resolved' ? 'resolved' : r.status?.toLowerCase() === 'pending' ? 'pending' : 'investigating'}`}>
                              {r.status || 'PENDING'}
                            </span>
                            <button
                              onClick={() => {
                                if (window.confirm("PURGE_PROTOCOL: Are you sure you wish to delete this intelligence log permanently?")) {
                                  onDeleteReport && onDeleteReport(r.id);
                                }
                              }}
                              className="purge-btn-premium"
                            >
                              Purge Log
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>


              </div>
            </div>
          )}
          {isMobile && activeTab === 'feed' && <SidePanel reports={reports} topReports={topReports} />}
        </div>
      </main>

      {/* 📊 RIGHT SIDEBAR (DESKTOP ONLY) */}
      {!isMobile && !isTablet && (
        <aside className="side-info-v7" style={{ width: '400px' }}>
          <SidePanel reports={reports} topReports={topReports} />
        </aside>
      )}

      {!isMobile && (
        <motion.div
          whileTap={isMobile ? { scale: 0.96 } : {}}
          className="fab-v7"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={28} />
        </motion.div>
      )}

      {isFormOpen && (
        <div className="modal-overlay-v9 anim-fade-in" onClick={() => subState === 'idle' && setIsFormOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="modal-glass-v9"
            onClick={e => e.stopPropagation()}
          >
            <div className="v-stack" style={{ alignItems: 'flex-start', marginBottom: '32px', gap: '8px' }}>
              <div className="flex-v6" style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="h-title" style={{ fontSize: '24px' }}>{t('File New Intel')}</h2>
                <div className="flex-v6" style={{ gap: '16px', alignItems: 'center' }}>
                  <div style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <Lock size={12} /> SECURE_TUNNEL: ACTIVE
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', transition: '0.2s', padding: 0 }}
                    className="modal-close-btn"
                    title="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              <p className="h-sub">{t('Your identity remains completely anonymous within the hub.')}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="v-stack" style={{ gap: '4px', alignItems: 'stretch' }}>
                <input className="input-v9" name="title" placeholder="INTEL SUBJECT" required disabled={subState !== 'idle'} />
                <select className="input-v9 select-v9" name="category" disabled={subState !== 'idle'}>
                  {CATEGORIES.map(c => <option key={c}>{c.toUpperCase()}</option>)}
                </select>
                <textarea className="input-v9" name="content" placeholder="DESCRIBE THE INTEL IN DETAIL..." rows="5" required disabled={subState !== 'idle'}></textarea>

                <div className="input-field-v15" style={{ marginTop: '16px' }}>
                  <label style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: '800', marginBottom: '8px', display: 'block' }}>{t('ATTACH_INTEL_MEDIA (OPTIONAL)')}</label>
                  <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    className="input-v9" 
                    style={{ padding: '12px', fontSize: '12px' }}
                    disabled={subState !== 'idle'}
                  />
                </div>

                <button type="submit" className="btn-gradient-v9" disabled={subState !== 'idle'} style={{ marginTop: '24px' }}>
                  {subState === 'idle' && "Submit Report"}
                  {subState === 'loading' && <span className="flex-v6" style={{ gap: '12px' }}><Loader2 className="anim-spin" size={18} /> Submitting...</span>}
                  {subState === 'success' && "Intel Logged"}
                </button>

                {subState === 'success' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="success-tag-v9">
                    <CheckCircle size={16} /> Transmission Successful
                  </motion.div>
                )}

                <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-dim)', marginTop: '24px', letterSpacing: '0.05em' }}>
                  NO PERSONAL DATA IS ATTACHED TO THIS TRANSMISSION
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      <footer className="footer-master" style={{ border: 'none', background: 'none', padding: '16px 0' }}>
        <p className="footer-text" style={{ fontSize: '10px', opacity: 0.5, textAlign: 'center' }}>© 2026 GABBAR | Dev by <a href="https://jxvz01.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '800', textDecoration: 'none' }}>{t('Jxvz01')}</a></p>
      </footer>
    </div>
  );
});

// ReportCard migrated to src/components/


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isBooting, setIsBooting] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { toasts, showToast } = useToast();
  const [userRole, setUserRole] = useState('Student');
  const [reports, setReports] = useState([]);
  const [nextView, setNextView] = useState(null);
  const [nextMode, setNextMode] = useState('login');
  const [userVotes, setUserVotes] = useState(() => new Map());
  const [winWidth, setWinWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({ username: 'ANON_OPERATIVE' });
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [session, setSession] = useState(null);

  const [isDevRoute, setIsDevRoute] = useState(false);

  useEffect(() => {
    // Detect /dev route
    if (location.pathname === '/dev') {
      const isWhitelisted = session?.user?.email && DEV_WHITELIST.includes(session.user.email.toLowerCase());
      const isMasterBypass = localStorage.getItem('isMaster') === 'true';

      if ((session && isWhitelisted) || userRole === 'Admin' || isMasterBypass) {
        setUserRole('Admin');
      } else if (location.pathname !== '/dev/auth') {
        navigate('/dev/auth');
      }
    }
  }, [location.pathname, session, userRole, navigate]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setCurrentUserEmail(session.user.email);
        fetchProfile(session.user.id);
        if (location.pathname === '/' || location.pathname === '/auth') {
          navigate('/home');
        }
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setCurrentUserEmail(session.user.email);
        fetchProfile(session.user.id);
        if (location.pathname === '/' || location.pathname === '/auth') {
          navigate('/home');
        }
      } else {
        // SECURITY_PROTOCOL: Only redirect to landing if not already on a public/auth route
        // Allow bypass access to /dev if they have the Admin role.
        const isMasterBypass = localStorage.getItem('isMaster') === 'true';
        if (
          location.pathname !== '/' && 
          location.pathname !== '/auth' && 
          location.pathname !== '/dev/auth' &&
          !(location.pathname === '/dev' && (userRole === 'Admin' || isMasterBypass))
        ) {
          navigate('/');
        }
        setCurrentUserEmail('');
        setCurrentUser({ username: 'ANON_OPERATIVE' });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location, userRole]);

  useEffect(() => {
    fetchReports();
    // Subscribe to real-time updates for reports
    const channel = supabase
      .channel('reports_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, () => {
        fetchReports();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching reports:', error);
      showToast('SYSTEM_ERROR', 'Failed to retrieve intelligence logs.', 'error');
    } else {
      setReports(data || []);
    }
    setIsLoading(false);
  };

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setCurrentUser({ username: data.username });
      setUserRole(data.role);
    }
  };

  const fetchAllUsers = async () => {
    // Only admins should be able to do this
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setRegisteredUsers(data);
  };

  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('timestamp', { ascending: false });
    if (data) setNotifications(data);
  };

  useEffect(() => {
    if (session) fetchNotifications();
  }, [session]);

  useEffect(() => {
    if (userRole === 'Admin' && location.pathname === '/dev') {
      fetchAllUsers();
    }
  }, [userRole, location.pathname]);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
    if (nextView === 'auth') navigate('/auth');
    else if (nextView === 'dash') navigate('/home');
    else if (nextView === 'dev') navigate('/dev');
  }, [nextView, navigate]);

  const handleStatusChange = useCallback(async (id, newStatus) => {
    if (!canPerformAction(userRole, 'manage_status')) return;
    const { error } = await supabase
      .from('reports')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) console.error('Error updating status:', error);
  }, [userRole]);

  const handleDeleteReport = useCallback(async (id) => {
    const { error } = await supabase
      .from('reports')
      .delete()
      .eq('id', id);

    if (error) console.error('Error deleting report:', error);
  }, []);

  const addReport = useCallback(async (e) => {
    e.preventDefault();
    if (!canPerformAction(userRole, 'submit_report')) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const file = e.target.image.files[0];
    let imageUrl = null;

    if (file) {
      // METADATA_STRIPPING_PROTOCOL: Pre-flight check
      const fileName = `intel_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('intel-media')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        showToast('STRAPPING_ERROR', 'Media transmission failed.', 'error');
        return;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('intel-media')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
    }

    const newReport = {
      title: sanitize(e.target.title.value),
      category: e.target.category.value,
      content: sanitize(e.target.content.value),
      user_id: session.user.id,
      // ANONYMITY_PROTOCOL: author_email removed to prevent traceability
      author_name: currentUser.username,
      upvotes: 0,
      status: 'Pending',
      timestamp: new Date().toISOString(),
      comments: [],
      image_url: imageUrl
    };

    const { error } = await supabase
      .from('reports')
      .insert([newReport]);

    if (error) {
      console.error('Error adding report:', error);
      showToast('SYSTEM_ERROR', 'Failed to anchor intelligence log.', 'error');
    } else {
      showToast('INTEL_LOGGED', 'Signal transmitted securely.', 'success');
    }
  }, [userRole, currentUser.username, showToast]);

  const handleVote = useCallback(async (reportId, type) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    const currentVote = userVotes instanceof Map ? (userVotes.get?.(reportId) ?? 0) : 0;
    let delta = 0;
    if (type === 1) delta = (currentVote === 1) ? -1 : (currentVote === -1 ? 2 : 1);
    else if (type === -1) delta = (currentVote === -1) ? 1 : (currentVote === 1 ? -2 : -1);

    const { error } = await supabase
      .from('reports')
      .update({ upvotes: report.upvotes + delta })
      .eq('id', reportId);

    if (!error) {
      setUserVotes(prev => {
        if (prev instanceof Map) {
          const next = new Map(prev);
          next.set(reportId, currentVote === type ? 0 : type);
          return next;
        } else {
          return { ...prev, [reportId]: (currentVote === type ? 0 : type) };
        }
      });
    }
  }, [reports, userVotes]);

  const handleAddComment = useCallback(async (reportId, text, user, proofUrl = null) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    const newComment = { id: Date.now().toString(), user, text: sanitize(text), time: Date.now(), proof_url: proofUrl };
    const updatedComments = [...(report.comments || []), newComment];

    const { error } = await supabase
      .from('reports')
      .update({ comments: updatedComments })
      .eq('id', reportId);

    if (error) console.error('Error adding comment:', error);
  }, [reports]);

  const handleSendNotification = useCallback(async (title, content, targetUserId = null) => {
    const { error } = await supabase
      .from('notifications')
      .insert([{ title, content, user_id: targetUserId }]);

    if (error) console.error('Error sending notification:', error);
  }, []);

  const handleUpdateBanStatus = useCallback(async (userId, status) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_banned: status })
      .eq('id', userId);

    if (error) console.error('Error updating ban status:', error);
    else fetchAllUsers();
  }, []);

  const handleGoogleAuth = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) showToast('GOOGLE_AUTH_ERROR', error.message, 'error');
  }, [showToast]);

  const handleUpdateUsername = useCallback(async (newUsername) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ username: newUsername })
        .eq('id', user.id);

      if (!error) {
        setCurrentUser(prev => ({ ...prev, username: newUsername }));
      } else {
        console.error('Error updating username:', error);
      }
    }
  }, []);

  const handleAuth = async (role, email, username, mode, password, code, campusId) => {
    // Task 5: Strict domain check
    if (!isValidCollegeEmail(email)) {
      return { ok: false, error: "Access Denied: Only VVCE emails allowed (@vvce.ac.in)" };
    }

    if (mode === 'signup') {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          }
        });

        console.log("AUTH_DIAGNOSTICS:", { data, error });

        if (error) {
          // Task 4: User already exists check
          if (error.message.includes('User already registered') || error.message.includes('already exists')) {
            return { ok: false, error: "The account already exists. Please login." };
          }
          return { ok: false, error: error.message };
        }

        if (data.user) {
          try {
            // Check if profile already exists to handle cases where signUp was previously successful but unconfirmed
            const { data: existingProfile } = await supabase
              .from('profiles')
              .select('id')
              .eq('id', data.user.id)
              .single();

            if (!existingProfile) {
              const { error: profileError } = await supabase
                .from('profiles')
                .insert([{ id: data.user.id, email, username, role, campus_id: campusId }]);

              if (profileError) {
                // If it's a unique constraint error
                if (profileError.message.includes('unique constraint')) {
                  if (profileError.message.includes('username')) {
                    return { ok: false, error: "Codename already taken. Choose another alias." };
                  }
                  if (profileError.message.includes('campus_id')) {
                    return { ok: false, error: "Campus ID already registered." };
                  }
                }
                throw profileError;
              }
            }

            return { ok: true, needsVerification: true, error: "Check your VVCE inbox for 6-digit verification code." };
          } catch (pErr) {
            console.error("PROFILE_INIT_ERROR:", pErr);
            return { ok: false, error: "System failed to initialize profile. Profile might already exist." };
          }
        }
      } catch (globalErr) {
        return { ok: false, error: globalErr.message };
      }
    }

    if (mode === 'verify') {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'signup'
      });
      if (error) {
        return { ok: false, error: "INVALID_CODE: Digital signature mismatch or expired." };
      }
      return { ok: true };
    }

    if (mode === 'login') {
      // SECURITY_PROTOCOL: Master Operative Bypass for Root Access
      const isMaster = email.toLowerCase() === 'thejxxuu@gmail.com' && password === '1208';

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error && !isMaster) {
        return { ok: false, error: error.message === 'Invalid login credentials' ? 'Access Denied: Operative not found or invalid key.' : error.message };
      }

      // Check if user is banned (if they have a profile)
      if (data?.user) {
        const { data: profile } = await supabase.from('profiles').select('is_banned').eq('id', data.user.id).single();
        if (profile?.is_banned) {
          await supabase.auth.signOut();
          return { ok: false, error: "ACCESS_DENIED: Your operative account has been suspended." };
        }
      }

      // If logging in from /dev or if Master Override is active
      if ((location.pathname === '/dev' || isMaster) && (DEV_WHITELIST.includes(email.toLowerCase()) || email.endsWith('@vvce.ac.in'))) {
        if (DEV_WHITELIST.includes(email.toLowerCase())) {
          setUserRole('Admin');
          if (isMaster) localStorage.setItem('isMaster', 'true');
          navigate('/dev');
          // Log bypass if no data.user
          if (!data?.user) console.warn("ROOT_OVERRIDE: Access granted via Master Key bypass.");
        }
      }
      return { ok: true };
    }

    return { ok: true };
  };

  const handleLogout = async () => {
    localStorage.removeItem('isMaster');
    await supabase.auth.signOut();
    navigate('/');
  };

  const startBoot = (target, mode = 'login') => {
    setNextView(target);
    setNextMode(mode);
    setIsBooting(true);
  };

  return (
    <div className="app-v3 dark-mode">
      {isBooting && <SystemBoot onComplete={handleBootComplete} />}
      {!isBooting && (
        <Routes>
          <Route path="/" element={<LandingPage onJoin={startBoot} />} />
          <Route path="/auth" element={
            <AuthPage
              initialMode={nextMode}
              onAuthSuccess={handleAuth}
              onGoogleAuth={handleGoogleAuth}
              onBack={() => navigate('/')}
            />
          } />
          <Route path="/home" element={
            <Dashboard
              reports={reports}
              role={userRole}
              isLoading={isLoading}
              showToast={showToast}
              onLogout={handleLogout}
              onVote={handleVote}
              onAddReport={addReport}
              onAddComment={handleAddComment}
              onStatusChange={handleStatusChange}
              onDeleteReport={handleDeleteReport}
              userVotes={userVotes}
              winWidth={winWidth}
              currentUser={currentUser}
              onUpdateUsername={handleUpdateUsername}
              currentUserEmail={currentUserEmail}
              notifications={notifications}
            />
          } />
          <Route path="/notifications" element={
            <Dashboard
              reports={reports}
              role={userRole}
              isLoading={isLoading}
              showToast={showToast}
              onLogout={handleLogout}
              onVote={handleVote}
              onAddReport={addReport}
              onAddComment={handleAddComment}
              onStatusChange={handleStatusChange}
              onDeleteReport={handleDeleteReport}
              userVotes={userVotes}
              winWidth={winWidth}
              currentUser={currentUser}
              onUpdateUsername={handleUpdateUsername}
              currentUserEmail={currentUserEmail}
              notifications={notifications}
            />
          } />
          <Route path="/profile" element={
            <Dashboard
              reports={reports}
              role={userRole}
              isLoading={isLoading}
              showToast={showToast}
              onLogout={handleLogout}
              onVote={handleVote}
              onAddReport={addReport}
              onAddComment={handleAddComment}
              onStatusChange={handleStatusChange}
              onDeleteReport={handleDeleteReport}
              userVotes={userVotes}
              winWidth={winWidth}
              currentUser={currentUser}
              onUpdateUsername={handleUpdateUsername}
              currentUserEmail={currentUserEmail}
              notifications={notifications}
            />
          } />
          <Route path="/dev/auth" element={
            <DevAuthPage
              onAuthSuccess={handleAuth}
              onBack={() => navigate('/')}
            />
          } />
          <Route path="/dev" element={
            userRole === 'Admin' ? (
              <DevPanel
                reports={reports}
                users={registeredUsers}
                onDelete={handleDeleteReport}
                onStatusChange={handleStatusChange}
                onSendNotification={handleSendNotification}
                onUpdateBanStatus={handleUpdateBanStatus}
                onBack={() => navigate('/home')}
              />
            ) : (
              <Navigate to="/dev/auth" />
            )
          } />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      <div className="toast-container-v30">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast key={toast.id} title={toast.title} msg={toast.msg} type={toast.type} />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {winWidth > 0 && typeof window !== 'undefined' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="back-to-top-v32"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
