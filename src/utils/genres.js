// src/utils/genres.js
/**
 * Simple mapping of genre IDs/names to display titles.
 * The podcast API sometimes returns genre strings; this helper provides
 * a canonical list of genre options for filtering UI.
 */
export const GENRE_OPTIONS = [
  'All',
  'Technology',
  'News',
  'Comedy',
  'Education',
  'Society & Culture',
  'True Crime',
  'Business',
  'Sports',
  'Science',
];

/**
 * Normalize genre value(s) from a podcast object into an array of strings.
 * Accepts string or array inputs and returns an array of normalized titles.
 * @param {string|string[]} input
 * @returns {string[]}
 */
export function normalizeGenres(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input.map((g) => String(g).trim()).filter(Boolean);
  return String(input)
    .split(/[,/|;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}
