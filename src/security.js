import xss from 'xss';
import bcrypt from 'bcryptjs';

const ALLOWED_DOMAIN = 'vvce.ac.in';
export const DEV_WHITELIST = ['thejxxuu@gmail.com', 'jeevanh259@gmail.com'];

// --- V17 SECURITY SENTINEL ---
// Multi-layered security protocols for the GABBAR Hub

/**
 * Sanitizes input string to prevent XSS attacks within the hub.
 * @param {string} input - The raw input text.
 * @returns {string} - The sanitized text with all HTML stripped.
 */
export const sanitize = (input) => {
  if (typeof input !== 'string') return input;
  return xss(input, {
    whiteList: {}, // No HTML allowed in hub logs
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script']
  });
};

/**
 * Validates if the provided email belongs to the permitted campus domain.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if email is valid or in developer whitelist.
 */
export const isValidCollegeEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const lower = email.toLowerCase();
  return lower.endsWith(`@${ALLOWED_DOMAIN}`) || DEV_WHITELIST.includes(lower);
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

/**
 * Enforces rate limiting on repetitive operative actions.
 * @param {string} userId - Unique identifier for the user.
 * @param {string} type - Action type ('report', 'comment', 'vote').
 * @returns {object} - Status object with {ok, remaining}.
 */
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
/**
 * Verifies if the operative's role has permission for a specific HUB action.
 * @param {string} role - Operative rank (Student, Professor, Admin).
 * @param {string} action - The requested capability.
 * @returns {boolean}
 */
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
/**
 * Strips PII from intelligence logs before transmission to the public ledger.
 * @param {object} report - The raw intelligence data.
 * @param {string} username - Optional custom operative handle.
 * @returns {object} - Anonymized report safe for broadcast.
 */
export const anonymizeReport = (report, username) => {
  // Ensure NO PI (Personally Identifiable Information) ever reaches the report feed
  const { userId, ip, email, ...safeData } = report;
  return {
    ...safeData,
    anon_id: username || `OPERATIVE_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    scrubbed: true,
    institution_verified: true
  };
};

