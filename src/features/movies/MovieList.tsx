import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Movie from "./Movie";
import { fetchMovies } from "./movieSlice";

export default function MovieList() {
	const dispatch = useAppDispatch();
	const movies = useAppSelector((state) => state.movies.movies);

	useEffect(() => {
		dispatch(fetchMovies());
	}, [dispatch]);

	return (
		<>
		<h1 className="text-center text-lg">Popular Movies</h1>
    <div className="flex flex-col sm:flex-row justify-center items-center">
      <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-center sm:gap-3 px-3 pr-3 mb-8">
        {movies.map((movie) => (
          <Movie 
					key={movie.id}
					movie={movie}
          />
        ))}
      </ul>
    </div>
		</>
  );
}