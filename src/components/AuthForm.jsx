import React from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';

export const AuthForm = ({ authMode, email, setEmail, password, setPassword, isAdmin, setIsAdmin, onSubmit, loading }) => (
  <form className="auth-f" onSubmit={onSubmit}>
    <div className="input-group-v4">
      <label className="label-v4">IDENTITY_UPLINK (EMAIL)</label>
      <div style={{ position: 'relative' }}>
        <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
        <input
          className="input-v3"
          type="email"
          placeholder="yourname@vvce.ac.in"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ paddingLeft: '48px' }}
        />
      </div>
    </div>
    <div className="input-group-v4">
      <label className="label-v4">ACCESS_CIPHER (PASSWORD)</label>
      <div style={{ position: 'relative' }}>
        <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
        <input
          className="input-v3"
          type="password"
          placeholder="Min. 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ paddingLeft: '48px' }}
        />
      </div>
    </div>

    {authMode === 'signup' && (
      <div className="flex-v6" style={{ justifyContent: 'flex-start', gap: '12px', marginTop: '8px' }}>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
          id="admin-check"
          style={{ accentColor: 'var(--primary)' }}
        />
        <label htmlFor="admin-check" style={{ fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}>REQUEST_ADMIN_ACCESS</label>
      </div>
    )}

    <button type="submit" className="btn-main primary" style={{ marginTop: '12px' }} disabled={loading}>
      {loading ? 'TRANSMITTING...' : (authMode === 'login' ? 'ESTABLISH_UPLINK' : 'INITIALIZE_IDENTITY')}
    </button>
  </form>
);
