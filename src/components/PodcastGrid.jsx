// src/components/PodcastGrid.jsx
import PodcastList from './PodcastList';
import Controls from './Controls';
import Pagination from './Pagination';
import { usePodcasts } from '../hooks/usePodcasts';

/**
 * PodcastGrid component - Fetches and renders a responsive grid of podcast cards.
 * 
 * This component handles the complete data fetching lifecycle including loading states,
 * error handling, and empty state management. It uses useEffect to fetch data on mount
 * and useState to manage the podcast data, loading, and error states.
 * 
 * @component
 * @returns {JSX.Element} The rendered podcast grid or status messages.
 * 
 * @example
 * <PodcastGrid />
 */
function PodcastGrid() {
   const {
    loading,
    error,
    query,
    setQuery,
    sort,
    setSort,
    genre,
    setGenre,
    page,
    setPage,
    perPage,
    setPerPage,
    total,
    totalPages,
    visible,
  } = usePodcasts({ initialPerPage: 12 });

  if (loading) {
    return (
      <div className="status-message">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            border: '2px solid #e2e8f0', 
            borderTop: '2px solid #667eea', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite' 
          }}></div>
          Loading podcasts...
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="status-message error">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Unable to load podcasts</div>
          <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Controls
        query={query}
        onQuery={setQuery}
        sort={sort}
        onSort={setSort}
        genre={genre}
        onGenre={setGenre}
        perPage={perPage}
        onPerPage={setPerPage}
      />

      <PodcastList items={visible} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <div style={{ fontSize: '0.9rem' }}>{total} results</div>
        <Pagination page={page} totalPages={totalPages} onPage={setPage} />
      </div>
    </div>
  );
}


export default PodcastGrid;