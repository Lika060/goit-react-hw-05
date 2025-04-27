import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.movieList}>
      {movies.map((film) => (
        <li key={film.id}>
          <Link to={`/movies/${film.id}`} state={{ from: location }}>
            <div className={styles.movieCard}>
              <img
                src={
                  film.poster_path
                    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={film.title}
              />
              <p>{film.title}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;