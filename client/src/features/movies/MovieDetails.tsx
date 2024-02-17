import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchMovieById } from "./movieSlice";
import { useEffect } from "react";
import MovieModal from "./MovieModal";
import { Rating, Spinner } from "flowbite-react";
import MovieCredit from "../credits/movieCredits/MovieCredit";
import { FaBackspace } from "react-icons/fa";
import Comments from "../comments/movies/Comments";
import CommentModal from "../comments/movies/MovieComments";

const MovieDetails = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const Navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchMovieById(id as string));
	}, [dispatch, id]);

	const loading = useAppSelector((state) => state.movies.status === "loading");
	const movies = useAppSelector((state) => state.movies.movie);

	if (!movies) {
		return <h1>No movie found</h1>;
	}

	const goBack = () => {
		Navigate(-1);
	};

	const ratingOutOf5 = movies.vote_average / 2;
	const numberOfStars = Math.round(ratingOutOf5);

	const starComponents = Array.from({ length: numberOfStars }, (_, index) => (
		<Rating.Star key={index} />
	));

	return (
		<div className="sm:mx-12 sm:m-2">
			<div className="h-10 flex shadow-md p-1">
				<FaBackspace
					className="text-blue-500 text-2xl mx-1 self-center"
					onClick={goBack}
				/>
				<span className="self-center">Go Back</span>
			</div>
			<div className="flex min-h-screen w-100">
				{loading ? (
					<Spinner aria-label="Default status example" />
				) : (
					<div className="flex flex-col">
						<div className="flex flex-col justify-center items-center w-100 sm:flex-row shadow-md p-3">
							<div className="flex items-center justify-center w-full h-3/4 sm:w-full sm:h-full flex-1 m-1">
								<img
									src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
									alt={movies.title}
									className="w-full h-full sm:w-full sm:h-3/4 rounded-lg"
								/>
							</div>
							<div className="flex flex-col w-full sm:w-1/2 gap-2">
								<div className="flex flex-col justify-center gap-1 items-start flex-1 px-3">
									<h3 className="text-lg px-1">
										<span className="text-lg font-bold">Title: </span>
										{movies.title}
									</h3>
									<p className="line-clamp-4 sm:text-lg px-1">
										<span className="text-lg font-bold">Details: </span>
										{movies.overview || "No details available"}
									</p>
									<div className="flex">
										<p className="text-lg px-1 w-full">
											<span className="text-lg font-bold">Rating: </span>
										</p>
										<Rating>{starComponents}</Rating>
									</div>
									<p className="text-lg px-1">
										<span className="text-lg font-bold">Released: </span>
										{movies.release_date}
									</p>
									<div className="flex gap-3 items-center w-full">
										<MovieModal movies={movies} />
										<CommentModal movies={movies} />
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col justify-center items-start flex-1 px-3 my-3 shadow-md p-3">
							<Comments />
						</div>
					</div>
				)}
			</div>
			<hr className="border m-4" />
			<div className="shadow-md p-2">
				<MovieCredit />
			</div>
		</div>
	);
};

export default MovieDetails;
