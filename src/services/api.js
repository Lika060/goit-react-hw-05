
import axios from "axios";

const API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzI3ZDUwNWFmZDljOTI4NTAwNzNiZmJjNTkyZjU2NSIsIm5iZiI6MTc0NDgxMDM3OC40MzcsInN1YiI6IjY3ZmZiMThhZjM5YzczMDEyNWQ5MGYyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tH0kSEcx57EkO-2X8JpTIgbkT1N9v0Lm3ORHHp69ZeY";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_TOKEN,
  },
});

export const fetchTrendingMovies = () => api.get("/trending/movie/day");

export const searchMovies = (query) =>
  api.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

export const getMovieDetails = (movieId) => api.get(`/movie/${movieId}`);

export const getMovieCredits = (movieId) => api.get(`/movie/${movieId}/credits`);

export const getMovieReviews = (movieId) => api.get(`/movie/${movieId}/reviews`);

