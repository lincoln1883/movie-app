import { FormEvent, useEffect } from "react";
import { createLike, disLike, getLikes } from "./likeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa";
import { useParams } from "react-router-dom";

const CreateLike = () => {
	const likes = useAppSelector((state) => state.likes.likes);
	const me = JSON.parse(localStorage.getItem("currentUser") as string);

	const dispatch = useAppDispatch();
	const {id} = useParams();

	useEffect(() => {
		if(likes.length === 0 && !likes){
			dispatch(getLikes());
		}
	}, [dispatch, likes]);

	const handleLike = (e: FormEvent) => {
		e.preventDefault();
		dispatch(
			createLike({ userId: me._id as string, postId: id as string })
		);
	};

	const isLiked = () => {
		return (
			Array.isArray(likes) &&
			likes.some((like) => like.userId === me._id && like.postId === id)
		);
	};

	const handleDeleteLike = () => {
		const likeId = likes?.find((like) => like.userId === me._id && like.postId === id)?._id;
		dispatch(
			disLike({
				userId: me._id as string,
				postId: id as string,
				_id: likeId as string,
			})
		);
	};

	return (
		<>
			{isLiked() ? (
				<button
					type="submit"
					className="text-xs hover:cursor-pointer  hover:text-indigo-400 text-indigo-600 "
					title="DisLike"
					onClick={handleDeleteLike}
				>
					<FaRegThumbsDown />
				</button>
			) : (
				<form onSubmit={handleLike}>
					<input type="hidden" name="userId" value={me._id} />
					<input type="hidden" name="postId" value={id} />
					<button
						type="submit"
						className="text-xs hover:cursor-pointer  hover:text-indigo-400 text-indigo-600 "
						title="Like"
					>
						<FaRegThumbsUp />
					</button>
				</form>
			)}
		</>
	);
};

export default CreateLike;
