import React from 'react';
import styles from './SideMenu.module.css';

function SideMenu({ isOpen, onClose, genres = [], onGenreChange, selectedGenre }) {
    if (!isOpen) return null;

    const handleClick = (genreId) => {
        onGenreChange(genreId);
        onClose();
    };

    return (
        <>
            <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
            <aside className={styles.sideMenu} role="navigation" aria-label="Menu de Filtros e Navegação">
                <button className={styles.closeButton} onClick={onClose} aria-label="Fechar Menu">
                    &times;
                </button>

                <h2>Filtros</h2>

                <nav className={styles.genreList} aria-label="Gêneros">
                    <button
                        onClick={() => handleClick(0)}
                        className={`${styles.genreItem} ${selectedGenre === 0 ? styles.active : ''}`}
                    >
                        Todos os Filmes
                    </button>

                    {genres.map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() => handleClick(genre.id)}
                            className={`${styles.genreItem} ${selectedGenre === genre.id ? styles.active : ''}`}
                        >
                            {genre.name}
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    );
}

export default SideMenu;