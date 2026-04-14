import React from 'react';
import { TrendingUp, Activity, MessageCircle, Server } from 'lucide-react';

export const SidePanel = ({ reports, topReports }) => (
  <div className="v-stack" style={{ gap: '40px', alignItems: 'stretch' }}>
    <section>
      <div className="flex-v6" style={{ justifyContent: 'flex-start', marginBottom: '20px', gap: '10px', color: 'var(--primary)' }}>
        <TrendingUp size={20} strokeWidth={2.5} />
        <h3 style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-main)', letterSpacing: '1px' }}>TRENDING_INTEL</h3>
      </div>
      <div className="v-stack" style={{ gap: '16px' }}>
        {topReports.map(r => (
          <div key={r.id} className="bento-item" style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }}>
            <div className="flashlight-glow" style={{ opacity: 0.2 }}></div>
            <div className="badge-v7" style={{ fontSize: '8px', marginBottom: '10px', background: 'rgba(6, 182, 212, 0.1)', color: 'var(--primary)', border: 'none' }}>{r.category.toUpperCase()}</div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px', color: '#fff', lineHeight: '1.4' }}>{r.title}</h4>
            <div className="flex-v6" style={{ justifyContent: 'flex-start', gap: '8px', opacity: 0.5, fontSize: '11px', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
              <Activity size={12} /> {r.upvotes} SIGNALS
            </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <div className="flex-v6" style={{ justifyContent: 'flex-start', marginBottom: '20px', gap: '10px', color: 'var(--accent-purple)' }}>
        <Server size={20} strokeWidth={2.5} />
        <h3 style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-main)', letterSpacing: '1px' }}>HUB_STATUS</h3>
      </div>
      <div className="bento-item" style={{ padding: '24px', borderRadius: '16px', fontSize: '12px', lineHeight: '1.8', background: 'rgba(129, 140, 248, 0.05)', border: '1px solid rgba(129, 140, 248, 0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: 'var(--text-dim)', fontWeight: '700' }}>NODE:</span>
          <span style={{ color: 'var(--primary)', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>#G9-22</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-dim)', fontWeight: '700' }}>PROTOCOL:</span>
          <span style={{ color: 'var(--accent-emerald)', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>OPTIMAL</span>
        </div>
      </div>
    </section>
  </div>
);

