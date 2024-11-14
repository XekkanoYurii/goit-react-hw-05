import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getMovieBySearch } from "../../services/api/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import LoadMoreButton from "../../components/LoadMoreBtn/LoadMoreBtn";

const MoviesPage = () => {
  const [requestedFilms, setRequestedFilms] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const keyWord = searchParams.get("query") ?? "";

  useEffect(() => {
    setIsLoading(true);

    const getSearch = async () => {
      if (!keyWord) {
        setIsLoading(false);
        return;
      }

      try {
        const { results, total_pages } = await getMovieBySearch(keyWord, page);
        page === 1
          ? setRequestedFilms(results)
          : setRequestedFilms((prevState) => [...prevState, ...results]);

        setTotalPages(total_pages);
      } catch (error) {
        toast.error(error.response.data.status_message);
      } finally {
        setIsLoading(false);
      }
    };
    getSearch();
  }, [keyWord, page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setTotalPages(null);

    const form = e.target;
    const inputValue = form.elements.input.value;
    if (inputValue === "") {
      toast.error("The request field must not be empty");
      return;
    }

    setSearchParams({ query: inputValue.toLowerCase().trim() });
    form.reset();
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) scrollDown();
  }, [requestedFilms, page]);

  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight / 2,
      behavior: "smooth",
    });
  };

  return (
    <section className={css.pageSection}>
      <form className={css.form} action="submit" onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="input"
          placeholder="Enter your query"
        />
        <button className={css.button}>Submit</button>
      </form>

      {isLoading && <Loader />}
      {requestedFilms && <MovieList items={requestedFilms} />}
      {totalPages && totalPages !== page && (
        <LoadMoreButton onLoadMore={onLoadMore} />
      )}
      {requestedFilms?.length === 0 && (
        <p className={css.altDescription}>
          No films were found matching your search query.
        </p>
      )}
    </section>
  );
};

export default MoviesPage;
