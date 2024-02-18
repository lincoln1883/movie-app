import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchShowById } from "./showSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Rating } from "flowbite-react";
import ShowModal from "./ShowModal";
import ShowCredit from "../credits/showCredits/ShowCredit";
import { FaBackspace } from "react-icons/fa";
import ShowCommentsModal from "../comments/shows/ShowCommentsModal";
import Comments from "../comments/shows/Comments";
import { SlLike } from "react-icons/sl";

const ShowDetails = () => {
	const { id } = useParams();
	const Navigate = useNavigate();

	const dispatch = useAppDispatch();
	const show = useAppSelector((state) => state.shows.show);
	const loading = useAppSelector((state) => state.shows.status === "loading");

	useEffect(() => {
		dispatch(fetchShowById(id as string));
	}, [dispatch, id]);

	if (!show) {
		return <h1>No show found</h1>;
	}

	const goBack = () => {
		Navigate(-1);
	};

	const ratingOutOf5 = show.vote_average / 2;
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
							<div className="flex items-center justify-center w-full h-3/4 sm:w-full sm:h-full flex-1">
								<img
									src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
									alt={show.name}
									className="w-full h-full sm:w-full sm:h-3/4 rounded-lg"
								/>
							</div>
							<div className="flex flex-col w-full sm:w-1/2 gap-2">
								<div className="flex flex-col justify-center gap-1 items-start flex-1 px-3">
									<h3 className="text-lg px-1">
										<span className="text-lg font-bold">Title: </span>
										{show.name}
									</h3>
									<p className="line-clamp-4 sm:text-lg px-1">
										<span className="text-lg font-bold">Details: </span>
										{show.overview || "No details available"}
									</p>
									<div className="flex">
										<p className="text-lg px-1 w-full">
											<span className="text-lg font-bold">Rating: </span>
										</p>
										<Rating>{starComponents}</Rating>
									</div>
									<p className="text-lg px-1">
										<span className="text-lg font-bold">First Air Date: </span>
										{show.first_air_date}
									</p>
									<div className="flex justify-center gap-4 items-center py-2 px-1 ">
										<ShowModal show={show} />
										<ShowCommentsModal shows={show} />
										<SlLike className="w-7 h-7 text-2xl hover:cursor-pointer text-blue-500" />
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col justify-center gap-1 items-start flex-1 px-3 my-3 shadow-md p-3">
							<Comments />
						</div>
					</div>
				)}
			</div>
			<hr className="border m-4" />
			<div className="shadow-md p-2">
				<ShowCredit />
			</div>
		</div>
	);
};

export default ShowDetails;
