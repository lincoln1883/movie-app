import { FormEvent, useEffect } from "react";
import { createLike, disLike, getLikes } from "./likeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa";

interface Props {
	post: {
		_id?: string;
		movieId: string;
		userId: string;
		title: string;
		overview: string;
		release_date: string;
		poster_path: string;
		rating: number;
		likes?: string[];
		comments?: string[];
		reviews?: string;
		createdAt?: string;
	};
}

const CreateLike = ({ post }: Props) => {
	const likes = useAppSelector((state) => state.likes.likes);
	const me = JSON.parse(localStorage.getItem("currentUser") as string);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getLikes());
	}, [dispatch]);

	const handleLike = (e: FormEvent) => {
		e.preventDefault();
		dispatch(
			createLike({ userId: me._id as string, postId: post._id as string })
		);
		dispatch(getLikes());
	};

	const postPtId = post?._id as string;

	const isLiked = () => {
		return (
			Array.isArray(likes) &&
			likes.some((like) => like.userId === me._id && like.postId === postPtId)
		);
	};

	const handleDeleteLike = () => {
		const likeId = likes?.find(
			(like) => like.userId === me._id && like.postId === postPtId
		)?._id;
		dispatch(
			disLike({
				userId: me._id as string,
				postId: post._id as string,
				_id: likeId as string,
			})
		);
		dispatch(getLikes());
	};

	return (
		<>
			{isLiked() ? (
				<button
					type="submit"
					className="text-xs"
					title="DisLike"
					onClick={handleDeleteLike}
				>
					<FaRegThumbsDown />
				</button>
			) : (
				<form onSubmit={handleLike}>
					<input type="hidden" name="userId" value={me._id} />
					<input type="hidden" name="postId" value={post?._id} />
					<button type="submit" className="text-xs" title="Like">
						<FaRegThumbsUp />
					</button>
				</form>
			)}
		</>
	);
};

export default CreateLike;
