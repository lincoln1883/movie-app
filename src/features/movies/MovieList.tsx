import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Movie from './Movie';
import { fetchMovies } from './movieSlice';
import { Pagination, Spinner } from 'flowbite-react';
import MovieSearch from './MovieSearch';

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.movies);
  const loading = useAppSelector((state) => state.movies.status === 'loading');

  useEffect(() => {
    const page = currentPage.toString();
    dispatch(fetchMovies(page));
  }, [dispatch, currentPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      <div className="flex items-center justify-center mb-3">
        <Pagination
          layout="table"
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
};

export default MovieList;
