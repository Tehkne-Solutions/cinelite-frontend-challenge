import React from 'react';
import styles from './Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);
    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className={styles.pagination} aria-label="Paginação">
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        &laquo;
      </button>
      {getPages().map(page => (
        <button
          key={page}
          className={page === currentPage ? styles.active : styles.page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        &raquo;
      </button>
    </nav>
  );
}

export default Pagination;
