import React, { useState, useEffect } from 'react';

export const SystemBoot = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400); // Easing delay for completion transition
          return 100;
        }
        // Increment progress smoothly and quickly for a snappy feel
        return p + Math.floor(Math.random() * 8) + 5;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#050505',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono), monospace',
      color: '#ffffff'
    }}>
      <style>{`
        @keyframes spin-dashed {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-core {
          0%, 100% { transform: scale(0.85); opacity: 0.35; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .minimal-dashed-ring {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 1px dashed rgba(255, 255, 255, 0.12);
          border-top-color: #ffffff;
          animation: spin-dashed 1.1s linear infinite;
        }
        .minimal-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
          animation: pulse-core 1.6s ease-in-out infinite;
        }
      `}</style>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="minimal-dashed-ring"></div>
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="minimal-pulse-dot"></div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '4px', textTransform: 'uppercase' }}>GABBAR</span>
          <span style={{ fontSize: '8px', color: '#52525b', letterSpacing: '1px' }}>INITIALIZING NODE // {progress}%</span>
        </div>
      </div>
    </div>
  );
};
