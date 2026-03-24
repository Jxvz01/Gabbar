import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// --- CONSTANTS ---
const CATEGORIES = ['Facilities', 'Harassment', 'Academics', 'Safety', 'Suggestions', 'Other'];
const STATUSES = ['Under Review', 'Resolved', 'Pending'];

// --- COMPONENTS ---

const DataFragments = () => (
  <div className="data-fragment-container">
    {[...Array(40)].map((_, i) => (
      <motion.div 
        key={i}
        className="data-fragment"
        initial={{ y: "110vh", x: Math.random() * 100 + "%", opacity: 0 }}
        animate={{ y: "-10vh", opacity: [0, 0.5, 0] }}
        transition={{ 
          duration: Math.random() * 10 + 10, 
          repeat: Infinity, 
          delay: Math.random() * 5 
        }}
      >
        {Math.random().toString(16).slice(2, 6).toUpperCase()}
      </motion.div>
    ))}
  </div>
);

const HexMatrix = ({ color = 'var(--primary)' }) => (
  <div className="hex-matrix-v6" style={{ color }}>
    {[...Array(18)].map((_, i) => (
      <motion.span 
        key={i}
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() }}
      >
        {Math.floor(Math.random() * 16).toString(16).toUpperCase()}
      </motion.span>
    ))}
  </div>
);

const CyberGlobe = () => (
  <div className="globe-wrapper">
    <div className="globe-core"></div>
    <div className="globe-ring r1"></div>
    <div className="globe-ring r2"></div>
    <div className="globe-ring r3"></div>
    <svg className="globe-svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="none" stroke="var(--primary)" strokeWidth="0.2" strokeDasharray="1,2" />
      <path d="M50 2 L50 98 M2 50 L98 50" stroke="var(--primary)" strokeWidth="0.1" opacity="0.3" />
    </svg>
    <div className="globe-point p1"></div>
    <div className="globe-point p2"></div>
    <div className="globe-point p3"></div>
  </div>
);

