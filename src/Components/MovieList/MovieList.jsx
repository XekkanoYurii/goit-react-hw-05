import MoviesListItem from "../MoviesListItem/MoviesListItem";
import css from "./MovieList.module.css";

const MovieList = ({ items }) => {
  return (
    <ul className={css.list}>
      {items.map((item) => {
        return (
          <li key={item.id} className={css.listItem}>
            <MoviesListItem {...item} />
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
