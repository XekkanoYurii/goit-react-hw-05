import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import {
  getCastById,
  imageUrl,
  placeholder,
} from "../../services/api/tmdb-api";

import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [cast, setCast] = useState(null);
  const [isLoading, setSsLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    setSsLoading(true);

    const getCast = async () => {
      try {
        const { cast: result } = await getCastById(params.movieId);

        setCast(result);
      } catch (error) {
        toast.error(error.response.data.status_message);
      } finally {
        setSsLoading(false);
      }
    };

    getCast();
  }, [params.movieId]);

  useEffect(() => {
    scrollDown();
  }, [cast]);

  const scrollDown = () => {
    window.scroll({
      top: 250,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      {cast?.length !== 0 ? (
        <ul className={css.list}>
          {cast?.map(({ id, character, name, profile_path }) => (
            <li key={id} className={css.listItem}>
              <img
                className={css.picture}
                src={
                  (profile_path && `${imageUrl}/w200${profile_path}`) ??
                  placeholder
                }
                alt={name}
                loading="lazy"
                width="100"
                height="150"
              />

              <div>
                <h3 className={css.subtitle}>{name}</h3>
                <p className={css.description}>
                  Character: {character ? character : "no information"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.altDescription}>
          We have no information about the cast.
        </p>
      )}
    </>
  );
};

export default MovieCast;