const LandingPage = ({ onJoin }) => {
  const [storyIndex, setStoryIndex] = useState(0);
  const story = [
    { text: "Somewhere in the shadows of the campus...", sub: "Whispers of truth remain unheard." },
    { text: "Where the power of hierarchy silences the brave...", sub: "Fear of retaliation is real." },
    { text: "But anonymity changes everything.", sub: "A decentralized hub for collective intelligence." },
    { text: "SPEAK FREELY.", sub: "STAY ANONYMOUS." }
  ];

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStoryIndex(prev => (prev < story.length - 1 ? prev + 1 : prev));
    }, 3500); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="landing-master page-transition">
      <div className="ambient-bg"></div>
      <div 
        className="mouse-spotlight" 
        style={{ 
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.06), transparent 40%)` 
        }}
      ></div>
      
      <div className="hex-background"></div>
      <div className="circuit-lines"></div>
      <DataFragments />
      
      {/* IMMERSIVE HERO SECTION */}
      <section className="hero-section immersive-hero">
        <div className="hero-corners">
          <div className="hero-corner tl"><div className="corner-tag">UPLINK_01</div><div className="corner-val">SECURE</div></div>
          <div className="hero-corner tr"><div className="corner-tag">ENCR_V14</div><div className="corner-val">ACTIVE</div></div>
          <div className="hero-corner bl"><div className="corner-tag">LAT_MS</div><div className="corner-val">04ms</div></div>
          <div className="hero-corner br"><div className="corner-tag">NODES</div><div className="corner-val">84+</div></div>
        </div>
        <div className="central-scanline"></div>

        <div className="hero-globe-anchor">
          <CyberGlobe />
        </div>
        <div className="telemetry-sidebar left">
          <div className="tel-item"><span className="tel-label">UPLINK:</span> <span className="tel-val">STABLE</span></div>
          <div className="tel-item"><span className="tel-label">LATENCY:</span> <span className="tel-val">12ms</span></div>
          <div className="tel-item"><span className="tel-label">PACKETS:</span> <span className="tel-val">842/s</span></div>
          <div className="tel-graph"></div>
        </div>
        <div className="telemetry-sidebar right">
          <div className="tel-item"><span className="tel-label">VERSION:</span> <span className="tel-val">v4.5.12</span></div>
          <div className="tel-item"><span className="tel-label">ENCRYPTION:</span> <span className="tel-val">RSA_4096</span></div>
          <div className="tel-item"><span className="tel-label">ANONYMITY:</span> <span className="tel-val">MAX</span></div>
          <div className="tel-graph alt"></div>
        </div>

        <div className="intel-ticker">
          <div className="ticker-track">
            <span>[ INTEL_01: SUSPICIOUS DRONE DETECTED ]</span>
            <span>[ INTEL_02: FACILITY_Z4 OFFLINE ]</span>
            <span>[ INTEL_03: NEW REPORT SUBMITTED FROM WING_C ]</span>
            <span>[ INTEL_04: ENCRYPTION_SYNC COMPLETE ]</span>
            <span>[ INTEL_05: SYSTEM_OPERATIVE JOINED ]</span>
          </div>
        </div>

        <motion.div 
          className="hero-bg-zoom"
          initial={{ scale: 1.3, opacity: 0, filter: 'brightness(0.3) contrast(1.1) blur(10px)' }}
          animate={{ scale: 1.0, opacity: 1, filter: 'brightness(0.4) contrast(1.2) blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ backgroundImage: `url('/cinematic_campus_bg_1774201838558.png')` }}
        />
        <motion.div 
          className="hero-bg-zoom secondary-zoom"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{ backgroundImage: `url('/cinematic_campus_bg_1774201838558.png')`, opacity: 0.25 }}
        />
        <div className="hero-overlay-v5"></div>
        <div className="scanlines"></div>
        <div className="noise"></div>
        <div className="scanning-line"></div>
        
        <div className="hero-progress-container">
          {story.map((_, i) => (
            <div key={i} className={`progress-segment ${i <= storyIndex ? 'active' : ''}`}>
              <motion.div 
                className="progress-fill" 
                initial={{ width: 0 }}
                animate={{ width: i === storyIndex ? "100%" : (i < storyIndex ? "100%" : "0%") }}
                transition={{ duration: i === storyIndex ? 3 : 0, ease: "linear" }}
              />
            </div>
          ))}
        </div>
        
        <div className="hero-container storytelling-container">
          <AnimatePresence mode="wait">
            <motion.div 
              key={storyIndex}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)', scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="story-slide"
            >
              {storyIndex === story.length - 1 ? (
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hero-h1 final-reveal"
                >
                  {story[storyIndex].text.split("").map((char, i) => (
                    <motion.span 
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {char}
                    </motion.span>
                  ))}<br/>
                  <span className="hero-span"> {story[storyIndex].sub}</span>
                </motion.h1>
              ) : (
                <div className="story-content">
                  <h2 className="story-h2">
                    {story[storyIndex].text.split("").map((char, i) => (
                      <motion.span 
                        key={`${storyIndex}-${i}`}
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ delay: i * 0.03 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </h2>
                  <p className="story-p">{story[storyIndex].sub}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="hero-btns permanent-btns">
            <button className="btn-main primary hover-glow" onClick={() => onJoin('auth', 'login')}>ENTER COMMAND</button>
            <button className="btn-main secondary hover-glow" onClick={() => onJoin('auth', 'signup')}>ESTABLISH CONNECTION</button>
          </div>
        </div>
      </section>

      {/* SYSTEM PROTOCOLS - BENTO GRID RE-LAYOUT */}
      <section className="info-section container anim-fade-in">
        <div className="section-grid"></div>
        <div className="section-side-beam left"></div>
        <div className="section-side-beam right"></div>
        <h2 className="section-title">SYSTEM INFRASTRUCTURE</h2>
        <div className="bento-grid">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bento-item main glass-v3"
            >
               <HexMatrix color="var(--primary)" />
               <div className="card-corner tl"></div>
               <div className="card-corner tr"></div>
               <div className="card-corner bl"></div>
               <div className="card-corner br"></div>
               <div className="icon-v3">01 / AUTH</div>
               <h3>IDENTITY DECOUPLING</h3>
               <p>When you authenticate, our Zero-Knowledge architecture generates a transient session token. Your real-world identity is purged from the reporting metadata instantly. We utilize a decentralized authentication hub to ensure that no single server holds both your identity and your intel.</p>
               <div className="bento-visual auth-v">
                  <div className="visual-readout">DECRYPTING_SESSION...</div>
               </div>
            </motion.div>
           
           <div className="bento-subgrid">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bento-item sub glass-v3"
              >
                  <HexMatrix color="var(--accent-emerald)" />
                  <div className="card-corner tl"></div>
                  <div className="card-corner tr"></div>
                  <div className="card-corner bl"></div>
                  <div className="card-corner br"></div>
                  <div className="icon-v3 small" style={{color: 'var(--accent-emerald)'}}>02 / INTEL</div>
                  <h3>ENCRYPTED SUBMISSION</h3>
                  <p>Every report is treated as high-priority intelligence. Attachments are stored in isolated vaults.</p>
                  <div className="bento-visual emerald small"></div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bento-item sub glass-v3"
              >
                  <HexMatrix color="var(--accent-amber)" />
                  <div className="card-corner tl"></div>
                  <div className="card-corner tr"></div>
                  <div className="card-corner bl"></div>
                  <div className="card-corner br"></div>
                  <div className="icon-v3 small" style={{color: 'var(--accent-amber)'}}>03 / ACTION</div>
                  <h3>FEEDBACK LOOP</h3>
                  <p>Track the status of your intel through the decentralized feed in real-time.</p>
                  <div className="bento-visual amber small"></div>
              </motion.div>
           </div>

           <motion.div 
             whileHover={{ y: -5 }}
             className="bento-item accent glass-v3"
           >
              <HexMatrix color="var(--accent-purple)" />
              <div className="card-corner tl"></div>
              <div className="card-corner tr"></div>
              <div className="card-corner bl"></div>
              <div className="card-corner br"></div>
              <div className="icon-v3" style={{color: 'var(--accent-purple)'}}>04 / CORE</div>
              <h3>SYSTEM INTEGRITY</h3>
              <p>Our codebase is optimized for absolute anonymity. We don't just hide your name; we prevent the system from ever knowing it.</p>
              <div className="bento-stats-box">
                 <div className="bsb-row"><span>UPTIME</span> 99.99%</div>
                 <div className="bsb-row"><span>RESOLVED</span> 2.4k+</div>
              </div>
              <div className="bento-visual purple"></div>
           </motion.div>
        </div>
      </section>

      {/* WHY ANONYMITY MATTERS */}
      <section className="info-section container anim-fade-in">
        <div className="section-grid"></div>
        <div className="section-side-beam left"></div>
        <div className="section-side-beam right"></div>
        <div className="dual-grid-v5">
           <div className="text-box">
              <h2 className="section-title left">THE WALL OF SILENCE</h2>
              <p className="text-p">In traditional systems, the whistleblower often becomes the victim. Hierarchy creates a barrier of fear that suppresses critical institutional growth. <br/><br/><strong>GABBAR</strong> dismantles this barrier. We believe that for a campus to thrive, truth must flow upwards without the weight of retaliation.</p>
           </div>
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="info-card glass-v3 accent-border spotlight-card"
           >
              <div className="card-corner tl"></div>
              <div className="card-corner tr"></div>
              <div className="card-corner bl"></div>
              <div className="card-corner br"></div>
              <div className="shield-icon"></div>
              <h3>BUILT FOR PROTECTION</h3>
              <p>Our codebase is optimized for one thing: <strong>Absolute Anonymity.</strong> We don't just hide your name; we prevent the system from ever knowing it in the first place.</p>
           </motion.div>
        </div>
      </section>

      {/* FOR ADMINISTRATION */}
      <section className="info-section container admin-cta anim-fade-in">
        <div className="section-grid"></div>
        <div className="section-side-beam left"></div>
        <div className="section-side-beam right"></div>
        <div className="glass-v3 admin-box-v5">
           <div className="admin-content">
              <h2>COMMAND & CONTROL</h2>
              <p>For the administration, GABBAR is a precision tool. It transforms whispers into actionable data. Identify systemic failures, monitor facility health, and bridge the gap between students and leaders with transparency that builds genuine trust.</p>
              <div className="admin-stats-peek">
                 <div className="sp-item"><span>99%</span> RESOLUTION RATE</div>
                 <div className="sp-item"><span>0.0ms</span> IDENTITY LEAK</div>
              </div>
              <button className="btn-main primary hover-glow">REQUEST COMMAND ACCESS</button>
           </div>
        </div>
      </section>

      {/* GLOBAL HUD STATS */}
      <section className="info-section container anim-fade-in stats-compact">
        <div className="stats-ticker-v5">
           <div className="st-item"><span style={{color:'var(--primary)'}}>UPLINK</span> SECURE</div>
           <div className="st-item"><span style={{color:'var(--accent-purple)'}}>ENCR</span> AES_256</div>
           <div className="st-item"><span style={{color:'var(--accent-emerald)'}}>NODES</span> 142 ACTIVE</div>
           <div className="st-item"><span style={{color:'var(--warning)'}}>TRAFFIC</span> 4.2 GB/H</div>
        </div>
      </section>

      <footer className="footer-master">
         <div className="footer-line"></div>
         <p>© 2026 PROTO-GABBAR v4.5 | ENCRYPTED | SECURE</p>
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
