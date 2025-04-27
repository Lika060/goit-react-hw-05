import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import styles from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [moviesData, setMoviesData] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetchTrendingMovies();
      setMoviesData(response.data.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending Movies Today</h1>
      {moviesData.length > 0 ? (
        <MovieList movies={moviesData} />
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
}
