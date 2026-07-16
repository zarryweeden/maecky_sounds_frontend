/**
 * Format a number as Kenya Shillings
 * @param {number} amount
 * @returns {string} e.g. "KES 119,000"
 */
export function formatPrice(amount) {
  if (amount === null || amount === undefined) return '';
  return `KES ${Math.round(amount).toLocaleString('en-KE')}`;
}

/**
 * Format a date string into a human-readable format
 * @param {string} dateString - ISO date string
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} e.g. "March 15, 2026"
 */
export function formatDate(dateString, options = {}) {
  const defaults = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-KE', { ...defaults, ...options });
}

/**
 * Format a date as a short string
 * @param {string} dateString
 * @returns {string} e.g. "Mar 15, 2026"
 */
export function formatDateShort(dateString) {
  return new Date(dateString).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Truncate a string to a maximum length, adding an ellipsis
 * @param {string} str
 * @param {number} max
 * @returns {string}
 */
export function truncate(str, max = 60) {
  if (!str) return '';
  return str.length > max ? str.slice(0, max) + '…' : str;
}

/**
 * Format a number as a discount percentage
 * @param {number} original
 * @param {number} sale
 * @returns {string} e.g. "−18%"
 */
export function formatDiscount(original, sale) {
  if (!sale || sale >= original) return '';
  const pct = Math.round(((original - sale) / original) * 100);
  return `−${pct}%`;
}

/**
 * Format a savings amount
 * @param {number} original
 * @param {number} sale
 * @returns {string} e.g. "Save KES 26,000"
 */
export function formatSavings(original, sale) {
  if (!sale || sale >= original) return '';
  return `Save ${formatPrice(original - sale)}`;
}

/**
 * Format a number with K/M suffix for compact display
 * @param {number} num
 * @returns {string} e.g. "1.2K", "3M"
 */
export function formatCompact(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

/**
 * Format a SKU for display
 * @param {string} sku
 * @returns {string}
 */
export function formatSKU(sku) {
  return sku ? `SKU: ${sku}` : '';
}

/**
 * Pluralize a word based on count
 * @param {number} count
 * @param {string} singular
 * @param {string} plural
 * @returns {string}
 */
export function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}