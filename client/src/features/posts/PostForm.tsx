import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { createPost } from "./postSlice";
import { useNavigate } from "react-router-dom";
import { SiMinutemailer } from "react-icons/si";
import Movie from "../movies/Movie";

interface Post {
	movieId: string;
	userId: string;
	title: string;
	overview: string;
	release_date: string;
	poster_path: string;
	rating: number;
	reviews?: string;
}

interface Props {
	movie:Movie;
}

const PostForm = ({movie}: Props) => {
	const [movieDetails, setMovieDetails] = useState<Post>({
		movieId: "",
		userId: "",
		title: "",
		overview: "",
		release_date: "",
		poster_path: "",
		reviews: "",
		rating: 0,
	});

	const user = JSON.parse(localStorage.getItem("currentUser")!) as {
		_id: string;
	};

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const handleFetchMovieDetails = async () => {
			setMovieDetails({
				...movieDetails,
				movieId: movie.id.toString(),
				title: movie.title,
				overview: movie.overview,
				release_date: movie.release_date,
				poster_path: movie.poster_path,
				rating: movie.vote_average,
				userId: user._id,
			});
		};

		handleFetchMovieDetails();
	}, [dispatch, movie, user._id, navigate]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(createPost(movieDetails));
		setMovieDetails({
			movieId: "",
			userId: "",
			title: "",
			overview: "",
			release_date: "",
			poster_path: "",
			rating: 0,
			reviews: "",
		});
	};

	const handleChange = (e: FormEvent) => {
		const { name, value } = e.target as HTMLInputElement;
		setMovieDetails({ ...movieDetails, [name]: value });
	};

	console.log(movieDetails);
	return (
			<div className="flex justify-center items-center py-1 w-full">
				<form className="flex gap-1 items-center flex-1 w-full">
					<textarea
						name="reviews"
						id="reviews"
						onChange={handleChange}
						className="sm:w-96 h-10 p-1 rounded-md border-2 flex-1 border-gray-300 focus:outline-none focus:border-blue-500"
						required
						placeholder="write a review...."
					/>
					<SiMinutemailer
						onClick={handleSubmit}
						type="submit"
						className="h-9 w-9 sm:p-1 py-0 bg-blue-500 text-white rounded-md cursor-pointer"
					/>
				</form>
			</div>
	);
};

export default PostForm;
