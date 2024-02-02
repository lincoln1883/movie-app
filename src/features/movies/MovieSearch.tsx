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
    <div className="flex justify-center items-center my-5 w-auto">
      <div className="flex">
        <form
          className="flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            required
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            onChange={handleChange}
            value={searchTerm}
          />
          <button
            aria-label="search button"
            type="submit"
            className="hover:bg-blue-200:text-white text-blue-500 py-1 px-1 cursor-pointer font-bold rounded"
          >
            <FaSearch className="sm:w-8 h-8" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieSearch;
