import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCredits } from "../../services/api";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [castList, setCastList] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await getMovieCredits(movieId);
        setCastList(response.data.cast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {castList.map((actor) => (
        <li key={actor.cast_id} className={styles.castItem}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://via.placeholder.com/100x150?text=No+Image"
            }
            alt={actor.name}
            width={100}
          />
          <p>
            <strong>{actor.name}</strong>
          </p>
          <p>{actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
