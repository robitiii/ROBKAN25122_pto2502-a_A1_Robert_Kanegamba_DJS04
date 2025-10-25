import { useEffect, useMemo, useState } from 'react';
import { fetchPodcasts } from '../api/fetchPodcasts';
import { normalizeGenres } from '../utils/genres';

/**
 * usePodcasts - Fetches podcasts and manages UI state for search, sort, filter and pagination.
 *
 * State shape handled by the hook:
 * - original: full array from API
 * - query: search string (title)
 * - sort: 'newest' | 'title-asc' | 'title-desc'
 * - genre: single genre filter string or 'All'
 * - page: current page number (1-based)
 * - perPage: items per page
 *
 * The hook returns handlers and derived visible items so the UI stays in sync.
 */
export function usePodcasts({ initialPerPage = 12 } = {}) {
  const [original, setOriginal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [genre, setGenre] = useState('All');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(initialPerPage);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const data = await fetchPodcasts();
        if (!mounted) return;
        setOriginal(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Failed to load podcasts');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  // Derived list after search, filter, and sort
  const filtered = useMemo(() => {
    if (!original || original.length === 0) return [];

    const q = query.trim().toLowerCase();

    let list = original.filter((p) => {
      // Title search
      const title = (p.title || '') + '';
      const matchesQuery = !q || title.toLowerCase().includes(q);

      // Genre filter
      if (genre && genre !== 'All') {
        const genres = normalizeGenres(p.genres || p.genre);
        const hasGenre = genres.some((g) => g.toLowerCase() === genre.toLowerCase());
        return matchesQuery && hasGenre;
      }

      return matchesQuery;
    });

    // Sort
    if (sort === 'newest') {
      list.sort((a, b) => {
        const da = new Date(a.updated || a.last_updated || a.updated_at || 0).getTime() || 0;
        const db = new Date(b.updated || b.last_updated || b.updated_at || 0).getTime() || 0;
        return db - da;
      });
    } else if (sort === 'title-asc') {
      list.sort((a, b) => ('' + (a.title || '')).localeCompare(b.title || ''));
    } else if (sort === 'title-desc') {
      list.sort((a, b) => ('' + (b.title || '')).localeCompare(a.title || ''));
    }

    return list;
  }, [original, query, sort, genre]);

  // Pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  // Ensure current page is valid when filters change
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const visible = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  // Handlers
  const setQueryAndResetPage = (q) => {
    setQuery(q);
    setPage(1);
  };
  const setGenreAndResetPage = (g) => {
    setGenre(g);
    setPage(1);
  };
  const setSortAndKeepPage = (s) => setSort(s);

  return {
    original,
    loading,
    error,
    query,
    setQuery: setQueryAndResetPage,
    sort,
    setSort: setSortAndKeepPage,
    genre,
    setGenre: setGenreAndResetPage,
    page,
    setPage,
    perPage,
    setPerPage,
    total,
    totalPages,
    visible,
  };
}
