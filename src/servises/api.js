import axios from "axios";

const ApiToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGYxYjYxOTg1N2RkODFhY2Y2MDZmMWI1OGY1M2JkNyIsIm5iZiI6MTczMjExMDY2NC43OTkwNTg0LCJzdWIiOiI2NzM4N2ZmODk2YmUzYTA2ZmFkOTFhNTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OV6GxCkRraSX_KiZFQuGH6ahTCAtPsnp29fnxTPes3U";

// --------------------------

export const fetchTrendingMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const options = {
    headers: {
      Authorization: ApiToken,
    },
  };

  const res = await axios.get(url, options);
  return res.data;
};

// --------------------------

export const fetchSearchMovies = async (query = "batman", page = 1) => {
  const url =
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US";
  const options = {
    headers: {
      Authorization: ApiToken,
    },
    params: {
      query: query,
      page: page,
    },
  };

  const res = await axios.get(url, options);
  return res.data;
};

// --------------------------

export const fetchMovieDetails = async (movie_id) => {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;
  const options = {
    headers: {
      Authorization: ApiToken,
    },
  };

  const res = await axios.get(url, options);
  return res.data;
};

// --------------------------

export const fetchMovieCredits = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  const options = {
    headers: {
      Authorization: ApiToken,
    },
  };

  const res = await axios.get(url, options);
  return res.data.cast;
};

// --------------------------

export const fetchMovieReviews = async (movieId, page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`;
  const options = {
    headers: {
      Authorization: ApiToken,
    },
    params: {
      page: page,
    },
  };

  const res = await axios.get(url, options);
  return res.data.results;
};
