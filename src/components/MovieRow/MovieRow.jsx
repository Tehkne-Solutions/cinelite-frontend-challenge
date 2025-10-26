import React, { useState, useRef, useEffect } from 'react';
import styles from './MovieRow.module.css';
import { Link } from 'react-router-dom';
import MovieCard from '../MovieCard';

/**
 * MovieRow - Componente de carrossel horizontal de filmes
 * 
 * Renderiza uma linha deslizável de cards de filmes com:
 * - Título da seção
 * - Lista horizontal de filmes com rolagem suave
 * - Setas de navegação em desktop (> 600px)
 * - Carregamento dinâmico via API
 * - Tratamento de estados vazios e erros
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.title - Título da seção de filmes (ex: "Próximos Lançamentos")
 * @param {Function} props.apiCallFunction - Função que retorna a Promise com os dados dos filmes
 */
function MovieRow({ title, apiCallFunction }) {
    // Estados para gerenciar dados, loading e interface
    const [movies, setMovies] = useState([]); // Lista de filmes da API
    const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
    const [showArrows, setShowArrows] = useState(false); // Visibilidade das setas de navegação
    
    // Referência para o container de filmes (usado na rolagem)
    const movieListRef = useRef(null);

    /**
     * Efeito para carregar os filmes da API
     * Executa na montagem e quando a função da API ou título mudam
     */
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await apiCallFunction(); 
                setMovies(data.results); 
            } catch (error) {
                console.error(`Erro ao carregar a linha de filmes "${title}":`, error);
                setMovies([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovies();
    }, [apiCallFunction, title]); 

    if (isLoading) {
        return <div className={styles.loading}>Carregando {title}...</div>;
    }

    if (!movies || movies.length === 0) {
        return null; 
    }

    const displayMovies = movies.slice(0, 15); 

    /**
     * Realiza a rolagem horizontal da lista de filmes
     * @param {('left'|'right')} direction - Direção da rolagem
     */
    const scrollList = (direction) => {
        const container = movieListRef.current;
        if (!container) return;
        const scrollAmount = 400; // Pixels a rolar por clique
        container.scrollBy({ 
            left: direction === 'left' ? -scrollAmount : scrollAmount, 
            behavior: 'smooth' 
        });
    };

    // Detecta se é viewport desktop para exibição das setas
    const isDesktop = typeof window !== 'undefined' ? window.innerWidth > 600 : false;

    return (
        <section
            className={styles.rowContainer}
            aria-label={`Seção de filmes: ${title}`}
            onMouseEnter={() => isDesktop && setShowArrows(true)}
            onMouseLeave={() => isDesktop && setShowArrows(false)}
        >
            <h2 className={styles.rowTitle}>{title}</h2>
            <div className={styles.rowWrapper}>
                {isDesktop && showArrows && (
                    <button
                        className={styles.arrowLeft}
                        onClick={() => scrollList('left')}
                        aria-label="Scroll para a esquerda"
                    >
                        &#8592;
                    </button>
                )}
                <div className={styles.movieList} ref={movieListRef}>
                    {displayMovies.map(movie => (
                        movie && movie.id ? (
                            <div key={movie.id} className={styles.movieItem}>
                                <MovieCard movie={movie} />
                            </div>
                        ) : null
                    ))}
                </div>
                {isDesktop && showArrows && (
                    <button
                        className={styles.arrowRight}
                        onClick={() => scrollList('right')}
                        aria-label="Scroll para a direita"
                    >
                        &#8594;
                    </button>
                )}
            </div>
        </section>
    );
}

/**
 * Exporta o componente MovieRow
 * Utilizado na página inicial para exibir categorias de filmes
 */
export default MovieRow;