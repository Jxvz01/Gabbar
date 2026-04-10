import React from 'react';
import { TrendingUp, Activity, MessageCircle } from 'lucide-react';

export const SidePanel = ({ reports, topReports }) => (
  <div className="v-stack" style={{ gap: '32px', alignItems: 'stretch' }}>
    <section>
      <div className="flex-v6" style={{ justifyContent: 'flex-start', marginBottom: '24px', gap: '12px', color: 'var(--primary)' }}>
        <TrendingUp size={18} />
        <h3 className="h-title" style={{ fontSize: '18px' }}>Trending Intel</h3>
      </div>
      <div className="v-stack" style={{ gap: '12px' }}>
        {topReports.map(r => (
          <div key={r.id} className="feed-card-v7" style={{ padding: '20px', margin: 0 }}>
            <div className="badge-v7 category" style={{ fontSize: '8px', marginBottom: '8px' }}>{r.category.toUpperCase()}</div>
            <h4 style={{ fontSize: '14px', marginBottom: '4px', color: '#fff' }}>{r.title}</h4>
            <div className="flex-v6" style={{ justifyContent: 'flex-start', gap: '8px', opacity: 0.6, fontSize: '11px' }}>
              <Activity size={12} /> {r.upvotes} Signals
            </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <div className="flex-v6" style={{ justifyContent: 'flex-start', marginBottom: '24px', gap: '12px', color: 'var(--accent-purple)' }}>
        <MessageCircle size={18} />
        <h3 className="h-title" style={{ fontSize: '18px' }}>Hub Activity</h3>
      </div>
      <div className="glass-v7" style={{ padding: '24px', borderRadius: '20px', fontSize: '12px', lineHeight: '1.6', color: 'var(--text-dim)' }}>
        <p>Operational node <span style={{ color: 'var(--primary)' }}>#G9-22</span> active.</p>
        <p style={{ marginTop: '12px' }}>Encryption layer: <span style={{ color: 'var(--accent-emerald)' }}>OPTIMAL</span></p>
      </div>
    </section>
  </div>
);
