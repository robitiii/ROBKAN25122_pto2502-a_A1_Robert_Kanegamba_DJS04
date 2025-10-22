/**
 * Date Formatter - Utility functions for date formatting.
 *
 * @principle SRP - Single Responsibility Principle: This module only formats dates and does not handle any unrelated logic.
 */

/**
 * Formats a date string into a human-readable relative format.
 * 
 * This function converts an ISO date string into a user-friendly relative time
 * format such as "Today", "Yesterday", "3 days ago", "2 weeks ago", etc.
 * It handles various time ranges from days to years and provides
 * appropriate fallback for invalid or missing dates.
 * 
 * @function formatDate
 * @param {string} dateStr - ISO date string to format
 * @returns {string} Human-readable relative date string
 * 
 * @example
 * formatDate('2024-01-15T10:30:00Z') // Returns "2 days ago"
 * formatDate('2024-01-20T10:30:00Z') // Returns "Today"
 * formatDate('') // Returns "Date not available"
 * 
 * @example
 * // Usage in React component
 * <small className="date">{formatDate(podcast.updated)}</small>
 */
export function formatDate(dateStr) {
  if (!dateStr) return 'Date not available';
  
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
  return `${Math.ceil(diffDays / 365)} years ago`;
}