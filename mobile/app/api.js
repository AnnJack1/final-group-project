const API_KEY = 'db1144ba74eb71f6a6761ae20bb58664';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

async function fetchFromTmdb(path) {
  const response = await fetch(`${BASE_URL}${path}&api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('TMDB request failed');
  }

  return response.json();
}

export function imageUrl(path) {
  return path ? `${IMAGE_BASE}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
}

export function getTopRated() {
  return fetchFromTmdb('/movie/top_rated?language=en-US&page=1');
}

export function getTrending() {
  return fetchFromTmdb('/trending/movie/week?language=en-US');
}

export function getNowPlaying() {
  return fetchFromTmdb('/movie/now_playing?language=en-US&page=1');
}

export function getPopular() {
  return fetchFromTmdb('/movie/popular?language=en-US&page=1');
}

export function getMovieDetails(id) {
  return fetchFromTmdb(`/movie/${id}?language=en-US`);
}

export function searchMovies(query) {
  return fetchFromTmdb(`/search/movie?language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
}
