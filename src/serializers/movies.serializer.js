export const serializeOneMovie = (movie) => ({
  id: movie.url.split("/")[movie.url.split("/").length - 2],
  name: movie.title,
  episode: movie.episode_id,
  director: movie.director,
  producer: movie.producer,
  release_date: movie.release_date,
});

export const moviesSerializer = (movies) => {
  movies.next = movies.next && movies.next.split("?")[1];
  movies.previous = movies.previous && movies.previous.split("?")[1];
  const results = movies.results.map((movie) => serializeOneMovie(movie));
  movies.results = results;

  return movies;
};
