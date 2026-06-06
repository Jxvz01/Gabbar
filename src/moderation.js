/**
 * GABBAR CONTENT MODERATION ENGINE
 * High-performance, heuristic-based content moderation and anti-abuse protocols.
 */

// --- CONFIGURATION ---
export const TOXICITY_THRESHOLD = 60; // 0-100 scale

// --- WORD LISTS ---
const HIGH_TOXICITY_WORDS = [
  'fuck', 'shit', 'asshole', 'bitch', 'cunt', 'dick', 'pussy', 'whore', 'slut', 
  'bastard', 'retard', 'faggot', 'nigger', 'chink', 'kill', 'murder', 'rape', 'torture'
];

const MEDIUM_TOXICITY_WORDS = [
  'idiot', 'moron', 'stupid', 'dumb', 'fool', 'trash', 'scum', 'corrupt', 
  'thief', 'cheat', 'liar', 'hate', 'abuse', 'useless', 'worst', 'horrible',
  'terrible', 'pathetic', 'disgusting', 'nonsense', 'crap', 'bloody', 'jerk'
];

const LOW_TOXICITY_WORDS = [
  'bad', 'dirty', 'poor', 'slow', 'broken', 'fail', 'failing', 'leaking', 
  'mess', 'issue', 'problem', 'late', 'rude', 'unprofessional'
];

const CONSTRUCTIVE_WORDS = [
  'washroom', 'classroom', 'canteen', 'hostel', 'lab', 'library', 'bus', 
  'parking', 'water', 'food', 'light', 'fan', 'project', 'exam', 'class', 
  'assignment', 'syllabus', 'help', 'request', 'repair', 'clean', 'improve', 
  'suggestion', 'toilet', 'tap', 'elevator', 'lift', 'infrastructure', 'wifi',
  'internet', 'network', 'attendance', 'lecture', 'teaching', 'fee', 'office'
];

// --- REGEX PATTERNS ---
const PII_PATTERNS = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
  phone: /\b(?:\+?91|0)?[6-9]\d{9}\b|\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
  studentId: /\b4VV\d{2}[A-Z]{2}\d{3}\b/gi,
  address: /\b(?:flat|house|street|road|nagar|layout|apartment|building|ward)\b\s+\d+|\d+\s+\b(?:flat|house|street|road|nagar|layout|apartment|building|ward)\b/gi
};

// Targeting of individuals regex
const TARGETING_PATTERN = /\b(?:mr|mrs|ms|dr|prof|professor|lecturer|hod|dean|principal|warden|sir|madam)\.?\s+([a-zA-Z]+)/gi;

/**
 * Checks if the text contains high-toxicity offensive language or profanity.
 * @param {string} text - The input text.
 * @returns {boolean} - True if offensive language is detected.
 */
export const checkOffensiveLanguage = (text) => {
  if (!text) return false;
  const clean = text.toLowerCase();
  
  // Directly scan for high toxicity words (profanity, slurs, threats)
  return HIGH_TOXICITY_WORDS.some(word => {
    const regex = new RegExp(`\\b${word}\\w*\\b`, 'i');
    return regex.test(clean);
  });
};

/**
 * Calculates a toxicity score (0-100) based on content analysis.
 * @param {string} text - The input text.
 * @returns {number} - Toxicity score out of 100.
 */
