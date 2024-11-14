import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWVhNWM0OGE2ODhmYjBjNDkwNGEzYWMwY2M0MDg3NiIsIm5iZiI6MTcyOTEwMjQ2MS4yMjIxMjMsInN1YiI6IjY2MDZkMmNjYTg5NGQ2MDE3YzYzNmM4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UcUP9GZ6tQb7plX4W-CYkC311EmPc4OjBdjVoC9gvD0";

export const imageUrl = "https://image.tmdb.org/t/p";
export const placeholder =
  "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4=";

const moviesInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    accept: "application/json",
  },
  page: 1,
  language: "en-US",
  include_adult: false,
});

export async function getTrendingMovies() {
  const tranding = "/trending/movie/day";

  const response = await moviesInstance.get(tranding);
  return response.data;
}

export async function getDetailsById(movieId) {
  const details = `/movie/${movieId}`;

  const response = await moviesInstance.get(details);
  return response.data;
}

export async function getCastById(movieId) {
  const credits = `/movie/${movieId}/credits`;

  const response = await moviesInstance.get(credits);
  return response.data;
}

export async function getReviewsById(movieId) {
  const reviews = `/movie/${movieId}/reviews`;

  const response = await moviesInstance.get(reviews);
  return response.data;
}

export async function getMovieBySearch(keyWord, page = 1) {
  const searchValue = `/search/movie?query=${keyWord}&page=${page}`;

  const response = await moviesInstance.get(searchValue);
  return response.data;
}
