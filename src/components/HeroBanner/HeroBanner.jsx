import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import bannerImage from '../../assets/images/cinelite_hero_banner.jpg';
import styles from './HeroBanner.module.css';

/**
 * HeroBanner - Componente principal da página inicial
 * 
 * Renderiza a seção de destaque no topo da página com:
 * - Título e descrição do CineLite
 * - Barra de pesquisa com resultados em tempo real
 * - Fundo com gradiente escuro para melhor contraste
 */
function HeroBanner() {
    // Estado para gerenciar o termo de busca e resultados
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    // Referência para controlar o debounce da pesquisa
    const searchTimeoutRef = useRef(null);
    const navigate = useNavigate();

    /**
     * Efeito para busca em tempo real com debounce
     * Dispara a busca após 300ms de inatividade na digitação
     */
    useEffect(() => {
        if (searchTerm.trim().length >= 2) {
            setIsLoading(true);
            // Limpa o timeout anterior
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            // Define novo timeout para debouncing
            searchTimeoutRef.current = setTimeout(async () => {
                try {
                    const data = await searchMovies(searchTerm, 1);
                    setSearchResults(data.results.slice(0, 5)); // Exibe apenas os 5 primeiros resultados
                    setShowDropdown(true);
                } catch (error) {
                    setSearchResults([]);
                } finally {
                    setIsLoading(false);
                }
            }, 300); // 300ms de debounce
        } else {
            setSearchResults([]);
            setShowDropdown(false);
        }

        // Limpa o timeout ao desmontar ou atualizar
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchTerm]);

    /**
     * Manipula o envio do formulário de pesquisa
     * Navega para a página de resultados completos
     * @param {Event} e - Evento do formulário
     */
    const handleSearch = (e) => {
        e.preventDefault();
        const term = searchTerm.trim();
        if (!term) return;
        
        navigate(`/search?q=${encodeURIComponent(term)}`);
        setSearchTerm('');
        setShowDropdown(false);
    };

    return (
        <section
            className={styles.heroBanner}
            style={{ backgroundImage: `url(${bannerImage})` }}
            role="region"
            aria-label="Banner principal do CineLite"
        >
            <div className={styles.overlay}>
                <div className={styles.content}>
                    {/* Main textual title: 'Seja Bem vindo ao CineLite' (text, not icon) */}
                    <h1 className={styles.mainTitle}>
                        Seja Bem vindo ao CineLite
                    </h1>

                    <p className={styles.description}>
                            Descubra e organize seus filmes favoritos — recomendações, tendências e uma busca rápida para
                            encontrar o que assistir hoje. Tudo em um só lugar, no CineLite.
                    </p>

                    <div className={styles.searchContainer}>
                        <form onSubmit={handleSearch} className={styles.searchForm} role="search" aria-label="Buscar filmes">
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Busque por filmes..."
                                className={styles.searchInput}
                                aria-label="Buscar filmes"
                            />
                            <button type="submit" className={styles.searchButton} aria-label="Buscar">
                                <span aria-hidden="true">🔍</span>
                            </button>
                        </form>
                        
                        {showDropdown && searchResults.length > 0 && (
                            <div className={styles.searchDropdown}>
                                {isLoading ? (
                                    <div className={styles.loadingResults}>Buscando...</div>
                                ) : (
                                    <ul>
                                        {searchResults.map(movie => (
                                            <li key={movie.id}>
                                                <a 
                                                    href={`/movie/${movie.id}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        navigate(`/movie/${movie.id}`);
                                                        setSearchTerm('');
                                                        setShowDropdown(false);
                                                    }}
                                                >
                                                    {movie.poster_path && (
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                                            alt={movie.title}
                                                            className={styles.resultThumb}
                                                        />
                                                    )}
                                                    <div className={styles.resultInfo}>
                                                        <h3>{movie.title}</h3>
                                                        <span>{movie.release_date?.split('-')[0] || 'TBA'}</span>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                        <li className={styles.viewAllResults}>
                                            <button 
                                                onClick={handleSearch}
                                                className={styles.viewAllButton}
                                            >
                                                Ver todos os resultados
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * Exporta o componente HeroBanner como padrão
 * para ser utilizado em outros componentes da aplicação
 */
export default HeroBanner;
