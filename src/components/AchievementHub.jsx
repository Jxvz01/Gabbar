import React from 'react';
import { Award, Zap, Shield, FileText, CheckCircle, Target } from 'lucide-react';

export const AchievementHub = ({ userReports, impactScore }) => {
  const achievements = [
    { id: 'rookie', name: 'First Contact', criteria: 'Initialize 1 system log', icon: <FileText size={18} />, active: userReports.length >= 1 },
    { id: 'vox', name: 'Vox Populi', criteria: 'Reach 100 Impact Score', icon: <Zap size={18} />, active: impactScore >= 100 },
    { id: 'sentinel', name: 'Campus Sentinel', criteria: 'Resolve 3 critical breaches', icon: <Shield size={18} />, active: userReports.filter(r => r.status === 'Resolved').length >= 3 },
    { id: 'veteran', name: 'Elite Operative', criteria: '10 successful intel logs', icon: <Award size={18} />, active: userReports.length >= 10 },
  ];

  return (
    <div className="badge-grid-v31" style={{ gap: '16px' }}>
      {achievements.map((badge) => (
        <div key={badge.id} className={`achievement-card-v31 ${badge.active ? 'unlocked' : 'locked'}`} style={{ border: '1px solid var(--glass-border)', borderRadius: '16px' }}>
          <div className="badge-icon-v31" style={{ width: '40px', height: '40px', borderRadius: '10px' }}>
            {badge.active ? badge.icon : <Target size={18} opacity={0.2} />}
          </div>
          <span className="badge-name-v31" style={{ fontSize: '10px', fontWeight: '800' }}>{badge.name}</span>
          <p className="badge-criteria-v31" style={{ fontSize: '9px', opacity: 0.6 }}>{badge.criteria}</p>
          {badge.active && <div className="badge-status-glow-v31" style={{ opacity: 0.1 }}></div>}
        </div>
      ))}
    </div>
  );
};

