import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchMovieCredits } from "./creditSlice";

const MovieCredit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const credits = useAppSelector((state) => state.credits.credits);
  const loading = useAppSelector((state) => state.credits.status === "loading");

  console.log(credits);

  useEffect(() => {
    dispatch(fetchMovieCredits(id as string));
  }, [dispatch, id]);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Main Cast</h1>
      <div className="flex">
        {loading && <h1>Loading...</h1>}
        <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-center sm:gap-2 px-1 pr-1 mb-8">
          {credits?.map((credit) => (
            <li key={credit.id} className="border-2 rounded-lg shadow-md">
              <img
                className="w-40 h-44 object-cover rounded-t-lg"
                src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
                alt={credit.name}
              />
              <div className="p-1">
                <h3 className="font-semibold">{credit.name.slice(0, 16)}</h3>
                <p className="font-thin text-sm">
                  {credit.character.slice(0, 20)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MovieCredit;
