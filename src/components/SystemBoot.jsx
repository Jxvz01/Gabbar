import React, { useState, useEffect } from 'react';

export const SystemBoot = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [bootStats] = useState({ ping: Math.floor(Math.random() * 20 + 5), load: 1.2 });

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return p + Math.floor(Math.random() * 4) + 1;
      });
    }, 60);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="boot-screen" style={{ background: '#000' }}>
      <div className="boot-content" style={{ maxWidth: '400px' }}>
        <div className="boot-label" style={{ fontSize: '10px', letterSpacing: '8px', color: 'var(--primary)', marginBottom: '40px', textAlign: 'center' }}>
          SYSTEM_AUTHENTICATION
        </div>
        <div className="boot-bar-container" style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '32px' }}>
          <div className="boot-bar" style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary-glow)' }}></div>
        </div>
        <div className="boot-stats" style={{ fontFamily: 'var(--font-mono)', opacity: 0.6, fontSize: '9px', letterSpacing: '1px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '12px' }}>
             <span>GATEWAY: CONNECTED</span>
             <span>LATENCY: {bootStats.ping}ms</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
             <span>INTEGRITY: OPTIMAL</span>
             <span>STRENGTH: {progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};


