import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getMovieDetails } from "../../services/api";
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const goBackLink = useRef(location.state?.from || "/movies");
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(movieId);
        setMovieData(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieData) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.pageWrapper}>
      <Link to={goBackLink.current} className={styles.backButton}>
        ← Back to Movies
      </Link>

      <div className={styles.movieSection}>
        <div className={styles.posterContainer}>
          {movieData.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt={movieData.title}
              className={styles.moviePoster}
            />
          ) : (
            <div className={styles.noPoster}>No Poster Available</div>
          )}
        </div>

        <div className={styles.movieDetails}>
          <h2>
            {movieData.title}{" "}
            {movieData.release_date && `(${movieData.release_date.substring(0, 4)})`}
          </h2>

          <p className={styles.movieDescription}>
            {movieData.overview || "No overview available."}
          </p>

          {movieData.vote_average && (
            <p>
              User Rating:{" "}
              <span className={styles.userRating}>
                {Math.round(movieData.vote_average * 10)}%
              </span>
            </p>
          )}

          {movieData.genres && movieData.genres.length > 0 && (
            <p>
              Genres:{" "}
              <span className={styles.genreList}>
                {movieData.genres.map((genre) => (
                  <span key={genre.id} className={styles.genreTag}>
                    {genre.name}
                  </span>
                ))}
              </span>
            </p>
          )}
        </div>
      </div>

      <nav className={styles.navigation}>
        <Link to={`/movies/${movieId}/cast`} className={styles.navLink}>
          Cast
        </Link>
        <Link to={`/movies/${movieId}/reviews`} className={styles.navLink}>
          Reviews
        </Link>
      </nav>

      <Outlet />
    </div>
  );
}
