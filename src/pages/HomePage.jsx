import React, { useState, useEffect, useCallback } from 'react';
// IMPORTAÇÕES NOVAS para as Seções (Rows)
import { 
    getPopularMovies, 
    searchMovies, 
    discoverMovies,
    getUpcomingMovies, // NOVO
    getTopRatedMovies, // NOVO
    getActionMovies // NOVO
} from '../services/api'; 
import MovieCard from '../components/MovieCard';
import Skeleton from '../components/Skeleton';
import SearchBar from '../components/SearchBar/SearchBar';
import useDebounce from '../hooks/useDebounce'; 

// SideMenu e getGenres não são mais necessários aqui, pois foram movidos para App.jsx
import MovieRow from '../components/MovieRow/MovieRow'; // NOVO
import HeroBanner from '../components/HeroBanner';
import styles from './HomePage.module.css';

function HomePage({ selectedGenre }) {
    const [movies, setMovies] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 
    
    const [searchTerm, setSearchTerm] = useState(''); 
    const debouncedSearchTerm = useDebounce(searchTerm, 500); 

    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false); 
    
    // Indica se a busca ou filtro está ativo
    const isSearchOrFilterActive = debouncedSearchTerm || selectedGenre > 0;

    const fetchMovies = useCallback(async (pageToFetch = 1, isLoadMore = false) => {
        try {
            if (isLoadMore) {
                setIsLoadingMore(true);
            } else {
                setIsLoading(true);
            }
            setError(null); 

            let data;
            // 1. Busca por Termo (prioridade)
            if (debouncedSearchTerm) {
                data = await searchMovies(debouncedSearchTerm, pageToFetch);
            }
            // 2. Filtro por Gênero (agora vem do prop)
            else if (selectedGenre > 0) {
                data = await discoverMovies(selectedGenre, pageToFetch);
            }
            // 3. Padrão: filmes populares
            else {
                data = await getPopularMovies(pageToFetch);
            }
            
            if (isLoadMore) {
                setMovies(prev => [...prev, ...data.results]);
            } else {
                setMovies(data.results);
            }
            setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); 
            setCurrentPage(pageToFetch);
        } catch (err) {
            console.error("Erro ao carregar filmes:", err);
            setError(err.message);
            if (!isLoadMore) {
                setMovies([]);
            }
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }, [debouncedSearchTerm, selectedGenre]); 

    // Efeito para a busca OTIMIZADA e Filtro. Roda sempre que o termo ou filtro muda.
    useEffect(() => {
        // Quando o termo/filtro muda, resetamos para a página 1 e buscamos
        setCurrentPage(1);
        fetchMovies(1);
    }, [fetchMovies, debouncedSearchTerm, selectedGenre]); 
    
    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        fetchMovies(nextPage, true);
    };

    // Renderiza a visualização principal
    const renderMovieGridAndPagination = (title) => (
        <>
            <div className={styles.contentTitle}>
                 {title}
            </div>

            {error && (
                <div className={styles.error}>
                    Erro ao carregar filmes: {error}
                </div>
            )}

            {movies.length === 0 && !isLoading && !error && (
                <div className={styles.noResults}>Nenhum resultado encontrado.</div>
            )}

            <div className={styles.grid}>
                {isLoading
                    ? Array.from({ length: 8 }).map((_, idx) => (
                        <Skeleton key={idx} height="320px" width="200px" borderRadius="12px" />
                    ))
                    : movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
            </div>

            {movies.length > 0 && currentPage < totalPages && (
                <div className={styles.loadMoreContainer}>
                    <button 
                        className={styles.loadMoreButton}
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                    >
                        {isLoadingMore ? 'Carregando...' : 'Carregar Mais'}
                    </button>
                </div>
            )}
        </>
    );


    return (
        <>
            {/* Hero Banner fora do container para full-bleed */}
            <HeroBanner onSearch={setSearchTerm} />
            
            <main className={styles.container}> 
                {isSearchOrFilterActive ? (
                    // MODO BUSCA/FILTRO: Exibe APENAS o resultado da busca/filtro
                    renderMovieGridAndPagination(
                        debouncedSearchTerm 
                            ? `Resultados para "${debouncedSearchTerm}"` 
                            : `Filmes por Gênero`
                    )
                ) : (
                    // MODO DASHBOARD: Exibe as Seções Horizontais + Grid de Populares abaixo
                    <div className={styles.dashboard}>
                        {/* Rows com efeito de fade-in escalonado */}
                        <div className={`${styles.fadeIn} ${styles.delay1}`}>
                            <MovieRow 
                                title="Próximos Lançamentos" 
                                apiCallFunction={getUpcomingMovies}
                            />
                        </div>
                        <div className={`${styles.fadeIn} ${styles.delay2}`}>
                            <MovieRow 
                                title="Os Mais Votados de Todos os Tempos" 
                                apiCallFunction={getTopRatedMovies}
                            />
                        </div>
                        <div className={`${styles.fadeIn} ${styles.delay3}`}>
                            <MovieRow 
                                title="Dose de Ação" 
                                apiCallFunction={getActionMovies}
                            />
                        </div>

                        {/* Grid de filmes populares */}
                        <div className={`${styles.fadeIn} ${styles.delay4}`}>
                            {renderMovieGridAndPagination("Populares Agora")}
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default HomePage;