export const calculateToxicity = (text) => {
  if (!text) return 0;
  const clean = text.toLowerCase();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0;

  let toxicWeight = 0;
  
  // 1. Accumulate weights of toxic words
  HIGH_TOXICITY_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\w*\\b`, 'gi');
    const matches = clean.match(regex);
    if (matches) toxicWeight += matches.length * 45;
  });

  MEDIUM_TOXICITY_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\w*\\b`, 'gi');
    const matches = clean.match(regex);
    if (matches) toxicWeight += matches.length * 20;
  });

  LOW_TOXICITY_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\w*\\b`, 'gi');
    const matches = clean.match(regex);
    if (matches) toxicWeight += matches.length * 5;
  });

  // 2. Reduce score for constructive/contextual campus words to allow negative but constructive comments
  CONSTRUCTIVE_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\w*\\b`, 'gi');
    const matches = clean.match(regex);
    if (matches) toxicWeight -= matches.length * 6; // mitigation factor
  });

  // 3. Direct attacks or naming targets increases toxicity
  const targetingMatches = clean.match(TARGETING_PATTERN);
  if (targetingMatches) {
    toxicWeight += targetingMatches.length * 35;
  }

  // Calculate final score - absolute weights capped between 0 and 100
  let score = Math.max(0, Math.min(100, toxicWeight));
  return score;
};

/**
 * Validates text for Personal Identifiable Information (PII).
 * @param {string} text - The input text.
 * @returns {object} - { hasPII, piiTypesFound }
 */
export const checkPII = (text) => {
  if (!text) return { hasPII: false, piiTypesFound: [] };
  
  const piiTypesFound = [];
  
  if (PII_PATTERNS.email.test(text)) piiTypesFound.push('Email address');
  if (PII_PATTERNS.phone.test(text)) piiTypesFound.push('Phone number');
  if (PII_PATTERNS.studentId.test(text)) piiTypesFound.push('Student ID (USN)');
  if (PII_PATTERNS.address.test(text)) piiTypesFound.push('Personal address');

  // Reset regex indices
  Object.values(PII_PATTERNS).forEach(regex => { regex.lastIndex = 0; });

  return {
    hasPII: piiTypesFound.length > 0,
    piiTypesFound
  };
};

/**
 * Checks if report targets individuals by name or title.
 * @param {string} text - The input text.
 * @returns {boolean} - True if targeting is found.
 */
export const checkTargeting = (text) => {
  if (!text) return false;
  const match = TARGETING_PATTERN.test(text);
  TARGETING_PATTERN.lastIndex = 0; // reset
  return match;
};

/**
 * Performs spam checks on the input text.
 * @param {string} text - The text being submitted.
 * @param {Array<object>} recentReports - List of reports submitted recently by anyone.
 * @returns {object} - { isSpam, reason }
 */
export const checkSpam = (text, recentReports = []) => {
  if (!text) return { isSpam: false };
  const clean = text.trim();
  
  // 1. Single character or pattern repetition (e.g. "aaaaaaa", "!!!!!!")
  if (/(.)\1{4,}/.test(clean)) {
    return { isSpam: true, reason: 'Excessive character repetition detected.' };
  }

  // 2. Word repetition / meaningless loops (e.g. "test test test test test")
  if (/\b(\w+)\s+\1\s+\1\s+\1\b/i.test(clean)) {
    return { isSpam: true, reason: 'Meaningless word repetition detected.' };
  }

  // 3. Vowel density / Keyboard spam check (for words >= 5 characters)
  const words = clean.split(/\s+/).filter(w => w.length >= 5);
  for (const word of words) {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '');
    if (cleanWord.length >= 6) {
      const vowelCount = (cleanWord.match(/[aeiou]/gi) || []).length;
      if (vowelCount <= 1) {
        return { isSpam: true, reason: 'Keyboard spam or meaningless content detected.' };
      }
    }
  }

  // 4. Unique word ratio check (meaningless spam stuffing)
  const allWords = clean.split(/\s+/).filter(Boolean);
  if (allWords.length > 6) {
    const uniqueWords = new Set(allWords.map(w => w.toLowerCase()));
    if (uniqueWords.size / allWords.length < 0.35) {
      return { isSpam: true, reason: 'Repetitive or low-quality content.' };
    }
  }

  // 5. Short meaningless text (e.g., just "test", "hello", "lol")
  if (allWords.length === 1 && (allWords[0].length < 4 || ['test', 'asdf', 'hello', 'good', 'okay', 'spam'].includes(allWords[0].toLowerCase()))) {
    return { isSpam: true, reason: 'Report details are too short or meaningless.' };
  }

  // 6. Duplicate reports within a short window (e.g., identical title or content)
  const thresholdTime = 10 * 60 * 1000; // 10 minutes
  const now = Date.now();
  
  for (const r of recentReports) {
    const reportTime = new Date(r.timestamp).getTime();
    if (now - reportTime < thresholdTime) {
      // Direct comparison
      if (r.content?.trim().toLowerCase() === clean.toLowerCase()) {
        return { isSpam: true, reason: 'A duplicate report was submitted recently. Please wait before submitting it again.' };
      }
    }
  }

  return { isSpam: false };
};

