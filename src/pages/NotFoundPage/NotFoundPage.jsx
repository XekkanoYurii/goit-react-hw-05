import { NavLink } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <>
      <header className={css.header}>
        <h2 className={css.subtitle}>The requested page was not found</h2>
      </header>
      <div className={css.container}>
        <NavLink className={css.link} to="/">
          Back to trending movies
        </NavLink>
      </div>
    </>
  );
};

export default NotFoundPage;
