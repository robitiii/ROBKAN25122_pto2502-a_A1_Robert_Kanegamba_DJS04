// src/components/PodcastCard.jsx
import PropTypes from 'prop-types';
import { formatDate } from '../utils/formatDate';

/**
 * PodcastCard component - Displays individual podcast information in a card format.
 * 
 * This component renders a single podcast with its image, title, season count,
 * genres, and last updated date. It handles various property names from the API
 * and includes fallback values for missing data. The component also handles image
 * loading errors with a placeholder.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.podcast - Podcast data object containing podcast information
 * @param {string|number} props.podcast.id - Unique identifier for the podcast
 * @param {string} props.podcast.title - Podcast title
 * @param {string} [props.podcast.image] - Podcast image URL
 * @param {string} [props.podcast.thumbnail] - Alternative image property
 * @param {string} [props.podcast.cover] - Alternative image property
 * @param {number} [props.podcast.seasons] - Number of seasons
 * @param {number} [props.podcast.season_count] - Alternative seasons property
 * @param {string[]|string} [props.podcast.genres] - Array of genre strings or single genre
 * @param {string[]|string} [props.podcast.genre] - Alternative genres property
 * @param {string} [props.podcast.updated] - Last updated date
 * @param {string} [props.podcast.last_updated] - Alternative date property
 * @param {string} [props.podcast.updated_at] - Alternative date property
 * @returns {JSX.Element} The rendered podcast card
 * 
 * @example
 * <PodcastCard podcast={{
 *   id: "123",
 *   title: "My Podcast",
 *   image: "https://example.com/image.jpg",
 *   seasons: 3,
 *   genres: ["Comedy", "Entertainment"],
 *   updated: "2024-01-15T10:30:00Z"
 * }} />
 */
function PodcastCard({ podcast }) {
  // Handle different possible property names from API
  const image = podcast.image || podcast.thumbnail || podcast.cover || '';
  const title = podcast.title || 'Untitled Podcast';
  const seasons = podcast.seasons || podcast.season_count || 0;
  const genres = podcast.genres || podcast.genre || [];
  const updated = podcast.updated || podcast.last_updated || podcast.updated_at || '';

  return (
    <div className="podcast-card">
      <img
        src={image}
        alt={title}
        className="podcast-image"
        onError={(e) => {
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
        }}
      />
      <div className="podcast-info">
        <h3>{title}</h3>
        <p className="meta">
          {seasons} season{seasons !== 1 ? 's' : ''}
        </p>
        <p className="genres">
          {Array.isArray(genres) ? genres.join(', ') : genres || 'No genres listed'}
        </p>
        <small className="date">{formatDate(updated)}</small>
      </div>
    </div>
  );
}

PodcastCard.propTypes = {
  podcast: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    image: PropTypes.string,
    thumbnail: PropTypes.string,
    cover: PropTypes.string,
    description: PropTypes.string,
    seasons: PropTypes.number,
    season_count: PropTypes.number,
    genres: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    genre: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    updated: PropTypes.string,
    last_updated: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
};

export default PodcastCard;
