import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ value, onChange, onClear }) {
    return (
        <div className={styles.searchBarContainer}>
            <input
                type="search"
                className={styles.searchInput}
                placeholder="Buscar filmes..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {value && (
                <button
                    className={styles.clearButton}
                    onClick={onClear}
                    aria-label="Limpar busca"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

export default SearchBar;