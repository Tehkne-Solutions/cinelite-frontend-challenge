import React, { useState, useEffect } from 'react';
import Skeleton from '../components/Skeleton';
import { useParams } from 'react-router-dom';
import { discoverMovies, getGenres } from '../services/api';
import MovieCard from '../components/MovieCard/MovieCard';
import Pagination from '../components/Pagination';
import styles from './GenrePage.module.css';

function GenrePage() {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useState({ page: 1 });
    const page = searchParams.page;

    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchGenreName = async () => {
            try {
                const genres = await getGenres();
                const currentGenre = genres.find(g => g.id === parseInt(id));
                setGenre(currentGenre);
            } catch (err) {
                console.error('Erro ao buscar gênero:', err);
            }
        };

        fetchGenreName();
    }, [id]);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await discoverMovies({ with_genres: id, page });
                setMovies(data.results);
                setTotalPages(data.total_pages);
            } catch (err) {
                console.error('Erro ao buscar filmes por gênero:', err);
                setError('Não foi possível carregar os filmes. Tente novamente.');
                setMovies([]);
                setTotalPages(1);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchMoviesByGenre();
        }
    }, [id, page]);

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };

    if (isLoading) {
        return (
            <main className={styles.genrePage}>
                <header className={styles.genreHeader}>
                    <h1>
                        Filmes de {genre?.name || 'Gênero'}
                    </h1>
                </header>
                <div className={styles.moviesGrid}>
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <Skeleton key={idx} height="320px" width="200px" borderRadius="12px" />
                    ))}
                </div>
            </main>
        );
    }

    if (error) {
        return <div className={styles.errorContainer}>{error}</div>;
    }

    return (
        <main className={styles.genrePage}>
            <header className={styles.genreHeader}>
                <h1>
                    Filmes de {genre?.name || 'Gênero'}
                    <span className={styles.movieCount}>
                        ({movies.length} {movies.length === 1 ? 'filme' : 'filmes'})
                    </span>
                </h1>
            </header>

            {movies.length > 0 ? (
                <>
                    <div className={styles.moviesGrid}>
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <div className={styles.noResults}>
                    Nenhum filme encontrado neste gênero.
                </div>
            )}
        </main>
    );
}

export default GenrePage;