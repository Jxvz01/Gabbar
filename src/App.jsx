import React, { useState, useEffect, useCallback, useMemo, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Shield, Activity, FileText, CheckCircle, ChevronUp, ChevronDown, Lock, Loader2, Edit3, ArrowRight, Zap, MessageCircle, Send, AlertTriangle, Menu, X, Bell, User, LogOut, TrendingUp, Plus } from 'lucide-react';
import './index.css';
import { sanitize, isValidCollegeEmail, checkRateLimit, canPerformAction, anonymizeReport, DEV_WHITELIST } from './security';
import { supabase } from './supabase';

// --- CONSTANTS ---
const CATEGORIES = ['Facilities', 'Harassment', 'Academics', 'Safety', 'Suggestions', 'Other'];
const STATUSES = ['Under Review', 'Resolved', 'Pending'];
const isMobileDevice = typeof window !== 'undefined' && window.innerWidth <= 1024;

// --- COMPONENTS ---

// --- COMPONENTS ---

const LandingPage = ({ onJoin }) => {
  return (
    <div className="landing-master">
      <div className="ambient-bg">
        <div className="ambient-orb blue"></div>
        <div className="ambient-orb purple"></div>
        <div className="scanline"></div>
      </div>
      <div className="noise-overlay"></div>
      
      {/* 🔥 HERO SECTION (CINEMATIC) */}
      <section className="hero-v7">
        <div className="hero-visual-system">
           <div className="radar-grid"></div>
           <motion.div 
             animate={{ 
               scale: [1, 1.1, 1],
               opacity: [0.3, 0.6, 0.3],
               boxShadow: [
                 "0 0 40px rgba(59, 130, 246, 0.2)",
                 "0 0 80px rgba(59, 130, 246, 0.4)",
                 "0 0 40px rgba(59, 130, 246, 0.2)"
               ]
             }}
             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             className="intelligence-orb"
           ></motion.div>
           <div className="data-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
           </div>
           <div className="particle-system">
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="p-dot"
                  initial={{ 
                    x: Math.random() * 1000 - 500, 
                    y: Math.random() * 1000 - 500,
                    opacity: 0 
                  }}
                  animate={{ 
                    y: [null, Math.random() * -100 - 50],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 5 + 5, 
                    repeat: Infinity, 
                    delay: Math.random() * 5 
                  }}
                />
              ))}
           </div>
        </div>

        <div className="container-v6 hero-content-v7">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="v-stack"
          >
            <h1 className="hero-h1-v7">Silence is broken.<br/><span className="gradient-text">Intelligence begins.</span></h1>
            <p className="hero-p-v7">A high-fidelity, anonymous intelligence hub for campus safety and transparency. Your voice, protected by end-to-end encryption protocols.</p>
            
            <div className="flex-v6" style={{ marginTop: '40px' }}>
              <motion.button 
                whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)' }} 
                whileTap={{ scale: 0.98 }}
                className="btn-v7 primary" 
                onClick={() => onJoin('auth', 'signup')}
              >
                Sign-Up <ArrowRight size={18} style={{ marginLeft: '12px' }}/>
              </motion.button>
              <motion.button 
                whileHover={{ y: -3, scale: 1.05, background: 'rgba(255, 255, 255, 0.05)' }} 
                whileTap={{ scale: 0.98 }}
                className="btn-v7 secondary" 
                onClick={() => onJoin('auth', 'login')}
              >
                AUTHENTICATE
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🧊 CORE CAPABILITIES (Cards Upgrade) */}
      <section className="section-v7">
        <div className="container-v6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header-v7"
          >
             <h2 className="title-v7">System Architecture</h2>
             <p className="desc-v7">Engineered for absolute privacy and high-speed intelligence routing.</p>
          </motion.div>

          <div className="grid-v7">
            {[
              { t: '100% ANONYMOUS', d: 'Zero-trace reporting infrastructure. Your identity remains uncoupled from the data layers.', icon: <Lock size={24} /> },
              { t: 'ENCRYPTED INTEL', d: 'Military-grade encryption for all media and text submissions. Privacy is not a feature, it is the core.', icon: <Shield size={24} /> },
              { t: 'RAPID RESPONSE', d: 'Direct, prioritized communication channel to response teams without bureaucratic friction.', icon: <Zap size={24} /> }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                className="capability-card glass-v7"
              >
                <div className="card-icon-v7">{item.icon}</div>
                <h3 className="card-title-v7">{item.t}</h3>
                <p className="card-desc-v7">{item.d}</p>
                <div className="card-glow-v7"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛡️ SECURITY PROTOCOL (Linear Flow) */}
      <section className="section-v7 dark-bg">
        <div className="container-v6">
          <div className="dual-layout-v7">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               className="security-visual"
             >
                <div className="security-orb-v7">
                   <Activity size={120} strokeWidth={1} className="pulse-icon" />
                </div>
                <div className="pulse-circles">
                   <div className="p-circle"></div>
                   <div className="p-circle"></div>
                </div>
             </motion.div>

             <div className="security-content">
                <h2 className="title-v7 left">Safety First.<br/>Always.</h2>
                <div className="v-stack" style={{ alignItems: 'flex-start', gap: '32px' }}>
                   {[
                     { t: 'Metadata Stripping', d: 'All uploaded files are automatically scrubbed of EXIF and location data.' },
                     { t: 'Zero Interaction Logging', d: 'Platform visits and interactions are never mapped to hardware identifiers.' },
                     { t: 'Safe Channeling', d: 'Direct routing to trusted administrators via secure API tunnels.' }
                   ].map((p, i) => (
                     <motion.div 
                       key={i} 
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.2 }}
                       className="protocol-item"
                     >
                        <div className="protocol-marker"></div>
                        <div className="v-stack" style={{ alignItems: 'flex-start' }}>
                           <h4 className="p-title-v7">{p.t}</h4>
                           <p className="p-desc-v7">{p.d}</p>
                        </div>
                     </motion.div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ⚙️ UPLINK PATHWAY (How it works) */}
      <section className="section-v7">
        <div className="container-v6">
          <h2 className="title-v7 centered">The Intelligence Pathway</h2>
          <div className="pathway-v7">
             {[
               { t: 'AUTHENTICATE', d: 'Secure campus login via institutional protocols.' },
               { t: 'LOG_INTEL', d: 'Submit your report with optional media attachments.' },
               { t: 'ADMIN_ACTION', d: 'Encrypted routing to relevant authorities for triage.' }
             ].map((path, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.2 }}
                 className="pathway-step glass-v7"
               >
                 <div className="step-num-v7">0{i+1}</div>
                 <h4 className="step-title-v7">{path.t}</h4>
                 <p className="step-desc-v7">{path.d}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 🎯 FINAL CTA */}
      <section className="section-v7 final-cta">
         <motion.div 
           initial={{ opacity: 0, y: 60 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2 }}
           className="cta-glass-v7"
         >
            <div className="cta-grid-bg"></div>
            <h2 className="cta-h2-v7">Ready to secure your campus?</h2>
            <p className="cta-p-v7">Join the intelligence hub and help build a safer, more transparent environment today.</p>
            <button className="btn-v7 primary large" onClick={() => onJoin('auth', 'signup')}>Sign-Up</button>
            <div className="cta-sub-v7">STRENGTHENED BY 335+ SECURE SYSTEM COMMITS</div>
         </motion.div>
      </section>

      <footer className="footer-master-v7">
         <div className="container-v6">
            <div className="footer-layout-v7">
               <div className="footer-brand">
                  <div className="nav-logo" style={{ marginBottom: '12px' }}>GABBAR.</div>
                  <p className="footer-brand-p">Next-Gen Intelligence Shield</p>
               </div>
               <div className="footer-links">
                  <p className="footer-text">© 2026 GABBAR | Developed by <a href="https://www.instagram.com/__.jxvz01" target="_blank" rel="noopener noreferrer" className="dev-link">Jxvz01</a></p>
                  <div className="security-badge">SECURE_SSL_V3</div>
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
    "[SYSTEM] HUB_INITIALIZED: SECURE",
    "[TRANS] PACKET_DECRYPTED: SUCCESS",
    "[SECURITY] ANONYMITY_SHIELD: ACTIVE"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const msgs = [
        "[UPLINK] SIGNAL_STRENGTH: 98%",
        "[CRYPTO] KEY_ROTATION: COMPLETE",
        "[NETWORK] NODE_SYNC: PENDING",
        "[INTEL] NEW_REPORT_INDEXED",
        "[SCAN] COMPROMISE_CHECK: CLEAN"
      ];
      setLogs(prev => [...prev.slice(-4), msgs[Math.floor(Math.random() * msgs.length)]]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sys-terminal glass-v3">
      {logs.map((log, i) => <div key={i} className="terminal-line">{log}</div>)}
    </div>
  );
};

