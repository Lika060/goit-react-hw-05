import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieReviews } from "../../services/api";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getMovieReviews(movieId);
        setReviewList(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <ul className={styles.list}>

      {reviewList.length === 0 ? (
        <li>No reviews available</li>
      ) : (
        reviewList.map((review) => (
          <li key={review.id}>
            <p>
              <strong>{review.author}</strong>
            </p>
            <p>{review.content}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default MovieReviews;
