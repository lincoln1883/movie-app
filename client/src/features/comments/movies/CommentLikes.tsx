///import { useEffect } from "react";
import { fetchComments, likeComment } from "./commentSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa";
import { getLikes } from "../../likes/likeSlice";

interface Props {
	id: string | undefined;
}

const CommentLikes = ({ id }: Props) => {
  const comments = useAppSelector((state) => state.comments.comments);
	const me = JSON.parse(localStorage.getItem("currentUser") as string);

	const dispatch = useAppDispatch();


	const handleLike = () => {
		dispatch(
			likeComment(id as string)
		);
		dispatch(fetchComments());
		dispatch(getLikes());
	};

	const isLiked = () => {
    const myLikes = comments.filter((comment) => comment._id === id).map((comment) => comment.likes);
    return myLikes[0]?.includes(me._id)
	};

	return (
		<>
			{isLiked() ? (
				<div className="flex gap-1">
					<button
						type="button"
						className="text-xs hover:cursor-pointer  hover:text-indigo-400 text-indigo-600 "
						title="DisLike"
						onClick={handleLike}
					>
						<FaRegThumbsDown />
					</button>
					<span className="font-thin text-xs">dislike</span>
				</div>
			) : (
				<div className="flex gap-1">
					<button
						type="button"
						className="text-xs hover:cursor-pointer  hover:text-indigo-400 text-indigo-600 "
						title="Like"
						onClick={handleLike}
					>
						<FaRegThumbsUp />
					</button>
					<span className="font-thin text-xs">like</span>
				</div>
			)}
		</>
	);
};

export default CommentLikes;
