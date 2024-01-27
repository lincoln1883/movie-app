import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchShowById } from './showSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

const ShowDetails = () => {
  const { id } = useParams();
  const Navigate = useNavigate();

  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.shows.show);
  const loading = useAppSelector((state) => state.shows.status === 'loading');

  useEffect(() => {
    dispatch(fetchShowById(id as string));
  }, [dispatch, id]);

  if (!show) {
    return <h1>Not found</h1>;
  }

  const goBack = () => {
    Navigate(-1);
  };

  return (
    <div className="m-5 sm:mx-12 mt-5">
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
            <div className="flex items-center justify-center w-full h-3/4 sm:w-full sm:h-full flex-1">
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                className="w-3/4 h-3/4 sm:w-full sm:h-3/4 rounded-lg shadow-md"
              />
            </div>
            <div className="flex flex-col justify-center gap-1 items-start flex-1 px-3">
              <h3 className="text-lg px-1">
                <span className="text-lg font-bold">Title: </span>
                {show.name}
              </h3>
              <p className="line-clamp-4 sm:text-lg px-1">
                <span className="text-lg font-bold">Details: </span>
                {show.overview}
              </p>
              <p className="text-lg px-1">
                <span className="text-lg font-bold">Rating: </span>
                {show.vote_average}
              </p>
              <p className="text-lg px-1">
                <span className="text-lg font-bold">First Air Date: </span>
                {show.first_air_date}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetails;