const BottomNav = memo(({ activeTab, onTabChange }) => (
  <nav className="bottom-nav-v26">
    {[
      { id: 'feed', icon: <Radio size={20} />, label: 'Feed' },
      { id: 'notifications', icon: <Bell size={20} />, label: 'Intel' },
      { id: 'profile', icon: <User size={20} />, label: 'Profile' }
    ].map(item => (
      <div 
        key={item.id} 
        className={`bn-item ${activeTab === item.id ? 'active' : ''}`}
        onClick={() => onTabChange(item.id)}
      >
        {item.icon}
        <span>{item.label}</span>
      </div>
    ))}
  </nav>
));

const SidePanel = memo(({ reports, topReports }) => (
  <aside className="side-info-v7" style={{ width: '100%' }}>
    <section className="side-sec-v7">
      <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#fff', marginBottom: '24px' }}>
        <TrendingUp size={16} color="var(--primary)" /> HIGH_DENSITY_INTEL
      </h4>
      <div className="v-stack" style={{ gap: '16px' }}>
        {(topReports || []).map(r => (
          <div 
            key={r.id} 
            className="side-preview-v18 v-stack" 
            style={{ gap: '8px', cursor: 'pointer', textAlign: 'left', alignItems: 'flex-start', width: '100%' }}
          >
            <div className="flex-v6" style={{ width: '100%', justifyContent: 'space-between', gap: '6px' }}>
              <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '10px' }}>#{r.id}</div>
              <div className="badge-v7 status" style={{ margin: 0 }}>{r.category.toUpperCase()}</div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#fff', lineHeight: '1.4' }}>{r.title}</div>
            <div className="flex-v6" style={{ gap: '10px', marginTop: '4px', opacity: 0.6 }}>
              <ArrowRight size={12} /> <span style={{ fontSize: '11px', fontWeight: '700' }}>{r.upvotes} UPVOTES</span>
            </div>
          </div>
        ))}
        {(topReports || []).length === 0 && <p style={{ fontSize: '12px', color: 'var(--text-dim)', textAlign: 'center', padding: '20px' }}>Awaiting intel logs...</p>}
      </div>
    </section>

    <section className="side-sec-v7" style={{ marginTop: '48px' }}>
      <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#fff', marginBottom: '24px' }}>
        <Activity size={16} color="var(--accent-purple)" /> PLATFORM_METRICS
      </h4>
      <div className="v-stack" style={{ gap: '12px' }}>
        {[
          { label: 'Active Channels', value: '01', color: 'var(--primary)' },
          { label: 'Total Intel Logs', value: (reports || []).length.toString().padStart(2, '0'), color: 'var(--accent-purple)' },
          { label: 'Secure Commits', value: '335+', color: 'var(--primary)' },
          { label: 'Platform Status', value: 'Secure', color: 'var(--accent-emerald)' }
        ].map((m, i) => (
          <div key={i} className="flex-v6" style={{ width: '100%', justifyContent: 'space-between', padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
             <span style={{ fontSize: '12px', fontWeight: '800', opacity: 0.5 }}>{m.label.toUpperCase()}</span>
             <span style={{ fontSize: '14px', fontWeight: '900', color: m.color }}>{m.value}</span>
          </div>
        ))}
      </div>
    </section>

    <section className="side-sec-v7" style={{ marginTop: '48px' }}>
       <div className="flex-v6" style={{ flexWrap: 'wrap', justifyContent: 'flex-start', gap: '8px', opacity: 0.8 }}>
          {CATEGORIES.map(c => (
            <span key={c} className={`badge-v7 border-${c}`} style={{ fontSize: '10px', padding: '6px 14px', borderRadius: '6px' }}>{c.toUpperCase()}</span>
          ))}
       </div>
    </section>
  </aside>
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
    alert("BROADCAST_SENT: Message transmitted across all encrypted nodes.");
  };

  return (
    <div className="dev-panel-v28 page-transition" style={{ padding: '40px', background: '#030712', minHeight: '100vh' }}>
      <div className="flex-v6" style={{ justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid #1f2937', paddingBottom: '24px' }}>
         <div className="v-stack" style={{ alignItems: 'flex-start', gap: '4px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>/DEV_CMD_CENTER</h1>
            <p style={{ fontSize: '11px', color: '#10b981', fontWeight: '800', letterSpacing: '1px' }}>OPERATIVE_RANK: ROOT_ADMIN</p>
         </div>
         <button onClick={onBack} className="dev-btn" style={{ width: 'auto', padding: '12px 24px', margin: 0 }}>← EXIT_ROOT</button>
      </div>

      <div className="flex-v6" style={{ justifyContent: 'flex-start', gap: '16px', marginBottom: '32px' }}>
        {['reports', 'users', 'broadcast'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            style={{ 
              background: activeSubTab === tab ? '#10b981' : 'rgba(255,255,255,0.02)', 
              color: activeSubTab === tab ? '#000' : '#fff',
              border: '1px solid ' + (activeSubTab === tab ? '#10b981' : '#1f2937'),
              padding: '10px 20px', borderRadius: '4px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeSubTab === 'reports' && (
        <div className="admin-view-v15">
          <h2 className="dev-h2" style={{ fontSize: '20px', marginBottom: '24px' }}>LOGGED_INTELLIGENCE</h2>
          <table className="admin-table-v15" style={{ display: 'table' }}>
            <thead>
              <tr>
                <th className="admin-th-v15">SUBJECT</th>
                <th className="admin-th-v15">CATEGORY</th>
                <th className="admin-th-v15">STATUS_PROTOCOLS</th>
                <th className="admin-th-v15">COMMANDS</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="admin-row-v15">
                  <td className="admin-td-v15">
                     <div style={{ fontWeight: '800', color: '#fff' }}>{r.title}</div>
                     <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '4px' }}>LOG_{r.id.slice(0,8)}</div>
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
                    <button onClick={() => onDelete && onDelete(r.id)} className="btn-admin-v15" style={{ color: '#ef4444', borderColor: '#ef444422' }}>PURGE_LOG</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSubTab === 'users' && (
        <div className="admin-view-v15">
          <h2 className="dev-h2" style={{ fontSize: '20px', marginBottom: '24px' }}>USER_MANIFEST</h2>
          <table className="admin-table-v15" style={{ display: 'table' }}>
            <thead>
              <tr>
                <th className="admin-th-v15">OPERATIVE_USERNAME</th>
                <th className="admin-th-v15">EMAIL</th>
                <th className="admin-th-v15">RANK</th>
                <th className="admin-th-v15">IDENTITY_STATUS</th>
                <th className="admin-th-v15">COMMANDS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="admin-row-v15">
                  <td className="admin-td-v15" style={{ fontWeight: '800', color: '#fff' }}>{u.username}</td>
                  <td className="admin-td-v15">{u.email}</td>
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
                      {u.is_banned ? 'ENABLE_ACCESS' : 'SUSPEND_OPERATIVE'}
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
          <h2 className="dev-h2" style={{ fontSize: '20px', marginBottom: '8px' }}>UPLINK_BROADCAST</h2>
          <p className="dev-p" style={{ marginBottom: '32px' }}>Transmit system-wide or targeted messages.</p>
          
          <form onSubmit={handleBroadcast} className="v-stack" style={{ gap: '24px', alignItems: 'stretch' }}>
            <div className="input-field-v15">
              <label>MESSAGE_TITLE</label>
              <input 
                className="input-v9"
                value={notifForm.title}
                onChange={e => setNotifForm({...notifForm, title: e.target.value})}
                placeholder="Alert Level: Critical"
                required
                style={{ marginBottom: 0 }}
              />
            </div>
            
            <div className="input-field-v15">
              <label>TARGET_OPERATIVE</label>
              <select 
                value={notifForm.target}
                onChange={e => setNotifForm({...notifForm, target: e.target.value})}
                className="input-v9 select-v9" 
                style={{ marginBottom: 0 }}
              >
                <option value="Everyone">GLOBAL_BROADCAST (EVERYONE)</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.username} ({u.email})</option>)}
              </select>
            </div>

            <div className="input-field-v15">
              <label>CONTENT_PAYLOAD</label>
              <textarea 
                className="input-v9"
                value={notifForm.content}
                onChange={e => setNotifForm({...notifForm, content: e.target.value})}
                rows="4" 
                placeholder="Type the message content..."
                required
                style={{ resize: 'none', marginBottom: 0 }}
              ></textarea>
            </div>

            <button type="submit" disabled={isSending} className="dev-btn">
              {isSending ? 'TRANSMITTING...' : 'INITIALIZE_SIGNAL_BURST'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
});

const AdminProfileView = memo(({ reports, onStatusChange }) => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const filtered = useMemo(() => {
    return reports.filter(r => 
      (filterStatus === 'All' || r.status === filterStatus) &&
      (filterCategory === 'All' || r.category === filterCategory)
    );
  }, [reports, filterStatus, filterCategory]);

  return (
    <div className="anim-fade-up v-stack admin-view-v15" style={{ gap: '48px' }}>
       {/* 👤 ADMIN IDENTITY BOX (V15) */}
       <div className="flex-v6" style={{ width: '100%', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '32px' }}>
          <div className="flex-v6" style={{ gap: '24px' }}>
             <div style={{ width: '56px', height: '56px', borderRadius: '8px', background: '#111827', border: '1px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Shield size={28} />
             </div>
             <div>
                <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#f9fafb', marginBottom: '4px' }}>System Administrator</h2>
                <div className="flex-v6" style={{ gap: '8px', justifyContent: 'flex-start' }}>
                  <span className="badge-v15 badge-admin">ACCESS_LVL_7</span>
                  <span style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '1px', fontWeight: '800' }}>TERMINAL_ACTIVE</span>
                </div>
             </div>
          </div>
          <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '800', background: '#111827', padding: '10px 18px', borderRadius: '6px', border: '1px solid #1f2937' }}>
             SESSION_ID: #4092-AX
          </div>
       </div>

       {/* 📊 INDUSTRIAL STATS GRID (V15) */}
       <div className="admin-stat-grid-v15">
          {[
            { l: 'TOTAL_INDEXED', v: reports.length },
            { l: 'UNDER_REVIEW', v: reports.filter(r => r.status === 'Under Review').length },
            { l: 'ACTIVE_RESOLVED', v: reports.filter(r => r.status === 'Resolved').length },
            { l: 'CRITICAL_RISK', v: reports.filter(r => r.upvotes > 70).length }
          ].map((stat, i) => (
            <div key={i} className="admin-stat-v15">
               <div className="val">{stat.v < 10 && '0'}{stat.v}</div>
               <div className="lab">{stat.l}</div>
            </div>
          ))}
       </div>

       {/* 📜 TABLE CONTROL (V15) */}
       <div className="v-stack" style={{ gap: '24px' }}>
          <div className="flex-v6" style={{ justifyContent: 'space-between' }}>
             <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#f9fafb', letterSpacing: '1px' }}>INTELLIGENCE_LEDGER</h3>
             <div className="flex-v6" style={{ gap: '12px' }}>
                <select className="select-v4" style={{ width: '150px', background: '#111827', borderColor: '#374151', fontSize: '11px' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                   <option value="All">ALL_STATUS</option>
                   {STATUSES.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                </select>
                <select className="select-v4" style={{ width: '150px', background: '#111827', borderColor: '#374151', fontSize: '11px' }} value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
                   <option value="All">ALL_SECTORS</option>
                   {CATEGORIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                </select>
             </div>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table className="admin-table-v15">
              <thead>
                  <tr>
                    <th className="admin-th-v15">LOG_ID</th>
                    <th className="admin-th-v15">SECTOR</th>
                    <th className="admin-th-v15">STATUS</th>
                    <th className="admin-th-v15">ACTION_PROTOCOLS</th>
                  </tr>
              </thead>
              <tbody>
                  {filtered.map(r => (
                    <tr key={r.id} className="admin-row-v15">
                      <td className="admin-td-v15">
                          <div style={{ fontWeight: '800', color: '#f9fafb', fontSize: '13px' }}>{r.title}</div>
                          <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '4px' }}>ID_{r.id} · {new Date(r.timestamp).toLocaleDateString()}</div>
                      </td>
                      <td className="admin-td-v15">
                          <span className="badge-v7 category" style={{ fontSize: '10px', padding: '4px 8px' }}>{r.category.toUpperCase()}</span>
                      </td>
                      <td className="admin-td-v15">
                          <span className={`badge-v15 ${r.upvotes > 70 ? 'badge-critical' : 'badge-admin'}`} style={{ fontSize: '10px' }}>{r.status.toUpperCase()}</span>
                      </td>
                      <td className="admin-td-v15">
                          <div className="flex-v6" style={{ gap: '8px', justifyContent: 'flex-start' }}>
                            {r.status !== 'Under Review' && <button className="btn-admin-v15" onClick={() => onStatusChange(r.id, 'Under Review')}>RE-SCOPE</button>}
                            {r.status !== 'Resolved' && <button className="btn-admin-v15 resolve" onClick={() => onStatusChange(r.id, 'Resolved')}>RESOLVE</button>}
                            <button className="btn-admin-v15" style={{ color: '#ef4444' }} onClick={() => onStatusChange(r.id, 'Archived')}>DISMISS</button>
                          </div>
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
          <div className="title">SYS_ROOT_ACCESS</div>
        </div>
        
        <div className="terminal-body v-stack" style={{ gap: '32px' }}>
          <div className="auth-branding">
            <Shield size={48} className="dev-glow-icon" />
            <h2 className="dev-h2">UPLINK_TERMINAL_V9</h2>
            <p className="dev-p">Restricted Access: Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleSubmit} className="v-stack" style={{ gap: '20px', width: '100%' }}>
            <div className="input-field-v15">
              <label>OPERATIVE_ID</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => { setEmail(e.target.value); setAuthError(''); }}
                placeholder="root@intelligence.hub"
                required
              />
            </div>
            
            <div className="input-field-v15">
              <label>ENCRYPTION_KEY</label>
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
              {isLoading ? 'ESTABLISHING_LINK...' : 'INITIALIZE_COMMAND_OVERRIDE'}
            </button>
          </form>

          <button onClick={onBack} className="dev-back">← TERMINATE_SESSION</button>
        </div>

        <div className="terminal-footer">
          <span className="status">GATEWAY: SECURE</span>
          <span className="node">NODE: 0x4F92</span>
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
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [typedCode, setTypedCode] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    
    if (!isValidCollegeEmail(email)) {
      setAuthError('Only VVCE college email addresses are allowed.');
      return;
    }
    
    const password = e.target.password.value;
    onAuthSuccess(role, email, username || 'ANON_OPERATIVE', mode, password, null, campusId).then(result => {
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
        <button className="btn-retreat-v3" onClick={onBack}>← RETURN TO PERIPHERY</button>
        <h2 className="auth-h2">{mode === 'login' ? (isVerifying ? 'VERIFY' : 'LOGIN') : (isVerifying ? 'VERIFY' : 'SIGN UP')}</h2>
        <p className="auth-p" style={{color: isVerifying ? 'var(--warning)' : 'var(--accent-emerald)'}}>
          {isVerifying ? 'Check your VVCE inbox for the code...' : 'Establishing secure comm-link...'}
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
            <button type="submit" className="btn-main primary full hover-glow">INITIALIZE_HUB_ACCESS</button>
            <p className="auth-toggle-v4" onClick={() => setIsVerifying(false)} style={{marginTop: '20px', cursor:'pointer', fontSize:'12px'}}>← Back to credentials</p>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="auth-f">
            <div className="input-group-v4">
              <label className="label-v4" style={{color: 'var(--accent-purple)', fontWeight: '800'}}>ACCESS ROLE</label>
              <select className="select-v4" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Student">STUDENT</option>
                <option value="Professor">PROFESSOR</option>
                <option value="Admin">ADMINISTRATOR</option>
              </select>
            </div>

            <div style={{ width: '100%', marginBottom: '24px' }}>
               <input 
                 className={`input-v3 ${authError ? 'input-error-v27' : ''}`} 
                 type="email" 
                 placeholder="CAMPUS EMAIL (@vvce.ac.in)" 
                 value={email}
                 onChange={(e) => { setEmail(e.target.value); setAuthError(''); }}
                 required 
               />
               {authError && <div className="error-msg-v27 anim-fade-in">{authError}</div>}
            </div>

            <input className="input-v3" name="password" type="password" placeholder="ENCRYPTION KEY" required />
            
            {mode === 'signup' && (
              <div className="v-stack" style={{ gap: '16px', width: '100%', marginBottom: '24px' }}>
                <input 
                  className="input-v3" 
                  type="text" 
                  placeholder="CAMPUS ID / ROLL NO" 
                  value={campusId}
                  onChange={(e) => setCampusId(e.target.value)}
                  required 
                />
                <input 
                  className="input-v3" 
                  type="text" 
                  placeholder="ANONYMOUS CODENAME (e.g. ShadowFox)" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>
            )}

            <button type="submit" className="btn-main primary full hover-glow">
              {mode === 'login' ? 'INITIALIZE CONNECTION' : 'CREATE ACCOUNT'}
            </button>

            <div className="flex-v6" style={{ width: '100%', margin: '12px 0 0 0' }}>
               <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
               <span style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: '800', padding: '0 10px' }}>OR</span>
               <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
            </div>

            <button type="button" onClick={onGoogleAuth} className="btn-google-v1">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style={{ width: '16px' }} />
                <span>CONTINUE WITH GOOGLE</span>
            </button>
          </form>
        )}

        <div className="auth-toggle-v4">
          {mode === 'login' ? (
            <>
              <p>New operative? <span onClick={() => { setMode('signup'); setAuthError(''); }}>Request Access</span></p>
              <p className="forgot-p" onClick={() => alert('INTELLIGENCE RECOVERY: Contact System Admin for key reset.')}>Forgot encryption key?</p>
            </>
          ) : (
            <p>Already registered? <span onClick={() => { setMode('login'); setAuthError(''); }}>Authenticate</span></p>
          )}
        </div>
      </div>
    </div>
  );
});

const Dashboard = memo(({ reports, role, onLogout, onVote, onAddReport, onAddComment, onStatusChange, onDeleteReport, userVotes, winWidth, currentUser, onUpdateUsername, currentUserEmail }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [subState, setSubState] = useState('idle'); // idle, loading, success
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(currentUser?.username || 'ANON_OPERATIVE');
  const isMobile = winWidth <= 1024;

  const userReports = useMemo(() => {
    return reports.filter(r => r.user_id === currentUserEmail || r.author_email === currentUserEmail);
  }, [reports, currentUserEmail]);


  const topReports = useMemo(() => {
    return [...reports].sort((a,b) => b.upvotes - a.upvotes).slice(0, 3);
  }, [reports]);

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
    <div className="dash-layout-v7">
      {/* 📱 MOBILE HEADER (GABBAR BRANDING) */}
      <div className="mobile-header-v20" style={{ justifyContent: 'center' }}>
          <div className="nav-logo" style={{ marginBottom: 0, display: 'block', fontSize: '18px' }}>GABBAR.</div>
      </div>

      <AnimatePresence>
        {/* Mobile Overlay Removed (Bottom Nav Used instead) */}
      </AnimatePresence>

      {/* 🧭 NAVIGATION (DESKTOP: SIDEBAR / MOBILE: BOTTOM NAV) */}
      {!isMobile && (
        <aside className="side-nav-v7">
          <div className="flex-v6" style={{ width: '100%', justifyContent: 'space-between', marginBottom: '40px' }}>
             <div className="nav-logo" style={{ marginBottom: 0 }}>GABBAR.</div>
          </div>
          <nav className="nav-list">
            {[
              { id: 'feed', label: 'Feed', icon: <Radio size={18} /> },
              { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
              { id: 'profile', label: 'Profile', icon: <User size={18} /> }
            ].map(item => (
              <div 
                key={item.id} 
                className={`nav-item-v7 ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {item.icon} <span>{item.label}</span>
                </div>
              </div>
            ))}
          </nav>
          <div className="nav-item-v7" onClick={onLogout} style={{ marginTop: 'auto', opacity: 0.6, gap: '12px' }}>
            Logout <LogOut size={16} />
          </div>
        </aside>
      )}

      {isMobile && <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />}

      {/* 📦 MAIN FEED */}
      <main className="main-feed-v7">
        <div className="feed-container-v7">
          <header className="top-nav-v7" style={{ alignItems: 'flex-start' }}>
             <div style={{ textAlign: 'left' }}>
                <h2 className="h-title" style={{ fontSize: '24px' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                <p className="h-sub" style={{ textAlign: 'left' }}>Secure platform intelligence.</p>
             </div>
             <div className="flex-v6" style={{ gap: '8px', flexDirection: 'row', width: 'auto' }}>
                <div className="badge-v7 status" style={{ fontSize: '9px' }}>#{role.toUpperCase()}</div>
             </div>
          </header>


          {activeTab === 'feed' && (reports || []).length === 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="empty-hub-v18">
               <div className="empty-icon-v18"><AlertTriangle size={80} strokeWidth={1} /></div>
               <h2 className="h-title" style={{ fontSize: '28px', marginBottom: '16px' }}>Zero Intelligence Logs Indexed</h2>
               <p className="h-sub" style={{ fontSize: '15px', maxWidth: '400px', marginBottom: '40px' }}>The hub is currently clear. Be the first operative to raise an industrial concern or suggestion.</p>
               <button className="btn-v3 primary" onClick={() => setIsFormOpen(true)} style={{ padding: '18px 40px' }}><Plus size={20} /> Initialize First Report</button>
            </motion.div>
          )}

          {activeTab === 'feed' && (reports || []).map((r, i) => (
             <ReportCard 
               key={r.id} 
               report={r} 
               onVote={onVote} 
               role={role} 
               activeVote={userVotes[r.id] || 0}
               onAddComment={onAddComment}
               onDeleteReport={onDeleteReport}
               index={i}
               currUsername={currentUser?.username}
               currentUserEmail={currentUserEmail}
             />
          ))}


          {activeTab === 'notifications' && (
            <div className="anim-fade-up v-stack" style={{ alignItems: 'flex-start' }}>
               {(notifications || []).length === 0 && (
                 <div className="empty-hub-v18" style={{ width: '100%' }}>
                    <Bell size={40} opacity={0.3} style={{ border: 'none' }}/>
                    <p style={{ marginTop: '20px', color: 'var(--text-dim)' }}>Zero system broadcasts found.</p>
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
            <AdminProfileView reports={reports} onStatusChange={onStatusChange} />
          )}

          {activeTab === 'profile' && role !== 'Admin' && (
            <div className="anim-fade-up profile-layout-v10">
               {/* 🧬 IDENTITY SIDEBAR (IMMERSIVE V12) */}
               <aside className="id-card-v10 id-card-v12">
                  <div className="v-stack" style={{ gap: '32px', alignItems: 'flex-start' }}>
                     <div className="id-avatar-v12" style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: '0 0 40px rgba(59, 130, 246, 0.05)' }}>
                        <Shield size={32} />
                     </div>
                     <div>
                        <div className="flex-v6" style={{ justifyContent: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                            {isEditingUsername ? (
                               <div className="v-stack" style={{ alignItems: 'flex-start', gap: '8px' }}>
                                  <input 
                                     className="input-v9" 
                                     value={newUsername} 
                                     onChange={(e) => setNewUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                                     style={{ padding: '8px 12px', fontSize: '18px', fontWeight: '800', marginBottom: 0 }}
                                     placeholder="Min 3 chars"
                                  />
                                  <div className="flex-v6" style={{ gap: '8px', justifyContent: 'flex-start' }}>
                                     <button 
                                        onClick={() => {
                                           if (newUsername.length >= 3) {
                                              onUpdateUsername(newUsername);
                                              setIsEditingUsername(false);
                                           } else {
                                              alert("SYSTEM_REJECT: Username must be minimum 3 alpha-numeric characters.");
                                           }
                                        }}
                                        className="btn-v15 resolve" 
                                        style={{ padding: '4px 12px', fontSize: '10px' }}
                                     >SAVE_ID</button>
                                     <button onClick={() => setIsEditingUsername(false)} className="btn-v15" style={{ padding: '4px 12px', fontSize: '10px', color: 'var(--text-dim)' }}>ABORT</button>
                                  </div>
                               </div>
                            ) : (
                               <>
                                  <h3 className="h-title username-glow-v12" style={{ fontSize: '24px' }}>{currentUser?.username || 'ANON_OPERATIVE'}</h3>
                                  <button onClick={() => setIsEditingUsername(true)} className="vote-btn-v8" style={{ padding: 0, width: '24px', height: '24px' }}><Edit3 size={14} /></button>
                               </>
                            )}
                         </div>

                        <div className="flex-v6" style={{ gap: '10px', justifyContent: 'flex-start' }}>
                           <p className="h-sub" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)', fontWeight: '800' }}>RANK: {role.toUpperCase()}</p>
                           <span className="active-tag-v12">Anonymous Identity Active</span>
                        </div>
                     </div>

                     <div className="reputation-v10">
                        <Zap size={16} fill="var(--primary)" style={{ opacity: 0.8, marginBottom: '4px' }} />
                        <span className="score">
                           {(userReports.filter(r => r.status === 'Resolved').length * 100) + (userReports.length * 15)}
                        </span>
                        <span className="label">Platform Impact Score</span>
                     </div>

                     <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', fontSize: '13px', color: 'var(--text-dim)', lineHeight: '1.6' }}>
                        Professional alias is visible on all hub activity. End-to-end encryption protocols are <span style={{color:'var(--accent-emerald)', fontWeight:'800'}}>LOCKED</span>.
                     </div>
                     
                     <div className="v-stack" style={{ gap: '16px', alignItems: 'flex-start', marginTop: '16px', borderTop: '1px solid var(--glass-border)', paddingTop: '32px', width: '100%' }}>
                        <div className="flex-v6" style={{ color: 'var(--accent-emerald)', fontSize: '11px', fontWeight: '900', gap: '12px' }}><CheckCircle size={14} /> IDENTITY_SHIELD: NOMINAL</div>
                        <div className="flex-v6" style={{ color: 'var(--accent-emerald)', fontSize: '11px', fontWeight: '900', gap: '12px' }}><CheckCircle size={14} /> PACKET_ROUTING: MASKED</div>
                     </div>
                  </div>
               </aside>

               {/* 📊 ACTIVITY CONTENT (IMMERSIVE V12) */}
               <div className="activity-pan-v10">
                  <div className="stat-grid-v10">
                     {[
                       { l: 'INTEL LOGGED', v: userReports.length, i: <FileText size={18} /> },
                       { l: 'HUB ACTIONS', v: '24', i: <Activity size={18} /> },
                       { l: 'RESOLVED LOGS', v: userReports.filter(r => r.status === 'Resolved').length, i: <CheckCircle size={18} /> }
                     ].map((stat, i) => (
                       <div key={i} className="stat-mini-v10" style={{ position: 'relative', overflow: 'hidden' }}>
                          <div style={{ color: 'var(--primary)', opacity: 0.6, marginBottom: '16px' }}>{stat.i}</div>
                          <span className="val">{stat.v}</span>
                          <span className="lab">{stat.l}</span>
                       </div>
                     ))}
                  </div>

                  <section className="activity-sec-v10">
                     <div className="sec-header-v10">
                        <Activity size={12} /> RECENT INTELLIGENCE LOGS <div className="h-line"></div>
                     </div>
                     <div className="v-stack" style={{ gap: '20px' }}>
                        {userReports.length === 0 ? (
                            <div className="id-card-v10" style={{ padding: '32px', textAlign: 'center', opacity: 0.6, width: '100%' }}>
                               <Activity size={32} style={{ marginBottom: '12px', color: 'var(--text-dim)', margin: '0 auto 12px' }}/>
                               <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--text-dim)' }}>No intelligence logs submitted by current operative profile.</p>
                            </div>
                        ) : (
                          userReports.map((r, i) => (
                              <div key={r.id} className="card-v18" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                                 <div className="v-stack" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                                    <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}>{r.title}</h4>
                                    <p style={{ color: 'var(--text-dim)', fontSize: '12px' }}>LOGGED: {new Date(r.timestamp).toLocaleDateString()} | STATUS: {r.status}</p>
                                 </div>
                                 <button 
                                    onClick={() => {
                                       if(window.confirm("PURGE_PROTOCOL: Are you sure you wish to delete this intelligence log permanently?")) {
                                          onDeleteReport && onDeleteReport(r.id);
                                       }
                                    }}
                                    className="action-btn-v14 danger" 
                                    style={{ border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', height: 'fit-content', whiteSpace: 'nowrap' }}
                                 >PURGE_LOG</button>
                              </div>
                          ))
                        )}

                     </div>
                  </section>

                  <section className="activity-sec-v10">
                     <div className="sec-header-v10">
                        <Bell size={12} /> LATEST HUB COMMENTS <div className="h-line"></div>
                     </div>
                     <div className="v-stack" style={{ gap: '16px' }}>
                        {[
                          { text: 'Security sync performed on Intel #1042.', ref: 'LOG_#429' },
                          { text: 'Resolved power grid failure log for Zone 4.', ref: 'LOG_#512' }
                        ].map((comment, i) => (
                          <div key={i} className="comment-card-v10" style={{ padding: '24px' }}>
                             <p style={{ fontSize: '15px', marginBottom: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>"{comment.text}"</p>
                             <div className="flex-v6" style={{ justifyContent: 'flex-start', gap: '8px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: '700' }}>
                                <FileText size={12} /> REFERENCE: {comment.ref}
                             </div>
                          </div>
                        ))}
                     </div>
                  </section>
               </div>
            </div>
          )}
          {isMobile && <SidePanel reports={reports} topReports={topReports} />}
        </div>
      </main>

      {/* 📊 RIGHT SIDEBAR (DESKTOP ONLY) */}
      {!isMobile && (
        <aside className="side-info-v7" style={{ width: '400px' }}>
          <SidePanel reports={reports} topReports={topReports} />
        </aside>
      )}

      <motion.div 
        whileTap={isMobile ? { scale: 0.96 } : {}}
        className="fab-v7" 
        onClick={() => setIsFormOpen(true)}
      >
        <Plus size={28} />
      </motion.div>

      {isFormOpen && (
        <div className="modal-overlay-v9 anim-fade-in" onClick={() => subState === 'idle' && setIsFormOpen(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="modal-glass-v9" 
            onClick={e => e.stopPropagation()}
          >
            <div className="v-stack" style={{ alignItems: 'flex-start', marginBottom: '32px', gap: '8px' }}>
               <div className="flex-v6" style={{ width: '100%', justifyContent: 'space-between' }}>
                  <h2 className="h-title" style={{ fontSize: '24px' }}>File New Intel</h2>
                  <div style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <Lock size={12} /> SECURE_TUNNEL: ACTIVE
                  </div>
               </div>
               <p className="h-sub">Your identity remains completely anonymous within the hub.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="v-stack" style={{ gap: '4px', alignItems: 'stretch' }}>
                <input className="input-v9" name="title" placeholder="INTEL SUBJECT" required disabled={subState !== 'idle'} />
                <select className="input-v9 select-v9" name="category" disabled={subState !== 'idle'}>
                  {CATEGORIES.map(c => <option key={c}>{c.toUpperCase()}</option>)}
                </select>
                <textarea className="input-v9" name="content" placeholder="DESCRIBE THE INTEL IN DETAIL..." rows="5" required disabled={subState !== 'idle'}></textarea>
                
                <button type="submit" className="btn-gradient-v9" disabled={subState !== 'idle'}>
                  {subState === 'idle' && "Submit Report"}
                  {subState === 'loading' && <span className="flex-v6" style={{gap: '12px'}}><Loader2 className="anim-spin" size={18} /> Submitting...</span>}
                  {subState === 'success' && "Intel Logged"}
                </button>

                {subState === 'success' && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} className="success-tag-v9">
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
      <footer className="footer-master" style={{marginTop: 'auto', border: 'none', background: 'none', padding: '24px 0'}}>
         <p className="footer-text" style={{fontSize: '10px', opacity: 0.5, textAlign: 'center'}}>© 2026 GABBAR | ANONYMOUS INTELLIGENCE HUB | Developed by <a href="https://www.instagram.com/__.jxvz01" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary)', fontWeight: '800', textDecoration: 'none'}}>Jxvz01</a></p>
      </footer>
    </div>
  );
});

const ReportCard = memo(({ report, onVote, role, activeVote, onAddComment, onDeleteReport, index, currUsername, currentUserEmail }) => {

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
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`card-v18 border-${report.category} ${index % 2 === 0 ? '' : 'card-alt-v18'}`}
      style={{ marginBottom: '32px' }}
    >
      <div className="v-stack" style={{ gap: '20px', alignItems: 'stretch' }}>
        <div className="flex-v6" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="v-stack" style={{ gap: '8px', alignItems: 'flex-start', flex: 1 }}>
              <div className="flex-v6" style={{ gap: '8px', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}>
                 <span className="badge-v7 category" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '10px' }}>{report.category.toUpperCase()}</span>
                 {isPriority && <span className="trigger-v18 trigger-priority"><AlertTriangle size={12} /> Priority</span>}
                 {isTrending && <span className="trigger-v18 trigger-trending"><TrendingUp size={12} /> Trending</span>}
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
           
           { (role === 'Admin' || role === 'Professor') && (
             <button className="btn-v6 secondary" style={{ padding: '8px 16px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}><CheckCircle size={14} /> VERIFY</button>
           )}

           { (role === 'Admin' || isOwner) && (
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
                    <span style={{ color: 'var(--text-dim)', opacity: 0.5 }}>· {new Date(c.time).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
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

const SystemBoot = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="boot-screen">
      <div className="boot-content">
        <h2 className="boot-label">INITIALIZING GABBAR SYSTEM</h2>
        <div className="boot-bar-container">
          <motion.div className="boot-bar" style={{ width: `${percent}%` }} />
        </div>
        <div className="boot-stats">
          <span style={{color: 'var(--accent-emerald)'}}>SECURE_LINK: ACTIVE</span>
          <span style={{color: 'var(--accent-purple)'}}>ENCRYPTION: 4096-BIT</span>
          <span style={{color: 'var(--warning)'}}>TRACERS: DISABLED</span>
        </div>
        <span className="percent-v6">{percent}%</span>
      </div>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('landing');
  const [isBooting, setIsBooting] = useState(false);
  const [userRole, setUserRole] = useState('Student');
  const [reports, setReports] = useState([]);
  const [nextView, setNextView] = useState(null);
  const [nextMode, setNextMode] = useState('login');
  const [userVotes, setUserVotes] = useState({});
  const [winWidth, setWinWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({ username: 'ANON_OPERATIVE' });
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [session, setSession] = useState(null);

  const [isDevRoute, setIsDevRoute] = useState(false);

  // --- INITIALIZATION ---
  useEffect(() => {
    // Detect /dev route
    if (window.location.pathname === '/dev') {
      setIsDevRoute(true);
      const isWhitelisted = session?.user?.email && DEV_WHITELIST.includes(session.user.email.toLowerCase());
      
      if (session && isWhitelisted) {
        setUserRole('Admin');
        setView('dev');
      } else if (view !== 'dev' && view !== 'dev_auth') {
        setView('dev_auth');
      }
    }
  }, [view, session]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setCurrentUserEmail(session.user.email);
        fetchProfile(session.user.id);
        setView('dash');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setCurrentUserEmail(session.user.email);
        fetchProfile(session.user.id);
        setView('dash');
      } else {
        setView('landing');
        setCurrentUserEmail('');
        setCurrentUser({ username: 'ANON_OPERATIVE' });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
    } else {
      setReports(data || []);
    }
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
    if (userRole === 'Admin' && view === 'dev') {
      fetchAllUsers();
    }
  }, [userRole, view]);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
    if (nextView) setView(nextView);
  }, [nextView]);

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

    const newReport = {
      title: sanitize(e.target.title.value),
      category: e.target.category.value,
      content: sanitize(e.target.content.value),
      user_id: session.user.id,
      author_email: session.user.email,
      author_name: currentUser.username,
      upvotes: 0,
      status: 'Pending',
      timestamp: new Date().toISOString(),
      comments: []
    };

    const { error } = await supabase
      .from('reports')
      .insert([newReport]);
    
    if (error) console.error('Error adding report:', error);
  }, [userRole, currentUser.username]);

  const handleVote = useCallback(async (reportId, type) => {
    // For simplicity, we'll just update the upvotes count.
    // In a production app, you'd want a separate votes table to prevent double voting.
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    const currentVote = userVotes[reportId] || 0;
    let delta = 0;
    if (type === 1) delta = (currentVote === 1) ? -1 : (currentVote === -1 ? 2 : 1);
    else if (type === -1) delta = (currentVote === -1) ? 1 : (currentVote === 1 ? -2 : -1);

    const { error } = await supabase
      .from('reports')
      .update({ upvotes: report.upvotes + delta })
      .eq('id', reportId);

    if (!error) {
      setUserVotes(prev => ({ ...prev, [reportId]: (currentVote === type ? 0 : type) }));
    }
  }, [reports, userVotes]);

  const handleAddComment = useCallback(async (reportId, text, user) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    const newComment = { id: Date.now().toString(), user, text: sanitize(text), time: Date.now() };
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
    if (error) alert("GOOGLE_AUTH_ERROR: " + error.message);
  }, []);

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
      if ((window.location.pathname === '/dev' || isMaster) && (DEV_WHITELIST.includes(email.toLowerCase()) || email.endsWith('@vvce.ac.in'))) {
         if (DEV_WHITELIST.includes(email.toLowerCase())) {
            setUserRole('Admin');
            setView('dev');
            // Log bypass if no data.user
            if (!data?.user) console.warn("ROOT_OVERRIDE: Access granted via Master Key bypass.");
         }
      }
      return { ok: true };
    }

    return { ok: true };
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('landing');
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
        <>
          {view === 'landing' && <LandingPage onJoin={startBoot} />}
          {view === 'auth' && <AuthPage initialMode={nextMode} onAuthSuccess={handleAuth} onGoogleAuth={handleGoogleAuth} onBack={() => setView('landing')} />}
          {view === 'dash' && (
            <Dashboard 
              reports={reports} 
              role={userRole} 
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
            />

          )}
          {view === 'dev_auth' && <DevAuthPage onAuthSuccess={handleAuth} onBack={() => { window.history.pushState({}, '', '/'); setView('landing'); setIsDevRoute(false); }} />}
          {view === 'dev' && (
            <DevPanel 
              reports={reports} 
              users={registeredUsers} 
              onDelete={handleDeleteReport} 
              onStatusChange={handleStatusChange}
              onSendNotification={handleSendNotification}
              onUpdateBanStatus={handleUpdateBanStatus}
              onBack={() => { setView('dash'); }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
