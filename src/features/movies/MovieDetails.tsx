import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchMovieById } from './movieSlice';
import { useEffect } from 'react';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect', id);
    dispatch(fetchMovieById(id as string));
  }, [dispatch, id]);

  const loading = useAppSelector((state) => state.movies.status === 'loading');
  const movies = useAppSelector((state) => state.movies.movie);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!movies) {
    return <h1>No movie found</h1>;
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={goBack}
      >
        Go Back
      </button>
      <div className="flex flex-col justify-center items-center m-auto w-2/4">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">{movies.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
            alt={movies.title}
            className="w-1/2"
          />
          <p className="text-lg">{movies.overview}</p>
          <p className="text-lg">{movies.vote_average}</p>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
