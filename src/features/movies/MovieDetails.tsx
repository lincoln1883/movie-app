import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchMovieById } from './movieSlice';
import { useEffect } from 'react';
import { Spinner } from 'flowbite-react';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovieById(id as string));
  }, [dispatch, id]);

  const loading = useAppSelector((state) => state.movies.status === 'loading');
  const movies = useAppSelector((state) => state.movies.movie);

  if (!movies) {
    return <h1>No movie found</h1>;
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="mx-20 mt-5">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={goBack}
      >
        Go Back
      </button>
      <div className="flex h-screen w-100">
        {loading ? (
          <Spinner aria-label="Default status example" />
          ) : (
            <div className="flex flex-col justify-center items-center w-100 sm:flex-row">
            <div className="flex items-center justify-center w-full h-full flex-1">
              <img
                src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                alt={movies.title}
                className="w-full h-3/4 rounded-lg shadow-md"
              />
            </div>
            <div className="flex flex-col justify-center gap-1 items-start flex-1 px-3">
              <h3 className="text-lg px-1">
                <span className="text-2xl font-bold">Title: </span>
                {movies.title}
              </h3>
              <p className="text-lg px-1">
                <span className="text-2xl font-bold">Details: </span>
                {movies.overview}
              </p>
              <p className="text-lg px-1">
                <span className="text-2xl font-bold">Rating: </span>
                {movies.vote_average}
              </p>
              <p className="text-lg px-1">
                <span className="text-2xl font-bold">Released: </span>
                {movies.release_date}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
