import PropTypes from 'prop-types';
import PodcastCard from './PodcastCard';

/**
 * PodcastList - Renders the visible podcast items as a grid using PodcastCard.
 */
function PodcastList({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="status-message">
        <div style={{ textAlign: 'center' }}>No podcasts match your filters.</div>
      </div>
    );
  }

  return (
    <div className="podcast-grid">
      {items.map((p) => (
        <PodcastCard key={p.id} podcast={p} />
      ))}
    </div>
  );
}

PodcastList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default PodcastList;