import React, { useState, useEffect } from 'react';
import Skeleton from '../components/Skeleton';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard/MovieCard';
import Pagination from '../components/Pagination';
import styles from './SearchPage.module.css';

function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query.trim()) {
                setMovies([]);
                setTotalPages(1);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const data = await searchMovies(query, page);
                setMovies(data.results);
                setTotalResults(data.total_results);
                setTotalPages(data.total_pages);
            } catch (_) {
                setError('Não foi possível realizar a busca. Tente novamente.');
                setMovies([]);
                setTotalPages(1);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [query, page]);

    const handlePageChange = (newPage) => {
        setSearchParams({ q: query, page: newPage });
    };

    if (isLoading) {
        return (
            <main className={styles.searchPage}>
                <header className={styles.searchHeader}>
                    {query ? (
                        <h1>
                            Resultados para "{query}"
                        </h1>
                    ) : (
                        <h1>Digite algo para buscar filmes</h1>
                    )}
                </header>
                <div className={styles.resultsGrid}>
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
        <main className={styles.searchPage}>
            <header className={styles.searchHeader}>
                {query ? (
                    <h1>
                        Resultados para "{query}"
                        <span className={styles.resultCount}>
                            ({totalResults} {totalResults === 1 ? 'filme encontrado' : 'filmes encontrados'})
                        </span>
                    </h1>
                ) : (
                    <h1>Digite algo para buscar filmes</h1>
                )}
            </header>

            {!isLoading && movies.length === 0 && query && (
                <div className={styles.noResults}>
                    Nenhum filme encontrado para "{query}".
                </div>
            )}

            {movies.length > 0 && (
                <>
                    <div className={styles.resultsGrid}>
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
            )}
        </main>
    );
}

export default SearchPage;