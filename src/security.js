import xss from 'xss';
import bcrypt from 'bcryptjs';

// --- V17 SECURITY SENTINEL ---
// Multi-layered security protocols for the GABBAR Hub

export const sanitize = (input) => {
  if (typeof input !== 'string') return input;
  return xss(input, {
    whiteList: {}, // No HTML allowed in hub logs
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script']
  });
};

export const hashCredential = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const verifyCredential = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

// --- RATE LIMITING PROTOCOL ---
const submissionHistory = new Map();

export const checkRateLimit = (userId, type = 'report') => {
  const now = Date.now();
  const userData = submissionHistory.get(userId) || {};
  const lastTime = userData[type] || 0;
  
  const COOLDOWNS = {
    'report': 60000,   // 1 report per minute
    'comment': 10000,  // 1 comment per 10s
    'vote': 2000       // 1 vote action per 2s
  };

  if (now - lastTime < COOLDOWNS[type]) {
    return { ok: false, remaining: Math.ceil((COOLDOWNS[type] - (now - lastTime)) / 1000) };
  }

  userData[type] = now;
  submissionHistory.set(userId, userData);
  return { ok: true };
};

// --- RBAC ACCESS CONTROL ---
export const canPerformAction = (role, action) => {
  const PERMISSIONS = {
    'Admin': ['view_all', 'manage_status', 'dismiss_report', 'view_admin_dash'],
    'Professor': ['view_all', 'comment_verified'],
    'Student': ['submit_report', 'upvote', 'comment_anon']
  };

  if (role === 'Admin') return true; 
  return PERMISSIONS[role]?.includes(action) || false;
};

// --- DATA PRIVACY LAYER ---
export const anonymizeReport = (report) => {
  // Ensure NO PI (Personally Identifiable Information) ever reaches the report feed
  const { userId, ip, email, ...safeData } = report;
  return {
    ...safeData,
    anon_id: `OPERATIVE_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    scrubbed: true,
    institution_verified: true
  };
};
