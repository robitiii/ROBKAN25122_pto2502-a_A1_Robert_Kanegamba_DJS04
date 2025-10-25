import PropTypes from 'prop-types';
import { GENRE_OPTIONS } from '../utils/genres';

/**
 * Controls - Search, Sort, Genre filter and Per-page control component.
 * Small, focused component that delegates state changes via handlers from hook.
 */
function Controls({ query, onQuery, sort, onSort, genre, onGenre, perPage, onPerPage }) {
  return (
    <div className="controls">
      <input
        aria-label="Search podcasts"
        placeholder="Search by title…"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
      />

      <select aria-label="Sort podcasts" value={sort} onChange={(e) => onSort(e.target.value)}>
        <option value="newest">Newest updated</option>
        <option value="title-asc">Title A–Z</option>
        <option value="title-desc">Title Z–A</option>
      </select>

      <select aria-label="Filter by genre" value={genre} onChange={(e) => onGenre(e.target.value)}>
        {GENRE_OPTIONS.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <select aria-label="Items per page" value={perPage} onChange={(e) => onPerPage(Number(e.target.value))}>
        <option value={6}>6 / page</option>
        <option value={12}>12 / page</option>
        <option value={24}>24 / page</option>
      </select>
    </div>
  );
}
Controls.propTypes = { query: PropTypes.string, onQuery: PropTypes.func.isRequired, sort: PropTypes.string, onSort: PropTypes.func.isRequired, genre: PropTypes.string, onGenre: PropTypes.func.isRequired, perPage: PropTypes.number, onPerPage: PropTypes.func.isRequired, }; export default Controls;