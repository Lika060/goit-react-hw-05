import axios from "axios";

const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzI3ZDUwNWFmZDljOTI4NTAwNzNiZmJjNTkyZjU2NSIsIm5iZiI6MTc0NDgxMDM3OC40MzcsInN1YiI6IjY3ZmZiMThhZjM5YzczMDEyNWQ5MGYyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tH0kSEcx57EkO-2X8JpTIgbkT1N9v0Lm3ORHHp69ZeY";
const BASE_API_URL = "https://api.themoviedb.org/3";

const apiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: API_KEY,
  },
});

export const getTrendingMovies = () => apiClient.get("/trending/movie/day");

export const searchMoviesByQuery = (query) =>
  apiClient.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

export const fetchMovieDetails = (movieId) => apiClient.get(`/movie/${movieId}`);

export const fetchMovieCredits = (movieId) =>
  apiClient.get(`/movie/${movieId}/credits`);

export const fetchMovieReviews = (movieId) =>
  apiClient.get(`/movie/${movieId}/reviews`);
