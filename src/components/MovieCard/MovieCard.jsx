import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css'; // Importa os estilos locais

function MovieCard({ movie, isCompact }) {
    // Early return if movie object is missing or incomplete
    if (!movie || typeof movie !== 'object') {
        return null;
    }

    const { id, poster_path, title, vote_average } = movie;
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    
    // Ensure we have a fallback for missing images
    const imageUrl = poster_path 
        ? `${IMAGE_BASE_URL}${poster_path}` 
        : '/placeholder-movie.svg'; // Fallback placeholder (public/placeholder-movie.svg)
    
    // Safely format the rating with fallback to 0
    const formattedRating = typeof vote_average === 'number' 
        ? vote_average.toFixed(1) 
        : '0.0';

    return (
        <Link 
            to={`/movie/${id}`} 
            className={`${styles.cardLink} ${isCompact ? styles.compact : ''}`}
            title={title}
        >
            <article className={styles.movieCard}>
                <div className={styles.posterWrapper}>
                    <img 
                        src={imageUrl} 
                        alt={`Poster do filme ${title}`} 
                        className={styles.poster}
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = '/placeholder-movie.svg';
                            e.target.onerror = null;
                        }}
                    />
                    
                    {/* Rating badge overlay */}
                    <div className={styles.ratingBadge} title={`Avaliação: ${formattedRating}/10`}>
                        <span className={styles.star}>⭐</span>
                        <span className={styles.vote}>{formattedRating}</span>
                    </div>
                </div>
                
                <div className={styles.info}>
                    <h2 className={styles.title}>{title}</h2>
                </div>
            </article>
        </Link>
    );
}

export default MovieCard;