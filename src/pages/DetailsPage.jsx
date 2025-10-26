import React, { useState, useEffect } from 'react';
import Skeleton from '../components/Skeleton';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import styles from './DetailsPage.module.css';

/**
 * URL base para imagens da API TMDB
 * Usado para construir URLs completas dos pôsteres
 */
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

/**
 * DetailsPage - Página de detalhes do filme
 * 
 * Exibe informações detalhadas sobre um filme específico:
 * - Pôster em alta resolução
 * - Título e avaliação média
 * - Sinopse completa
 * - Lista de gêneros
 * - Link para site oficial (quando disponível)
 * - Botão de retorno para navegação
 */
function DetailsPage() {
  // Parâmetros da URL e navegação
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados para gerenciar dados e UI
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Efeito para carregar os detalhes do filme
   * Executa quando o ID do filme muda na URL
   */
  useEffect(() => {
    if (!id) return;

    /**
     * Busca os detalhes do filme na API
     * Gerencia estados de loading e erro
     */
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error('Erro ao carregar detalhes:', err);
        setError('Não foi possível carregar os detalhes deste filme.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (isLoading) {
    return (
      <main className={styles.detailsContainer}>
          <button
            className={styles.backButton}
            onClick={() => navigate(-1)}
            aria-label="Voltar"
          >
            ← Voltar
          </button>
          <div className={styles.posterSection}>
            <Skeleton height="320px" width="220px" borderRadius="12px" />
          </div>
          <section className={styles.infoSection}>
            <Skeleton height="32px" width="60%" borderRadius="8px" style={{ marginBottom: '16px' }} />
            <Skeleton height="24px" width="40%" borderRadius="8px" style={{ marginBottom: '12px' }} />
            <Skeleton height="20px" width="90%" borderRadius="8px" style={{ marginBottom: '8px' }} />
            <Skeleton height="20px" width="80%" borderRadius="8px" style={{ marginBottom: '8px' }} />
            <Skeleton height="20px" width="50%" borderRadius="8px" style={{ marginBottom: '8px' }} />
          </section>
        </main>
    );
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
  }

  if (!movie) {
    return <div className={styles.errorContainer}>Filme não encontrado.</div>;
  }

  return (
    <main className={styles.detailsContainer}>
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="Voltar para a página anterior"
          title="Voltar"
        >
          ←
        </button>
        <div className={styles.posterSection}>
          {movie.poster_path ? (
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={`Pôster de ${movie.title}`}
              className={styles.poster}
            />
          ) : (
            <div className={styles.noPoster}>Sem pôster disponível</div>
          )}
        </div>

        <section className={styles.infoSection}>
          <h1 className={styles.title}>{movie.title}</h1>

          <p className={styles.rating}>
            ⭐ Nota Média:
            <span className={styles.voteAverage}>{movie.vote_average.toFixed(1)}</span>
          </p>

          <h2 className={styles.subtitle}>Sinopse</h2>
          <p className={styles.overview}>{movie.overview || 'Sinopse não disponível.'}</p>

          <h2 className={styles.subtitle}>Gêneros</h2>
          <p className={styles.genres}>{movie.genres ? movie.genres.map(g => g.name).join(', ') : '—'}</p>

          {movie.homepage && (
            <div className={styles.homepage}>
              <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                🔗 Visitar Site Oficial
              </a>
            </div>
          )}
        </section>
      </main>
  );
}

/**
 * Exporta o componente DetailsPage
 * Utilizado como rota principal para exibição de detalhes dos filmes
 */
export default DetailsPage;
