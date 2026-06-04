import React from 'react';
import { TrendingUp, Activity, Server } from 'lucide-react';

export const SidePanel = ({ reports, topReports }) => (
  <div className="v-stack" style={{ gap: '40px', alignItems: 'stretch' }}>
    <section>
      <div className="flex-v6" style={{ justifyContent: 'flex-start', marginBottom: '20px', gap: '10px', color: '#ffffff' }}>
        <TrendingUp size={18} strokeWidth={2.5} />
        <h3 style={{ fontSize: '14px', fontWeight: '600', fontFamily: 'var(--font-main)', letterSpacing: '0' }}>Trending</h3>
      </div>
      <div className="v-stack" style={{ gap: '12px' }}>
        {topReports.map(r => (
          <div key={r.id} style={{ padding: '20px', borderRadius: '12px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.2s ease' }}>
            <div className="badge-v7" style={{ fontSize: '9px', marginBottom: '10px', background: 'rgba(255,255,255,0.04)', color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.08)' }}>{r.category.toUpperCase()}</div>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#fff', lineHeight: '1.4' }}>{r.title}</h4>
            <div className="flex-v6" style={{ justifyContent: 'flex-start', gap: '8px', opacity: 0.4, fontSize: '11px', fontWeight: '500', fontFamily: 'var(--font-mono)' }}>
              <Activity size={12} /> {r.upvotes} upvotes
            </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <div className="flex-v6" style={{ justifyContent: 'flex-start', marginBottom: '20px', gap: '10px', color: '#71717a' }}>
        <Server size={18} strokeWidth={2.5} />
        <h3 style={{ fontSize: '14px', fontWeight: '600', fontFamily: 'var(--font-main)', letterSpacing: '0' }}>Status</h3>
      </div>
      <div style={{ padding: '20px', borderRadius: '12px', fontSize: '12px', lineHeight: '1.8', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#52525b', fontWeight: '500' }}>System</span>
          <span style={{ color: '#22c55e', fontWeight: '600', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>Online</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#52525b', fontWeight: '500' }}>Encryption</span>
          <span style={{ color: '#22c55e', fontWeight: '600', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>Active</span>
        </div>
      </div>
    </section>
  </div>
);
