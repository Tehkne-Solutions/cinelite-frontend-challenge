import axios from 'axios';

// Simplified API client: force use of API Key v3 via URL param
const BASE_URL = 'https://api.themoviedb.org/3';
// Read API key from Vite environment. Do NOT hard-code secrets in source.
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
if (!API_KEY) {
    // Warn during development so it's obvious the env var is missing.
    // Requests will likely fail with 401/unauthorized without a valid key.
    console.warn('Warning: VITE_TMDB_API_KEY is not defined. Set it in .env at the project root.');
}

const api = axios.create({
    baseURL: BASE_URL,
    // Do not attach api_key globally here to avoid leaking a hard-coded value.
    params: {
        language: 'pt-BR',
    },
    headers: {
        'Content-Type': 'application/json',
    },
});

// Função auxiliar para injetar a API Key em qualquer objeto params
const getParamsWithApiKey = (params = {}) => {
    if (API_KEY) {
        return { ...params, api_key: API_KEY };
    }
    return params;
};

export const getPopularMovies = async (page = 1) => {
    try {
        const params = getParamsWithApiKey({ page });
        const response = await api.get('/movie/popular', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchMovies = async (query, page = 1) => {
    try {
        const params = getParamsWithApiKey({ query, page });
        const response = await api.get('/search/movie', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMovieDetails = async (movieId) => {
    try {
        const params = getParamsWithApiKey();
        const response = await api.get(`/movie/${movieId}`, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para buscar gêneros do TMDB
export const getGenres = async () => {
    try {
        const params = getParamsWithApiKey();
        const response = await api.get('/genre/movie/list', { params });
        return response.data.genres || [];
    } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
        return [];
    }
};

// Função para descoberta de filmes por gênero
export const discoverMovies = async (genreId, page = 1) => {
    try {
        const params = getParamsWithApiKey({ page, with_genres: genreId });
        const response = await api.get('/discover/movie', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/* ------------------------------------------- */
/* NOVO: Funções para as Seções Horizontais (MovieRows) */
/* ------------------------------------------- */

// 1. Filmes Em Breve
export const getUpcomingMovies = async () => {
    try {
        const params = getParamsWithApiKey();
        const response = await api.get('/movie/upcoming', { params });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar filmes em breve:", error);
        throw error;
    }
};

// 2. Filmes Mais Votados (Top Rated)
export const getTopRatedMovies = async () => {
    try {
        const params = getParamsWithApiKey();
        const response = await api.get('/movie/top_rated', { params });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar filmes mais votados:", error);
        throw error;
    }
};

// 3. Filmes de Ação (Gênero ID 28 - Endpoint Discover)
export const getActionMovies = async () => {
    try {
        // Usa o endpoint discover e filtra por gênero (ID 28 para Ação)
        const params = getParamsWithApiKey({ with_genres: 28 });
        const response = await api.get('/discover/movie', { params });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar filmes de ação:", error);
        throw error;
    }
};