/**
 * Runs a complete real-time checks suite for content submission.
 * @param {string} title - The report title (empty for comments).
 * @param {string} content - The report or comment content.
 * @param {Array<object>} recentReports - List of recent reports for duplicate checks.
 * @returns {object} - { ok, code, message, toxicityScore, reasons }
 */
export const moderateContent = (title, content, recentReports = []) => {
  const fullText = (title ? title + ' ' : '') + content;
  
  // 1. PII Check
  const piiCheck = checkPII(fullText);
  if (piiCheck.hasPII) {
    return {
      ok: false,
      code: 'PII_DETECTED',
      message: 'For privacy and safety reasons, personal information cannot be included in reports.',
      suggestion: 'Please remove any phone numbers, emails, student USNs, or addresses before submitting.',
      reasons: piiCheck.piiTypesFound.map(t => `Contains ${t}`)
    };
  }

  // 2. Spam Check
  const spamCheck = checkSpam(content, recentReports);
  if (spamCheck.isSpam) {
    return {
      ok: false,
      code: 'SPAM_DETECTED',
      message: `Spam filter triggered: ${spamCheck.reason}`,
      suggestion: 'Ensure your message uses real words, complete sentences, and doesn\'t repeat the same words or patterns.',
      reasons: ['Spam / repetitive content']
    };
  }

  // 3. Offensive Language Check
  if (checkOffensiveLanguage(fullText)) {
    return {
      ok: false,
      code: 'OFFENSIVE_LANGUAGE',
      message: 'Your report contains language that violates community guidelines. Please revise and resubmit using respectful and constructive language.',
      suggestion: 'Remove any profanity, slurs, or aggressive/harassing wording. Focus strictly on the campus issue itself.',
      reasons: ['Profanity or slurs detected']
    };
  }

  // 4. Toxicity Score Calculation
  const toxicityScore = calculateToxicity(fullText);
  if (toxicityScore >= TOXICITY_THRESHOLD) {
    // Check if it specifically targets individuals
    if (checkTargeting(fullText)) {
      return {
        ok: false,
        code: 'TARGETING_INDIVIDUAL',
        message: 'Reports must focus on systemic issues and campus facilities. Naming, targeting, or attacking specific individuals is not permitted.',
        suggestion: 'Focus on the structural problem (e.g. "the equipment in the lab") instead of naming, referencing, or accusing specific teachers, staff, or individuals.',
        reasons: ['Defamation / Targeting individuals', `High Toxicity (${toxicityScore}%)`]
      };
    }

    return {
      ok: false,
      code: 'HIGH_TOXICITY',
      message: 'Your report exceeds community guidelines for language toxicity. Please revise it to be constructive and respectful.',
      suggestion: 'Tone down aggressive language. Describe what needs fixing (e.g. "the lights are broken") rather than personal insults or angry outbursts.',
      reasons: [`High Toxicity (${toxicityScore}%)`]
    };
  }

  // Borderline flags (not blocked, but flagged for admin review)
  // Let's flag anything with toxicity >= 35 or contains targeting keywords
  const isFlagged = toxicityScore >= 35 || checkTargeting(fullText);

  return {
    ok: true,
    isFlagged,
    toxicityScore,
    message: 'Content cleared community standards.',
    reasons: isFlagged ? ['Borderline toxicity or possible individual reference'] : []
  };
};
