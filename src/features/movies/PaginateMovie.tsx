import { Spinner } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const PaginateMovie = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMovies = async (page: number) => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`,
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  };


  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    onPageChange(currentPage);
    fetchMovies(currentPage);
  }, [currentPage]);

  return (
    <>
      <Link to={'/movies'} className="font-bold text-xl underline mb-2">
        Popular Movies
      </Link>
      <div className="flex flex-col items-start bg-inherit overflow-auto">
        {loading ? (
          <Spinner className="mt-8" />
        ) : (
          <div className="flex overflow-x-auto">
            {movies.map((movie: Movie) => (
              <div
                key={movie.id}
                className="flex-shrink-0 w-40 h-64 mr-4 overflow-hidden rounded-lg shadow-md group"
              >
                <img
                  className="w-full h-full object-cover transform scale-12 transition duration-500 ease-in-out"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PaginateMovie;
