import { Link, useLocation } from "react-router-dom";
import { imageUrl, placeholder } from "../../services/api/tmdb-api";
import css from "./MovieListItem.module.css";

const MoviesListItem = ({ id, title, backdrop_path }) => {
  const location = useLocation();

  return (
    <>
      <Link
        className={css.link}
        to={`/movies/${id}`}
        state={{ from: location }}
      >
        {title}
      </Link>
      <img
        className={css.img}
        src={
          (backdrop_path && `${imageUrl}/w200${backdrop_path}`) ?? placeholder
        }
        alt={title}
        loading="lazy"
        width="120"
        height="68"
      />
    </>
  );
};

export default MoviesListItem;
