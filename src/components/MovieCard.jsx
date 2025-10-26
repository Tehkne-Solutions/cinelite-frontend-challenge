import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/tmdb';
import styles from './MovieCard.module.css';

function MovieCard({ movie, className = '' }) {
    // === PROTEÇÃO ABSOLUTA (Linhas 10-12) ===
    if (!movie || !movie.id || !movie.title) {
        return null;
    }
    // =======================================
    
    // LINHA 13: SUBSTITUÍDA POR VERIFICAÇÃO EXPLÍCITA para contornar o problema de cache/compilação.
    // Garante que toFixed() só é chamado se movie.vote_average for um valor definido.
    const formattedRating = movie.vote_average === undefined ? undefined : movie.vote_average.toFixed(1);
    
    // LINHA 14:
    const hasRating = !!formattedRating; 

    const imageUrl = getImageUrl(movie.poster_path, 'w500');

    // Acessos seguros:
    // Garante que movie.release_date existe antes de tentar criar um Date
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Ano não informado';
    
    return (
        <Link 
            to={`/movie/${movie.id}`} 
            className={`${styles.card} ${className}`}
            aria-label={`Ver detalhes do filme ${movie.title} (${year})`}
        >
            <div className={styles.poster}>
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={`Poster do filme ${movie.title}`} 
                        loading="lazy"
                        width="300"
                        height="450"
                    />
                ) : (
                    <div className={styles.noPoster} role="img" aria-label="Imagem não disponível">
                        Sem imagem disponível
                    </div>
                )}
            </div>
            <div className={styles.info}>
                <h2 className={styles.title}>{movie.title}</h2>
                {/* Renderiza a nota SOMENTE se hasRating for true (formattedRating existir) */}
                {hasRating && (
                    <div 
                        className={styles.rating}
                        aria-label={`Nota do filme: ${formattedRating} de 10`}
                    >
                        ⭐ {formattedRating}
                    </div>
                )}
                <p className={styles.year} aria-label={`Ano de lançamento: ${year}`}>
                    {year}
                </p>
            </div>
        </Link>
    );
}

export default MovieCard;