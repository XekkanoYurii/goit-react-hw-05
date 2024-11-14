import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsById } from "../../services/api/tmdb-api";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setSsLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    setSsLoading(true);

    const getReviews = async () => {
      try {
        const response = await getReviewsById(params.movieId);

        setReviews(response.results);
      } catch (error) {
        toast.error(error.response.data.status_message);
      } finally {
        setSsLoading(false);
      }
    };

    getReviews();
  }, [params.movieId]);

  useEffect(() => {
    scrollDown();
  }, [reviews]);

  const scrollDown = () => {
    window.scrollBy({
      top: 250,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <ul className={css.list}>
        {reviews?.length !== 0 ? (
          reviews?.map(
            ({ id, author_details: { name, username }, content }) => (
              <li key={id} className={css.listItem}>
                <h2 className={css.subtitle}>{name || username}</h2>
                <p className={css.description}>{content}</p>
              </li>
            )
          )
        ) : (
          <p className={css.description}>
            We have no information about reviews.
          </p>
        )}
      </ul>
    </>
  );
};

export default MovieReviews;
