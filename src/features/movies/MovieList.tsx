import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Movie from './Movie';
import { fetchMovies } from './movieSlice';
import { Spinner } from 'flowbite-react';
import MovieSearch from './MovieSearch';

const MovieList = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.movies);
  const loading = useAppSelector((state) => state.movies.status === 'loading');

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div>
      <MovieSearch />
      <h1 className="text-center text-3xl font-semibold mb-2 capitalize">
        Popular movies
      </h1>
      {loading ? (
        <Spinner aria-label="Default status example" />
      ) : (
        <div className="flex justify-center items-center">
          <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-center sm:gap-2 px-3 pr-3 mb-8">
            {movies.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MovieList