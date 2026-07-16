/**
 * Generate a range of numbers
 */
export function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Debounce a function call
 */
export function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Deep clone an object (simple implementation)
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Get initials from a full name (up to 2 characters)
 */
export function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Generate a random ID
 */
export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array/object)
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Smooth scroll to an element by ID
 */
export function scrollToId(id, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * Lock / unlock body scroll (for modals and drawers)
 */
export function lockScroll() {
  document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
  document.body.style.overflow = '';
}

/**
 * Group an array of objects by a key
 */
export function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

/**
 * Get a color hex for a stock status
 */
export function getStockColor(stockCount, inStock) {
  if (!inStock || stockCount === 0) return '#EF4444';
  if (stockCount <= 3) return '#F59E0B';
  return '#22C55E';
}

/**
 * Get stock label text
 */
export function getStockLabel(stockCount, inStock) {
  if (!inStock || stockCount === 0) return 'Out of Stock';
  if (stockCount <= 3) return `Low Stock (${stockCount} left)`;
  return `In Stock (${stockCount} units)`;
}

/**
 * Get stock badge variant
 */
export function getStockVariant(stockCount, inStock) {
  if (!inStock || stockCount === 0) return 'outofstock';
  if (stockCount <= 3) return 'lowstock';
  return 'instock';
}

/**
 * Calculate average rating from reviews array
 */
export function averageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

/**
 * Count ratings distribution from reviews
 * Returns { 5: n, 4: n, 3: n, 2: n, 1: n }
 */
export function ratingDistribution(reviews) {
  const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  if (!reviews) return dist;
  reviews.forEach(r => { if (dist[r.rating] !== undefined) dist[r.rating]++; });
  return dist;
}

/**
 * Format an order status for display
 */
export function formatOrderStatus(status) {
  const map = {
    pending:    { label: 'Pending',    color: '#F59E0B' },
    processing: { label: 'Processing', color: '#3B82F6' },
    shipped:    { label: 'Shipped',    color: '#E8871A' },
    delivered:  { label: 'Delivered',  color: '#22C55E' },
    cancelled:  { label: 'Cancelled',  color: '#EF4444' },
  };
  return map[status] || { label: status, color: '#A09B8C' };
}