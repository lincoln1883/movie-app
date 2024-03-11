import { Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Show = {
	id: string | number;
	name: string;
	poster_path: string;
	vote_average: number;
	first_air_date: string;
};

type Props = {
	seriesId: string | undefined;
};

const SimilarSeries = ({ seriesId }: Props) => {
	const [shows, setShows] = useState<Show[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchMovies = async () => {
		setLoading(true);
		try {
			const apiKey = import.meta.env.VITE_APP_API_KEY;
			const response = await fetch(
				`https://api.themoviedb.org/3/tv/${seriesId}/similar?api_key=${apiKey}`
			);
			const data = await response.json();
			setShows(data.results);
		} catch (error) {
			console.error("Error fetching movies:", error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchMovies();
	}, [seriesId]);

	return (
		<>
        {shows.length === 0 && <p className="text-center">No similar series found</p>}
			<div className="flex flex-col items-start bg-inherit overflow-auto">
				{loading ? (
					<Spinner className="mt-8" />
				) : (
					<div className="flex">
						{shows.map((show: Show) => (
              <Link to={`/shows/${show.id}`} key={show.id}>
								<div
									key={show.id}
									className="flex-shrink-0 w-40 h-64 mr-4 overflow-hidden group relative"
                  >
									<img
										className="w-full h-full object-cover transform scale-12 transition duration-500 ease-in-out group-hover:scale-10 rounded-lg shadow-xl"
										src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
										alt={show.name}
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

export default SimilarSeries;