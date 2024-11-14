import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getTrendingMovies } from "../../services/api/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";

import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { results } = await getTrendingMovies();
        setMovies(results);
      } catch (error) {
        toast.error(error.response.data.status_message);
      }
    };

    getMovies();
  }, []);

  return (
    <main>
      {movies && (
        <>
          <h1 className={css.title}>Tranding today</h1>
          <MovieList items={movies} />
        </>
      )}
    </main>
  );
};

export default HomePage;
