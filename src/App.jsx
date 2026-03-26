import React, { useState, useEffect, useCallback, useMemo, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Clock, BarChart2, Bell, User, Plus, LogOut, 
  Radio, Shield, Activity, FileText, CheckCircle, ChevronUp, ChevronDown, Lock, Loader2, Edit3, ArrowRight, Zap, MessageCircle, Send, AlertTriangle, Menu, X 
} from 'lucide-react';
import './index.css';
import { sanitize, checkRateLimit, canPerformAction, anonymizeReport, isValidCollegeEmail } from './security';

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
      </div>
      <div className="noise-overlay"></div>
      
      {/* 🧱 HERO SECTION (FULL SCREEN, NO CLUTTER) */}
      <section className="hero-v6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="container-v6 v-stack"
        >
          <h1 className="hero-h1-v6 glow-text">Speak Freely.<br/>Stay Anonymous.</h1>
          <p className="hero-p-v6">A secure platform for students to report issues without fear. We bridge the gap between intelligence and action with total privacy.</p>
          <div className="flex-v6">
            <motion.button 
              whileHover={{ y: -3, scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
              className="btn-v6 primary" 
              onClick={() => onJoin('auth', 'signup')}
            >
              Enter Platform
            </motion.button>
            <motion.button 
              whileHover={{ y: -3, scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
              className="btn-v6 secondary" 
              onClick={() => onJoin('auth', 'login')}
            >
              Login
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* 🧊 TRUST SECTION */}
      <section className="section-v6">
        <div className="container-v6">
          <div className="flex-v6">
            {[
              { t: '100% Anonymous', d: 'Your identity is never stored in our reporting infrastructure.' },
              { t: 'Secure & Private', d: 'End-to-end encryption for every submission and attachment.' },
              { t: 'Actionable Reports', d: 'Direct line to administration for rapid issue resolution.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 1 }}
                viewport={{ once: true }}
                className="trust-card-v6"
              >
                <div className="step-icon-v6" style={{ fontSize: '14px', letterSpacing: '2px', color: 'var(--text-dim)' }}>0{i+1}</div>
                <h3 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: '700' }}>{item.t}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', fontWeight: '300' }}>{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚙️ HOW IT WORKS (CLEAN, LINEAR FLOW) */}
      <section className="section-v6" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container-v6">
          <h2 style={{ textAlign: 'center', marginBottom: '100px', fontSize: '42px', fontWeight: '800', letterSpacing: '-0.02em' }}>The Intelligence Pathway</h2>
          <div className="flex-v6" style={{ position: 'relative' }}>
             <div className="flow-line-v6"></div>
             {[
               { t: 'Login Securely', d: 'Authenticated via Zero-Knowledge protocols.' },
               { t: 'Submit Report', d: 'Pure data transfer without metadata tracking.' },
               { t: 'Admins Review', d: 'Rapid response via our encrypted feed.' }
             ].map((step, i) => (
               <div key={i} className="step-v6">
                 <div className="step-icon-v6">{i + 1}</div>
                 <h4 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600' }}>{step.t}</h4>
                 <p style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: '1.6' }}>{step.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 🎯 FINAL CTA SECTION */}
      <section className="section-v6" style={{ paddingBottom: '200px' }}>
         <motion.div 
           initial={{ opacity: 0, y: 50, scale: 0.95 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 1.2 }}
           viewport={{ once: true }}
           className="cta-v6"
         >
            <h2 className="cta-h2-v6">Your voice matters.<br/>Stay protected.</h2>
            <button className="btn-v6 primary" onClick={() => onJoin('auth', 'signup')}>Get Started</button>
         </motion.div>
      </section>

      <footer className="footer-master">
         <p className="footer-text">© 2026 GABBAR | ANONYMOUS INTELLIGENCE HUB | Developed by <a href="https://www.instagram.com/__.jxvz01" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary)', fontWeight: '800', textDecoration: 'none'}}>Jxvz01</a></p>
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
          { label: 'Total Intel Logs', value: (reports || []).length, color: 'var(--accent-purple)' },
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

const DevPanel = memo(({ reports, users, onDelete, onStatusChange, onBack }) => (
  <div className="dev-panel-v28 page-transition" style={{ padding: '40px', background: '#030712', minHeight: '100vh' }}>
    <div className="flex-v6" style={{ justifyContent: 'space-between', marginBottom: '48px', borderBottom: '1px solid #1f2937', paddingBottom: '32px' }}>
       <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#fff' }}>/DEV_TERMINAL</h1>
       <button onClick={onBack} className="btn-v15 resolve">RETURN_TO_COMMAND</button>
    </div>

    <div className="v-stack" style={{ gap: '64px', alignItems: 'stretch' }}>
       <section>
          <h2 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)', marginBottom: '32px', letterSpacing: '2px' }}>[USER_MANIFEST]</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table-v15">
              <thead>
                 <tr>
                    <th className="admin-th-v15">OPERATIVE_EMAIL</th>
                    <th className="admin-th-v15">IDENTITY_RANK</th>
                    <th className="admin-th-v15">INTELLIGENCE_VOL</th>
                 </tr>
              </thead>
              <tbody>
                 {users.map((u, i) => (
                   <tr key={i} className="admin-row-v15">
                      <td className="admin-td-v15" style={{ color: '#fff' }}>{u.email}</td>
                      <td className="admin-td-v15"><span className="badge-v15 badge-admin">{u.role}</span></td>
                      <td className="admin-td-v15">{u.reports} LOGS</td>
                   </tr>
                 ))}
              </tbody>
            </table>
          </div>
       </section>

       <section>
          <h2 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-purple)', marginBottom: '32px', letterSpacing: '2px' }}>[INTEL_LEDGER]</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table-v15">
              <thead>
                 <tr>
                    <th className="admin-th-v15">REPORT_SUBJECT</th>
                    <th className="admin-th-v15">SECTOR</th>
                    <th className="admin-th-v15">STATUS_PROTOCOLS</th>
                    <th className="admin-th-v15">COMMANDS</th>
                 </tr>
              </thead>
              <tbody>
                 {reports.map((r) => (
                   <tr key={r.id} className="admin-row-v15">
                      <td className="admin-td-v15">
                         <div style={{ fontWeight: '800', color: '#fff' }}>{r.title}</div>
                         <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '4px' }}>LOG_{r.id}</div>
                      </td>
                      <td className="admin-td-v15"><span className={`badge-v7 border-${r.category}`}>{r.category}</span></td>
                      <td className="admin-td-v15">
                         <select 
                           value={r.status} 
                           onChange={(e) => onStatusChange(r.id, e.target.value)}
                           className="select-v4" 
                           style={{ width: '130px', background: 'transparent' }}
                         >
                            {STATUSES.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                         </select>
                      </td>
                      <td className="admin-td-v15">
                         <button onClick={() => onDelete && onDelete(r.id)} className="btn-admin-v15" style={{ color: '#ef4444' }}>DELETE_LOG</button>
                      </td>

                   </tr>
                 ))}
              </tbody>
            </table>
          </div>
       </section>
    </div>
  </div>
));

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

const AuthPage = memo(({ initialMode = 'login', onAuthSuccess, onBack }) => {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [authError, setAuthError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    
    if (!isValidCollegeEmail(email)) {
      setAuthError('Only VVCE college email IDs are allowed');
      return;
    }

    if (email.toLowerCase() === 'jeevanh259@gmail.com' && e.target.password.value !== '12@08') {
      setAuthError('INVALID_KEY: Authentication failed for dev-whitelist.');
      return;
    }
    
    onAuthSuccess(role, email);
  };

  return (
    <div className="auth-master page-transition">
      <div className="auth-box glass-v3 anim-slide-up">
        <button className="btn-retreat-v3" onClick={onBack}>← RETURN TO PERIPHERY</button>
        <h2 className="auth-h2">{mode === 'login' ? 'LOGIN' : 'SIGN UP'} TO HUB</h2>
        <p className="auth-p" style={{color: 'var(--accent-emerald)'}}>Establishing secure comm-link...</p>
        
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

          <input className="input-v3" name="password" type="password" placeholder="ENCRYPTION KEY" defaultValue="pass123" required />
          
          {mode === 'signup' && (
            <input className="input-v3" type="text" placeholder="CAMPUS ID / ROLL NO" required />
          )}

          <button type="submit" className="btn-main primary full hover-glow">
            {mode === 'login' ? 'INITIALIZE CONNECTION' : 'CREATE ACCOUNT'}
          </button>
        </form>

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

const Dashboard = memo(({ reports, role, onLogout, onVote, onAddReport, onAddComment, onStatusChange, onDeleteReport, userVotes, winWidth, currentUser, onUpdateUsername }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [subState, setSubState] = useState('idle'); // idle, loading, success
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(currentUser?.username || 'ANON_OPERATIVE');
  const isMobile = winWidth <= 1024;


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
             />
          ))}


          {activeTab === 'notifications' && (
            <div className="anim-fade-up v-stack" style={{ alignItems: 'flex-start' }}>
               {[
                 { t: 'Report Under Review', d: 'Your submission #1402 is being analyzed by school administration.', time: '2h ago' },
                 { t: 'Security Sync Complete', d: 'Encryption keys rotated. 100% anonymity maintained across all nodes.', time: '5h ago' },
                 { t: 'New Feature Action', d: 'The V7 dashboard has been initialized for your operative profile.', time: '1d ago' }
               ].map((notif, i) => (
                 <div key={i} className="feed-card-v7" style={{ width: '100%', padding: '24px' }}>
                    <div className="flex-v6" style={{ justifyContent: 'space-between', marginBottom: '8px' }}>
                       <span style={{ fontWeight: '700', fontSize: '15px' }}>{notif.t}</span>
                       <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{notif.time}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{notif.d}</p>
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
                           {(reports.filter(r => r.status === 'Resolved').length * 100) + (reports.length * 15)}
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
                       { l: 'INTEL LOGGED', v: reports.length, i: <FileText size={18} /> },
                       { l: 'HUB ACTIONS', v: '24', i: <Activity size={18} /> },
                       { l: 'RESOLVED LOGS', v: reports.filter(r => r.status === 'Resolved').length, i: <CheckCircle size={18} /> }
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
                        {(reports || []).filter(r => r.author === localStorage.getItem('gabbar_logged_in_email')).length === 0 ? (
                            <div className="id-card-v10" style={{ padding: '32px', textAlign: 'center', opacity: 0.6, width: '100%' }}>
                               <Activity size={32} style={{ marginBottom: '12px', color: 'var(--text-dim)', margin: '0 auto 12px' }}/>
                               <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--text-dim)' }}>No intelligence logs submitted by current operative profile.</p>
                            </div>
                        ) : (
                          (reports || []).filter(r => r.author === localStorage.getItem('gabbar_logged_in_email')).map((r, i) => (
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

const ReportCard = memo(({ report, onVote, role, activeVote, onAddComment, onDeleteReport, index, currUsername }) => {

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isTrending = report.upvotes > 70;
  const isPriority = report.category === 'Safety' || report.category === 'Harassment';
  const isOwner = report.author && report.author === 'currentUserEmailSimulation'; 

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
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem('gabbar_final_v15');
      return saved ? JSON.parse(saved) : [
        { id: '1', title: 'Suspicious drone at Night', content: 'Observed near Wing C. Security notified.', category: 'Safety', upvotes: 121, status: 'Under Review', timestamp: Date.now() - 3600000, comments: [{ id: 'c1', user: 'SilentGhost', text: 'Spotted this near the sports complex too.', time: Date.now() - 1200000 }] },
        { id: '2', title: 'Library AC Failure', content: 'Zone 4 is non-functional.', category: 'Facilities', upvotes: 45, status: 'Pending', timestamp: Date.now() - 7200000, comments: [] }
      ];
    } catch (e) {
      console.error("HYDRATION_ERROR: Corrupted intel recovered. Resetting...");
      return [];
    }
  });

  const [nextView, setNextView] = useState(null);
  const [nextMode, setNextMode] = useState('login');
  const [userVotes, setUserVotes] = useState({});
  const [winWidth, setWinWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gabbar_user_profile_v7');
    return saved ? JSON.parse(saved) : { username: 'ANON_OPERATIVE' };
  });

  const [registeredUsers, setRegisteredUsers] = useState([
    { email: 'admin@vvce.ac.in', role: 'Admin', reports: 0 },
    { email: 'student1@vvce.ac.in', role: 'Student', reports: 2 }
  ]);


  useEffect(() => {
    const checkPath = () => {
       if (window.location.pathname === '/dev') {
          if (userRole === 'Admin') setView('dev');
          else setView('landing');
       }
    };
    checkPath();
    window.addEventListener('popstate', checkPath);
    return () => window.removeEventListener('popstate', checkPath);
  }, [userRole]);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { localStorage.setItem('gabbar_final_v15', JSON.stringify(reports)); }, [reports]);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
    if (nextView) setView(nextView);
  }, [nextView]);

  const handleStatusChange = useCallback((id, newStatus) => {
    if (!canPerformAction(userRole, 'manage_status')) {
      alert("UNAUTHORIZED: Elevating credentials required for status management.");
      return;
    }
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  }, [userRole]);

  const handleDeleteReport = useCallback((id) => {
    if (!canPerformAction(userRole, 'delete_report')) {
       // Check if user is deleting their own report or is Admin
       // For now, allow if Admin or if logic is handled elsewhere.
       // Based on user requirements, let's keep it simple.
    }
    setReports(prev => prev.filter(r => r.id !== id));
  }, [userRole]);


  const handleUpdateUsername = useCallback((newUsername) => {
    setCurrentUser(prev => {
      const updated = { ...prev, username: newUsername };
      localStorage.setItem('gabbar_user_profile_v7', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleAuth = useCallback((role, email) => {
    let finalRole = role;
    if (email.toLowerCase() === 'jeevanh259@gmail.com') {
      finalRole = 'Admin'; // DEV COMMANDER OVERRIDE
    }
    setUserRole(finalRole);
    setCurrentUserEmail(email);
    localStorage.setItem('gabbar_logged_in_email', email);
    setView('dash');
  }, []);


  const handleVote = useCallback((reportId, type) => {
    const limit = checkRateLimit(`USER_${userRole}`, 'vote');
    if (!limit.ok) return; // Silent discard for rapid votes

    setUserVotes(prev => {
      const current = prev[reportId] || 0;
      let next = current;
      if (type === 1) next = (current === 1) ? 0 : 1;
      else if (type === -1) next = (current === -1) ? 0 : -1;
      return { ...prev, [reportId]: next };
    });
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        const currentVote = userVotes[reportId] || 0;
        let delta = 0;
        if (type === 1) { // Upvote
          if (currentVote === 1) delta = -1; // Unvote
          else if (currentVote === -1) delta = 2; // Change downvote to upvote
          else delta = 1; // New upvote
        } else if (type === -1) { // Downvote
          if (currentVote === -1) delta = 1; // Unvote
          else if (currentVote === 1) delta = -2; // Change upvote to downvote
          else delta = -1; // New downvote
        }
        return { ...r, upvotes: r.upvotes + delta };
      }
      return r;
    }));
  }, [userVotes, userRole]);

  const addReport = useCallback((e) => {
    e.preventDefault();
    
    if (!canPerformAction(userRole, 'submit_report')) {
      alert("UNAUTHORIZED: Your operative role lacks submission credentials.");
      return;
    }

    const limit = checkRateLimit(`USER_${userRole}`, 'report');
    if (!limit.ok) {
      alert(`SYSTEM_HALT: Rate limiting active. Wait ${limit.remaining}s.`);
      return;
    }

    const newReportRaw = {
      id: Date.now().toString(),
      title: sanitize(e.target.title.value),
      category: e.target.category.value,
      content: sanitize(e.target.content.value),
      author: currentUserEmail,
      upvotes: 0,
      status: 'Pending',
      timestamp: Date.now(),
      comments: []
    };

    setReports(prev => [anonymizeReport(newReportRaw, currentUser.username), ...prev]);
  }, [userRole, currentUser]);


  const handleAddComment = useCallback((reportId, text, user) => {
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          comments: [...(r.comments || []), { id: Date.now().toString(), user, text: sanitize(text), time: Date.now() }]
        };
      }
      return r;
    }));
  }, []);

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
          {view === 'auth' && <AuthPage initialMode={nextMode} onAuthSuccess={handleAuth} onBack={() => setView('landing')} />}
          {view === 'dash' && (
            <Dashboard 
              reports={reports} 
              role={userRole} 
              onLogout={() => setView('landing')} 
              onVote={handleVote} 
              onAddReport={addReport} 
              onAddComment={handleAddComment}
              onStatusChange={handleStatusChange}
              onDeleteReport={handleDeleteReport}
              userVotes={userVotes}
              winWidth={winWidth}
              currentUser={currentUser}
              onUpdateUsername={handleUpdateUsername}
            />

          )}
          {view === 'dev' && (
            <DevPanel 
              reports={reports} 
              users={registeredUsers} 
              onDelete={handleDeleteReport} 
              onStatusChange={handleStatusChange}
              onBack={() => setView('dash')}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
