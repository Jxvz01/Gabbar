/**
 * Copies a string to the system clipboard and provides feedback.
 * @param {string} text - The text to copy.
 * @returns {Promise<boolean>} - Success status.
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('FAILED_TO_COPY:', err);
    return false;
  }
};

/**
 * Formats timestamps into a human-readable HUB format.
 * @param {string|Date} timestamp 
 * @returns {string}
 */
export const formatHubDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
