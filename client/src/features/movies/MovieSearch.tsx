import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchMovieBySearch } from "./movieSlice";
import { FormEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.movies.movies);

  const [searchResults, setSearchResults] = useState("");

  useEffect(() => {
    if (searchTerm) {
      const timer = setTimeout(() => {
        setSearchResults(searchTerm);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  if (!movies) {
    return <h1>No movie found</h1>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any | KeyboardEvent) => {
    setSearchTerm(e.currentTarget.value);
    setSearchResults(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchMovieBySearch(searchResults));
  };

  return (
		<div className="flex justify-center items-center m-auto w-full mb-3">
			<form
				className="flex justify-center w-4/5 sm:w-2/4 items-center border-2 mx-5 sm:mx-auto border-gray-300 px-0.5 bg-white h-10 rounded-lg text-sm"
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					placeholder="Search..."
					required
					className="bg-white px-1 text-sm outline-none border-none w-80 flex-1"
					onChange={handleChange}
					value={searchTerm}
				/>
				<button
					aria-label="search button"
					type="submit"
					className="hover:bg-blue-200:text-white text-blue-500 py-1 px-1 cursor-pointer font-bold rounded  focus:outline-none"
				>
					<FaSearch className="w-6 h-6" />
				</button>
			</form>
		</div>
	);
};

export default MovieSearch;
