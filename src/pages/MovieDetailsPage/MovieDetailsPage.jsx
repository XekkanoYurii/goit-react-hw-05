import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import clsx from "clsx";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import {
  getDetailsById,
  imageUrl,
  placeholder,
} from "../../services/api/tmdb-api";

import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const location = useLocation();
  const ref = useRef(location.state?.from);

  useEffect(() => {
    setIsLoading(true);
    const getDetails = async () => {
      try {
        const response = await getDetailsById(params.movieId);
        setMovie(response);
      } catch (error) {
        toast.error(error.response.data.status_message);
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, [params.movieId]);

  const movieKeys = Object.keys(movie);

  const { genres, overview, poster_path, title, vote_average, release_date } =
    movie;

  return (
    <section className={css.container}>
      <NavLink to={ref.current ?? "/movies"}>
        <button type="button" className={css.button}>
          Go back
        </button>
      </NavLink>

      {isLoading ? (
        <Loader />
      ) : (
        movieKeys?.length !== 0 && (
          <>
            <div className={css.infoBlock}>
              <div>
                <img
                  className={css.picture}
                  src={
                    (poster_path && `${imageUrl}/w300${poster_path}`) ||
                    placeholder
                  }
                  alt={title}
                  loading="lazy"
                  width="300"
                />
              </div>

              <div className={css.details}>
                {release_date ? (
                  <h2>{`${title} (${release_date?.slice(0, 4)})`}</h2>
                ) : (
                  <h2>{title}</h2>
                )}

                <h3 className={css.subtitle}>Rating</h3>
                {vote_average ? (
                  <p className={css.description}>
                    {vote_average && Math.round(vote_average * 100) / 100}
                  </p>
                ) : (
                  <p className={css.description}>no information</p>
                )}

                <h3 className={css.subtitle}>Overview</h3>
                {overview ? (
                  <p className={css.description}>{overview}</p>
                ) : (
                  <p className={css.description}>no information</p>
                )}

                <h3 className={css.subtitle}>Genres</h3>
                {genres?.length !== 0 ? (
                  <ul className={css.list}>
                    {genres?.map(({ id, name }) => (
                      <li key={id} className={css.listItem}>
                        {name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={css.description}>no information</p>
                )}
              </div>
            </div>

            <div className={css.details}>
              <h3 className={css.subtitle}>Additional information</h3>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NavLink
                    className={({ isActive }) =>
                      clsx(css.link, isActive && css.active)
                    }
                    to={"cast"}
                    state={{ from: ref.current }}
                  >
                    Cast
                  </NavLink>
                </li>
                <li className={css.listItem}>
                  <NavLink
                    className={({ isActive }) =>
                      clsx(css.link, isActive && css.active)
                    }
                    to={"reviews"}
                    state={{ from: ref.current }}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
            <Outlet />
          </>
        )
      )}
    </section>
  );
};

export default MovieDetailsPage;
