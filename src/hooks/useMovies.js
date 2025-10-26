import { useState, useEffect } from 'react';
import { tmdbAPI } from '../services/tmdbAPI';

export function useMovies(searchQuery = '') {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = searchQuery
          ? await tmdbAPI.searchMovies(searchQuery, page)
          : await tmdbAPI.getPopularMovies(page);

        setMovies(prevMovies => 
          page === 1 
            ? response.data.results 
            : [...prevMovies, ...response.data.results]
        );
      } catch (err) {
        // Friendly handling for 401 unauthorized (common during setup)
        if (err && err.response && err.response.status === 401) {
          setError('Erro de autenticação (401): verifique sua TMDB API key / token em .env');
        } else {
          setError(err.message || 'Erro desconhecido ao carregar filmes.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return {
    movies,
    loading,
    error,
    loadMore,
  };
}