import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchMovieById } from "./movieSlice";
import { useEffect, useState } from "react";
import MovieModal from "./MovieModal";
import { Rating, Spinner } from "flowbite-react";
import MovieCredit from "../credits/movieCredits/MovieCredit";
import PostForm from "../posts/PostForm";
import { IoMdArrowRoundBack } from "react-icons/io";

type ProviderType = {
	provider_id: number;
	provider_name: string;
	logo_path: string;
	flatrate: ProviderType[];
};

const MovieDetails = () => {
	const [watchProviders, setWatchProviders] = useState<ProviderType>();
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const Navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchMovieById(id as string));
	}, [dispatch, id]);

	const loading = useAppSelector((state) => state.movies.status === "loading");
	const movie = useAppSelector((state) => state.movies.movie);

	useEffect(() => {
		const getWatchProviders = async () => {
			const apiKey = import.meta.env.VITE_APP_API_KEY;
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`
			);
			const data = await response.json();
			console.log(data);

			const watchProviders = data.results.US || data.results.GB || data.results.BR || data.results.JM;
			setWatchProviders(watchProviders);
		};
		getWatchProviders();
	}, [movie, id]);

	if (!movie) {
		return <h1>No movie found</h1>;
	}

	const goBack = () => {
		Navigate(-1);
	};

	const ratingOutOf5 = movie.vote_average / 2;
	const numberOfStars = Math.round(ratingOutOf5);

	const starComponents = Array.from({ length: numberOfStars }, (_, index) => (
		<Rating.Star key={index} className="sm:text-lg" />
	));

	return (
		<div className="sm:mx-12 lg:mx-40 mx-2">
			<div className="h-10 flex gap-1">
				<IoMdArrowRoundBack
					title="Go Back"
					className="text-lg self-center hover:text-blue-700 cursor-pointer"
					onClick={goBack}
				/>
				<span className="self-center">Go Back</span>
			</div>
			<div className="flex w-100">
				{loading ? (
					<Spinner aria-label="Default status example" />
				) : (
					<div className="flex flex-col text-xs flex-1">
						<div className="flex flex-col justify-center bg-white items-center w-100 sm:flex-row shadow-md sm:h-96 rounded-lg gap-1">
							<div className="flex flex-col items-center justify-center w-full h-full sm:w-full sm:h-ful rounded">
								<img
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
									className="w-full h-64 sm:w-full sm:h-72 rounded-t-lg rounded-b-none sm:rounded-none sm:rounded-l-lg flex-1"
								/>
								<div>
									{watchProviders?.flatrate?.map((provider: ProviderType) => (
										<div
											key={provider.provider_id}
											className="flex gap-2 justify-start items-center w-full py-2 px-1"
										>
											<h5 className="sm:text-lg px-1">
												<span className="sm:text-sm font-semibold">
													Watch Now:{" "}
												</span>
											</h5>
											<img
												src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
												alt={provider.provider_name}
												className="w-5 h-5"
											/>
											<span className="sm:text-sm dark:text-white">
												{provider.provider_name}
											</span>
										</div>
									))}
								</div>
							</div>
							<div className="flex flex-col w-full sm:w-1/2 gap-2">
								<div className="flex flex-col justify-center gap-1 items-start flex-1">
									<h3 className="sm:text-lg px-1">
										<span className="sm:text-lg font-bold">Title: </span>
										{movie.title}
									</h3>
									<p className="line-clamp-5 sm:text-lg px-1">
										<span className="sm:text-lg font-bold">Details: </span>
										{movie.overview || "No details available"}
									</p>
									<div className="flex">
										<p className="sm:text-lg px-1 w-full">
											<span className="sm:text-lg font-bold">Rating: </span>
										</p>
										<Rating>{starComponents}</Rating>
									</div>
									<p className="sm:text-lg px-1">
										<span className="sm:text-lg font-bold">Released: </span>
										{movie.release_date}
									</p>
									<div className="flex gap-2 justify-start items-center w-full py-2 px-1">
										<MovieModal movies={movie} />
										<span className="sm:text-sm font-bold">Watch Trailer</span>
									</div>
									<PostForm movie={movie} />
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="shadow-md p-2 bg-white rounded-lg">
				<MovieCredit />
			</div>
		</div>
	);
};

export default MovieDetails;
