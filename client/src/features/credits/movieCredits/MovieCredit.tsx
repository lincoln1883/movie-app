import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchMovieCredits } from "./movieCreditSlice";
import { Spinner } from "flowbite-react";

const MovieCredit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const credits = useAppSelector((state) => state.movieCredits.credits);
  const loading = useAppSelector((state) => state.movieCredits.status === "loading");

  useEffect(() => {
    dispatch(fetchMovieCredits(id as string));
  }, [dispatch, id]);

  const newCast = credits?.slice(0, 4);

  return (
      <div className="lg:self-center flex-1">
        {newCast.length === 0 && <h1>No cast found</h1> }
        {loading && <Spinner aria-label="Default status example" />}
        <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 sm:gap-2 h-full">
          {newCast.map((credit) => (
            <li key={credit.id} className="flex flex-col justify-center item-center flex-2">
              {credit.profile_path === null ||
              credit.profile_path === undefined ? (
                <img
                  className="w-20 h-20 rounded-full self-center"
                  src="https://via.placeholder.com/300x450?text=No+Image"
                  alt={credit.name}
                />
              ) : (
                <img
                  className="w-20 h-20 object-cover rounded-full self-center"
                  src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
                  alt={credit.name}
                />
              )}
              <div className="flex flex-col justify-center item-center p-1">
                <h3 className="text-center text-sm font-semibold">{credit.name.slice(0, 20)}</h3>
                <p className="text-center font-thin sm:text-sm text-xs">
                  {credit.character.slice(0, 20)}
                </p>
                <p className="text-center font-thin text-sm">
                  {credit.known_for_department}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default MovieCredit;
