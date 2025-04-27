import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [movieList, setMovieList] = useState([]);
  const [noMoviesFound, setNoMoviesFound] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setMovieList([]);
      setNoMoviesFound(false);
      return;
    }

    searchMovies(searchQuery)
      .then((response) => {
        const results = response.data.results;
        setMovieList(results);
        setNoMoviesFound(results.length === 0);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setMovieList([]);
        setNoMoviesFound(true);
      });
  }, [searchQuery]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const queryValue = event.target.elements.query.value.trim();
    if (queryValue) {
      setSearchParams({ query: queryValue });
      setNoMoviesFound(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="query"
          defaultValue={searchQuery}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>
      {noMoviesFound ? (
        <p>No movies found for your search</p>
      ) : (
        <MovieList movies={movieList} />
      )}
    </div>
  );
}
