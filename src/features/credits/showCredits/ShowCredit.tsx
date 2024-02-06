import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../redux/store'
import { fetchShowCredits } from './showCreditSlice';
import { Spinner } from 'flowbite-react';

const ShowCredit = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const credits = useAppSelector((state) => state.showCredits.credits)
    const loading = useAppSelector((state) => state.showCredits.status === 'loading')

    useEffect(() => {
        dispatch(fetchShowCredits(id as string))
    }, [dispatch, id])

    const newCast = credits?.slice(0, 6)

  return (
    <>
    <h1 className="text-xl font-bold mb-4">Main Cast</h1>
    <div className="flex justify-center">
      {loading && <Spinner aria-label="Default status example" />}
      <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-center sm:gap-2 px-1 pr-1 mb-8">
        {newCast.map((credit) => (
          <li key={credit.id} className="border-2 rounded-lg shadow-md">
            {credit.profile_path === null ||
            credit.profile_path === undefined ? (
              <img
                className="w-44 h-44 object-cover rounded-t-lg"
                src="https://via.placeholder.com/300x450?text=No+Image"
                alt={credit.name}
              />
            ) : (
              <img
                className="w-44 h-44 object-cover rounded-t-lg"
                src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
                alt={credit.name}
              />
            )}
            <div className="p-1">
              <h3 className="font-semibold">{credit.name.slice(0, 20)}</h3>
              <p className="font-thin text-sm">
                {credit.character.slice(0, 20)}
              </p>
              <p className="font-thin text-sm">
                {credit.known_for_department}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default ShowCredit