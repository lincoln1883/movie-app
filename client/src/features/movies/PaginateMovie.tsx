import { Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
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
			<div className="flex justify-between p-2">
				<h4 className="text-lg font-semibold sm:font-bold">Popular Movies</h4>
				<Link to={"/movies"} className="sm:text-lg underline mb-2">
					Show more
				</Link>
			</div>
			<div className="flex flex-col items-start bg-inherit overflow-auto">
				{loading ? (
					<Spinner className="mt-8" />
				) : (
					<div className="flex overflow-x-scroll">
						{movies.map((movie: Movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
							<div
								key={movie.id}
								className="flex-shrink-0 w-40 h-64 mr-4 overflow-hidden rounded-lg shadow-md group relative"
							>
								<img
									className="w-full h-full object-cover transform scale-12 transition duration-500 ease-in-out group-hover:scale-10"
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
								/>
               </div>
              </Link>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default PaginateMovie;
