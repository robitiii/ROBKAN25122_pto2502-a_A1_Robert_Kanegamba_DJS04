import PropTypes from 'prop-types';

/**
 * Pagination - simple numeric pagination with prev/next.
 */
function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i += 1) pages.push(i);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1}>
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          aria-current={p === page ? 'page' : undefined}
          className={p === page ? 'active' : ''}
        >
          {p}
        </button>
      ))}

      <button onClick={() => onPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
        Next
      </button>
    </nav>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPage: PropTypes.func.isRequired,
};

export default Pagination;
