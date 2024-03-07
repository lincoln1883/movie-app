import { Avatar, Spinner } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import moment from "moment";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6";
import { fetchComments, likeComment, unlikeComment } from "./commentSlice";
import { useEffect } from "react";

interface Comment {
	_id?: string;
	userId: string;
	postId: string;
	comment: string;
	createdAt?: string;
	likes?: number | undefined;
}
interface Props {
	postId: string | undefined;
}

const Comments = ({ postId }: Props) => {
	const users = useAppSelector((state) => state.user.users);
	const postState = useAppSelector((state) => state.posts.status === "success");
	const comments = useAppSelector((state) => state.comments.comments);
	const loading = useAppSelector(
		(state) => state.comments.status === "loading"
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (postState) {
			dispatch(fetchComments());
		}
	}, [dispatch, postState]);

	const createdDate = (date: string | undefined) => {
		return moment(date).fromNow();
	};

	const findAuthor = (userId: string) => {
		return users!.find((user) => user._id === userId);
	};

	// Filter comments for the specific post
	const postComments = comments.filter((comment) => comment.postId === postId);

	//count likes
	const countLikes = (comment: Comment) => {
		return comment?.likes;
	};

	// i want to ristrict the user to like a comment once
	const upLike = () => {
		const comment = postComments[0];
		dispatch(likeComment(comment._id!.toString()));
	};

	const downLike = () => {
		const comment = postComments[0];
		dispatch(unlikeComment(comment._id!.toString()));
	};

	return (
		<div className="flex flex-col gap-1 w-full my-1">
			{loading && <Spinner />}
			{!postComments.length && (
				<p className="text-sm mt-2 text-center">Be the first to comment</p>
			)}
			<div className="bg-slate-100 m-1">
				{postComments.map((comment) => {
					const author = findAuthor(comment.userId);
					return (
						<div key={comment._id} className="m-1 rounded-md bg-white flex gap-1 px-1">
							<Avatar
								className="self-start border border-solid border-black w-10 h-10 rounded-full mt-1"
								size={"sm"}
								img={author?.profilePicture}
								alt={author?.username}
								rounded
							/>
							<div className="flex flex-col justify-start items-center flex-1 p-1">
								<div className="ps-1 w-full">
									<h4 className="text-xs font-semibold capitalize">
										{author?.username}
									</h4>
									<p className="text-xs text-gray-500">
										Commented:
										{createdDate(comment?.createdAt)}
									</p>
								</div>
								<p className="text-xs mt-2 w-full">{comment.comment}</p>
								<hr className="border border-solid m-1 border-gray-200 w-full" />
								<div className="flex justify-between items-center w-full gap-2 px-1">
									<div className="flex items-center gap-2 w-full">
										<button
											type="submit"
											title="like"
											onClick={upLike}
											className="text-md text-gray-500 hover:cursor-pointer active:text-blue-300"
										>
											<FaRegThumbsUp className="text-gray-500 hover:cursor-pointer active:text-blue-300" />
										</button>
										<button
											type="submit"
											title="dislike"
											onClick={downLike}
											className="text-md text-gray-500 hover:cursor-pointer active:text-blue-300"
										>
											<FaRegThumbsDown
												type="submit"
												className="text-gray-500 hover:cursor-pointer active:text-blue-300"
											/>
										</button>
									</div>
									<div className="flex">
										<span className="text-xs text-gray-500 w-12">
											{countLikes(comment)} likes
										</span>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Comments;
