import { FormEvent } from "react";
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
	users: {
		_id: string;
		username: string;
		profilePicture: string;
	};
}

const CreateLike = ({ post, users }: Props) => {
	const likes = useAppSelector((state) => state.likes.likes);
	const dispatch = useAppDispatch();

	const handleLike = (e: FormEvent) => {
		e.preventDefault();
		dispatch(createLike({ userId: users._id as string, postId: post._id as string }));
    dispatch(getLikes());
	};

	const userPtId = users?._id as string;
	const postPtId = post?._id as string;
	
  const isLiked = () => {
		const liked =
			Array.isArray(likes) &&
			likes.some((like) => like.userId === userPtId) &&
			likes.some((like) => like.postId === postPtId);
		return liked;
	};

  const handleDeleteLike = () => {
    const likeId = likes?.find((like) => like.userId === userPtId && like.postId === postPtId)?._id;
    dispatch(disLike({ userId: users._id as string, postId: post._id as string , _id: likeId as string}));
    dispatch(getLikes());
  }

	return (
		<>
			{isLiked() ? (
					<button type="submit" className="text-xs" title="DisLike" onClick={handleDeleteLike}>
						<FaRegThumbsDown />
					</button>
			) : (
				<form onSubmit={handleLike}>
					<input type="hidden" name="userId" value={users?._id} />
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
