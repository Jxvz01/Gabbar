import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// --- CONSTANTS ---
const CATEGORIES = ['Facilities', 'Harassment', 'Academics', 'Safety', 'Suggestions', 'Other'];
const STATUSES = ['Under Review', 'Resolved', 'Pending'];

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
         <p className="footer-text">© 2024 GABBAR | ANONYMOUS INTELLIGENCE HUB</p>
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

const AuthPage = ({ initialMode = 'login', onAuthSuccess, onBack }) => {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState('Student');
  
  return (
    <div className="auth-master page-transition">
      <div className="auth-box glass-v3 anim-slide-up">
        <button className="btn-retreat-v3" onClick={onBack}>← RETURN TO PERIPHERY</button>
        <h2 className="auth-h2">{mode === 'login' ? 'LOGIN' : 'SIGN UP'} TO HUB</h2>
        <p className="auth-p" style={{color: 'var(--accent-emerald)'}}>Establishing secure comm-link...</p>
        
        <form onSubmit={(e) => {e.preventDefault(); onAuthSuccess(role);}} className="auth-f">
          <div className="input-group-v4">
            <label className="label-v4" style={{color: 'var(--accent-purple)', fontWeight: '800'}}>ACCESS ROLE</label>
            <select className="select-v4" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Student">STUDENT</option>
              <option value="Professor">PROFESSOR</option>
              <option value="Admin">ADMINISTRATOR</option>
            </select>
          </div>

          <input className="input-v3" type="email" placeholder="CAMPUS EMAIL" required />
          <input className="input-v3" type="password" placeholder="ENCRYPTION KEY" defaultValue="pass123" required />
          
          {mode === 'signup' && (
            <input className="input-v3" type="text" placeholder="CAMPUS ID / SERIAL" required />
          )}

          <button type="submit" className="btn-main primary full hover-glow">
            {mode === 'login' ? 'INITIALIZE CONNECTION' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="auth-toggle-v4">
          {mode === 'login' ? (
            <>
              <p>New operative? <span onClick={() => setMode('signup')}>Request Access</span></p>
              <p className="forgot-p" onClick={() => alert('INTELLIGENCE RECOVERY: Contact System Admin for key reset.')}>Forgot encryption key?</p>
            </>
          ) : (
            <p>Already registered? <span onClick={() => setMode('login')}>Authenticate</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ reports, role, onLogout, onAddReport, onVote }) => {
  const [nav, setNav] = useState('Feed');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filtered = reports.filter(r => activeCategory === 'All' || r.category === activeCategory);

  // ROLE-BASED FEATURES
  const canDelete = role === 'Admin' || role === 'Professor';
  const canVerify = role === 'Admin' || role === 'Professor';

  return (
    <div className="dash-master page-transition">
      <div className="section-grid"></div>
      {/* Sidebar Navigation */}
      <aside className="side-nav glass-v3 anim-slide-right">
        <div className="logo-v3" onClick={onLogout}>G</div>
        <div className="role-badge-v4" style={{border: '1px solid var(--accent-purple)', color: 'var(--accent-purple)'}}>{role.toUpperCase()}</div>
        <nav className="nav-col">
          {['Feed', 'Categories', 'Analytic Hub'].map(id => (
            <button key={id} className={`nav-link-v3 ${nav === id ? 'active' : ''}`} onClick={() => setNav(id)}>
              <span className="n-label">{id.toUpperCase()}</span>
            </button>
          ))}
          {role === 'Admin' && (
            <button className={`nav-link-v3 ${nav === 'Management' ? 'active' : ''}`} onClick={() => setNav('Management')}>
              <span className="n-label">SYSTEM OPS</span>
            </button>
          )}
        </nav>
        <button className="logout-v3" onClick={onLogout}>LOGOUT</button>
      </aside>

      {/* Activity Feed */}
      <main className="main-feed anim-fade-in">
        <header className="feed-header-v3">
          <div className="fh-top">
             <h1>{nav.toUpperCase()}</h1>
             <div className="fh-status"><span className="dot pulse" style={{background: 'var(--accent-emerald)'}}></span> HUB: ONLINE</div>
          </div>
          <p className="fh-sub">{role} Intelligence Portal. Secure and encrypted.</p>
          <div className="header-divider-v4" style={{background: 'linear-gradient(90deg, var(--accent-purple), transparent)'}}></div>
        </header>

        {nav === 'Feed' && (
          <div className="reports-list-container">
            <div className="feed-controls">
               <PulseVisualizer />
               <div className="feed-meta">BUFFERING: 100% | ENCRYPTION: active</div>
            </div>
            <div className="reports-grid-v4">
              {filtered.map(report => (
                <ReportCard key={report.id} report={report} onVote={onVote} role={role} />
              ))}
            </div>
          </div>
        )}

        {nav === 'Analytic Hub' && (
          <div className="analytic-view anim-fade-in">
             <div className="graph-header">
                <h2>TOPOGRAPHIC INTELLIGENCE MAP</h2>
                <p>Visualization of reported incidents across campus vectors.</p>
             </div>
             <div className="system-map-v4 glass-v3">
                <div className="map-overlay"></div>
                <div className="map-dot d1"></div>
                <div className="map-dot d2"></div>
                <div className="map-dot d3"></div>
                <div className="map-grid-v4"></div>
             </div>
             <div className="stat-grid-v4">
                <div className="stat-card-v4"><h3>CORE VECTORS</h3><p>6 Active</p></div>
                <div className="stat-card-v4"><h3>INTEL DENSITY</h3><p>Moderate</p></div>
             </div>
          </div>
        )}

        {nav === 'Management' && role === 'Admin' && (
          <div className="admin-view anim-slide-up">
            <h2>SYSTEM CONFIGURATION</h2>
            <div className="stat-grid-v4">
               <div className="stat-card-v4"><h3>ACTIVE SESSIONS</h3><p>1,242</p></div>
               <div className="stat-card-v4"><h3>NETWORK UPTIME</h3><p>99.9%</p></div>
            </div>
          </div>
        )}

        {nav === 'Categories' && (
          <div className="category-view anim-slide-up">
            <h2>FILTER BY SECTOR</h2>
            <div className="cat-grid">
               {['All', ...CATEGORIES].map(c => (
                 <button key={c} className={`cat-btn glass-v3 ${activeCategory === c ? 'active' : ''}`} onClick={() => setActiveCategory(c)}>{c}</button>
               ))}
            </div>
          </div>
        )}
      </main>

      {/* Stats Panel */}
      <aside className="stats-panel glass-v3 anim-slide-left">
        <div className="stat-sec">
          <div className="sec-header">
             <h3>UPLINK STATUS</h3>
             <span className="live-tag pulse">LIVE</span>
          </div>
          <div className="stat-card-v3 primary-glow">
             <span className="sc-val">{reports.length}</span>
             <span className="sc-lab">TOTAL INTELLIGENCE RECAPTURED</span>
          </div>
        </div>

        <div className="stat-sec">
          <div className="sec-header">
             <h3>SYSTEM LOGS</h3>
          </div>
          <SystemTerminal />
        </div>
        
        <div className="stat-sec">
          <div className="sec-header">
             <h3>TRENDING INCIDENTS</h3>
          </div>
          {reports.slice(0, 3).map(r => (
            <div key={r.id} className="trend-item-v3 hover-glow">
              <span className="ti-rank">#{r.upvotes}</span>
              <p>{r.title}</p>
              <div className="ti-bar" style={{ width: `${(r.upvotes / 200) * 100}%` }}></div>
            </div>
          ))}
        </div>
      </aside>

      {/* Report FAB */}
      <button className="fab-v3 hover-glow" onClick={() => setIsFormOpen(true)}>+ NEW REPORT</button>

      {/* Report Modal */}
      {isFormOpen && (
        <div className="modal-overlay anim-fade-in" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content glass-v3 anim-slide-up" onClick={e => e.stopPropagation()}>
            <h2>FILE NEW INTEL</h2>
            <form onSubmit={(e) => {onAddReport(e); setIsFormOpen(false);}}>
              <input className="input-v3" name="title" placeholder="INTEL SUBJECT" required />
              <select className="select-v3" name="category">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <textarea className="textarea-v3" name="content" placeholder="DESCRIBE THE ISSUE IN DETAIL..." rows="6" required></textarea>
              <button type="submit" className="btn-main primary full hover-glow">SUBMIT TO HUB</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ReportCard = ({ report, onVote, role }) => (
  <div className="report-c glass-v3 hover-lift anim-fade-in">
    <div className="card-corner tl"></div>
    <div className="card-corner tr"></div>
    <div className="card-corner bl"></div>
    <div className="card-corner br"></div>
    <div className="rc-head">
       <span className="rc-tag">{report.category}</span>
       <div className={`rc-status ${report.status.replace(' ', '-').toLowerCase()}`}>
          <span className="dot"></span> {report.status.toUpperCase()}
       </div>
    </div>
    <h3 className="rc-title">{report.title}</h3>
    <p className="rc-body">{report.content}</p>
    <div className="rc-foot">
       <div className="rc-votes glass-v3">
          <button onClick={() => onVote(report.id, 1)}>▲</button>
          <span>{report.upvotes}</span>
          <button onClick={() => onVote(report.id, -1)}>▼</button>
       </div>
       <div className="rc-actions-v4">
          { (role === 'Admin' || role === 'Professor') && <button className="btn-verify-v4">VERIFY</button> }
          <span className="rc-time">{new Date(report.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
       </div>
    </div>
  </div>
);

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
      <div className="noise"></div>
      <div className="boot-content">
        <h2 className="boot-label">INITIALIZING GABBAR SYSTEM...</h2>
        <div className="boot-bar-container">
          <motion.div className="boot-bar multi-color" style={{ width: `${percent}%` }} />
        </div>
        <div className="boot-stats">
          <span style={{color: 'var(--accent-emerald)'}}>SECURE_LINK: ACTIVE</span>
          <span style={{color: 'var(--accent-purple)'}}>ENCRYPTION: 4096-BIT</span>
          <span style={{color: 'var(--warning)'}}>TRACERS: DISABLED</span>
          <span className="percent-v6">{percent}%</span>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('landing');
  const [isBooting, setIsBooting] = useState(false);
  const [userRole, setUserRole] = useState('Student');
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('gabbar_final_v14');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Suspicious drone at Night', content: 'Observed near Wing C. Security notified.', category: 'Safety', upvotes: 121, status: 'Under Review', timestamp: Date.now() - 3600000 },
      { id: '2', title: 'Library AC Failure', content: 'Zone 4 is non-functional.', category: 'Facilities', upvotes: 45, status: 'Pending', timestamp: Date.now() - 7200000 }
    ];
  });

  const [nextView, setNextView] = useState(null);

  const [nextMode, setNextMode] = useState('login');

  useEffect(() => { localStorage.setItem('gabbar_final_v14', JSON.stringify(reports)); }, [reports]);

  const addReport = (e) => {
    e.preventDefault();
    const newReport = { id: Date.now().toString(), title: e.target.title.value, category: e.target.category.value, content: e.target.content.value, upvotes: 0, status: 'Pending', timestamp: Date.now() };
    setReports([newReport, ...reports]);
  };

  const startBoot = (target, mode = 'login') => {
    setNextView(target);
    setNextMode(mode);
    setIsBooting(true);
  };

  const handleBootComplete = () => {
    setIsBooting(false);
    if (nextView) setView(nextView);
  };

  const handleAuth = (role) => {
    setUserRole(role);
    setView('dash');
  };

  return (
    <div className="app-v3 dark-mode">
      {isBooting && <SystemBoot onComplete={handleBootComplete} />}
      {!isBooting && (
        <>
          {view === 'landing' && <LandingPage onJoin={startBoot} />}
          {view === 'auth' && <AuthPage initialMode={nextMode} onAuthSuccess={handleAuth} onBack={() => setView('landing')} />}
          {view === 'dash' && <Dashboard reports={reports} role={userRole} onLogout={() => setView('landing')} onVote={(id, amt) => setReports(r => r.map(it => it.id === id ? {...it, upvotes: it.upvotes + amt} : it))} onAddReport={addReport} />}
        </>
      )}
    </div>
  );
};

export default App;
