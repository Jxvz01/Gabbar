import React from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';

export const AuthForm = ({ authMode, email, setEmail, password, setPassword, isAdmin, setIsAdmin, onSubmit, loading }) => (
  <form className="auth-f" onSubmit={onSubmit} style={{ gap: '24px' }}>
    <div className="input-group-v4">
      <label className="label-v4" style={{ color: 'var(--text-dim)', fontWeight: '800' }}>IDENTITY_UPLINK (EMAIL)</label>
      <div style={{ position: 'relative' }}>
        <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.6 }} />
        <input
          className="input-v3"
          type="email"
          placeholder="yourname@college.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ paddingLeft: '48px', borderRadius: '12px' }}
        />
      </div>
    </div>
    <div className="input-group-v4">
      <label className="label-v4" style={{ color: 'var(--text-dim)', fontWeight: '800' }}>ACCESS_CIPHER (PASSWORD)</label>
      <div style={{ position: 'relative' }}>
        <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.6 }} />
        <input
          className="input-v3"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ paddingLeft: '48px', borderRadius: '12px' }}
        />
      </div>
    </div>

    {authMode === 'signup' && (
      <div className="flex-v6" style={{ justifyContent: 'flex-start', gap: '12px', marginTop: '4px' }}>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
          id="admin-check"
          style={{ width: '16px', height: '16px', borderRadius: '4px', accentColor: 'var(--primary)' }}
        />
        <label htmlFor="admin-check" style={{ fontSize: '11px', fontWeight: '800', cursor: 'pointer', color: 'var(--text-secondary)' }}>REQUEST_ADMIN_ACCESS</label>
      </div>
    )}

    <button type="submit" className="btn-premium level-1" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
      {loading ? 'TRANSMITTING...' : (authMode === 'login' ? 'ESTABLISH_UPLINK' : 'INITIALIZE_IDENTITY')}
    </button>
  </form>
);

