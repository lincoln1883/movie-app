import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {fetchShows} from './showSlice'
import { Spinner } from 'flowbite-react';
import Show from './Show';
import ShowSearch from './ShowSearch';

const ShowList = () => {
	const dispatch = useAppDispatch();
	const shows = useAppSelector((state) => state.shows.shows);
	const loading = useAppSelector((state) => state.shows.status === 'loading');

	useEffect(() => {
		dispatch(fetchShows());
	}, [dispatch]);

	return (
    <div>
      <ShowSearch /> 
      <h1 className="text-center text-3xl font-semibold mb-2 capitalize">Popular shows</h1>
      {loading ? (
        <Spinner aria-label="Default status example" />
      ) : (
        <div className="flex justify-center items-center">
          <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-center sm:gap-2 px-3 pr-3 mb-8">
            {shows.map((show) => (
              <Show key={show.id} show={show} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShowList