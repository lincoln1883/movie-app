import { Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Movie {
	id: number;
	title: string;
	release_date: string;
	poster_path: string;
}

type Props ={
  movieId: string | undefined;
}

const SimilarMovies = ({movieId}:Props) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchMovies = async () => {
		setLoading(true);
		try {
			const apiKey = import.meta.env.VITE_APP_API_KEY;
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`
			);
			const data = await response.json();
			setMovies(data.results);
		} catch (error) {
			console.error("Error fetching movies:", error);
		}
		setLoading(false);
	};

  useEffect(() => {
    fetchMovies();
  }, [movieId]);

	return (
		<>
			<div className="flex flex-col items-start bg-inherit overflow-auto">
				{loading ? (
					<Spinner className="mt-8" />
				) : (
					<div className="flex">
						{movies.map((movie: Movie) => (
							<Link to={`/movies/${movie.id}`} key={movie.id}>
								<div
									key={movie.id}
									className="flex-shrink-0 w-40 h-64 mr-4 overflow-hidden group relative"
								>
									<img
										className="w-full h-full object-cover transform scale-12 transition duration-500 ease-in-out group-hover:scale-10 rounded-lg shadow-xl"
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

export default SimilarMovies;
