import React from 'react';
import { Award, Zap, Shield, FileText, CheckCircle } from 'lucide-react';

export const AchievementHub = ({ userReports, impactScore }) => {
  const achievements = [
    { id: 'rookie', name: 'First Contact', criteria: 'Log 1 intel report', icon: <FileText size={20} />, active: userReports.length >= 1 },
    { id: 'vox', name: 'Vox Populi', criteria: 'Reach 100 Impact Score', icon: <Zap size={20} />, active: impactScore >= 100 },
    { id: 'sentinel', name: 'Campus Sentinel', criteria: 'Resolve 3 critical issues', icon: <Shield size={20} />, active: userReports.filter(r => r.status === 'Resolved').length >= 3 },
    { id: 'veteran', name: 'Elite Operative', criteria: 'Log 10 reports', icon: <Award size={20} />, active: userReports.length >= 10 },
  ];

  return (
    <div className="badge-grid-v31">
      {achievements.map((badge) => (
        <div key={badge.id} className={`achievement-card-v31 ${badge.active ? 'unlocked' : 'locked'}`}>
          <div className="badge-icon-v31">
            {badge.active ? badge.icon : <Award size={20} opacity={0.3} />}
          </div>
          <span className="badge-name-v31">{badge.name}</span>
          <p className="badge-criteria-v31">{badge.criteria}</p>
          {badge.active && <div className="badge-status-glow-v31"></div>}
        </div>
      ))}
    </div>
  );
};
