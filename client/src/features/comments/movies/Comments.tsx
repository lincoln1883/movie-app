import { Avatar } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import moment from "moment";
import { useEffect } from "react";
import CommentLikes from "./CommentLikes";
import { fetchAllUsers, fetchUser } from "../../users/userSlice";
import { useParams } from "react-router-dom";
import { fetchComments } from "./commentSlice";

const Comments = () => {
	const users = useAppSelector((state) => state.users.users);
	const comments = useAppSelector((state) => state.comments.comments);

	const dispatch = useAppDispatch();
	const { id } = useParams();

	useEffect(() => {
		const me = JSON.parse(localStorage.getItem("currentUser") || "{}");
		if (!comments && !users) {
			dispatch(fetchComments());
			dispatch(fetchAllUsers());
			dispatch(fetchUser(me._id));
		}
	}, [dispatch, comments, users]);

	const createdDate = (date: string | undefined) => {
		return moment(date).fromNow();
	};

	const findAuthor = (userId: string) => {
		return users!.find((user) => user._id === userId);
	};

	const postComments = comments.filter((comment) => comment.postId === id);

	return (
		<div className="grid gap-1 w-full my-1">
			{!postComments.length && (
				<p className="text-sm mt-2 text-center">Be the first to comment</p>
			)}
			<div className="m-1">
				{postComments.map((comment) => {
					const author = findAuthor(comment.userId);
					return (
						<div
							key={comment._id}
							className="m-1 rounded-md bg-slate-200 border flex gap-1 px-1"
						>
							<Avatar
								className="self-start border border-solid border-black w-6 h-6 rounded-full mt-1"
								size={"xs"}
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
										{createdDate(comment?.createdAt)}
									</p>
								</div>
								<p className="text-xs mt-2 w-full">{comment.comment}</p>
								<hr className="border border-solid m-1 border-gray-200 w-full" />
								<div className="flex justify-between items-center w-full gap-1 px-1">
									<div className="flex items-center gap-2 w-3/4">
										{comment?.likes && (
											<CommentLikes id={comment?._id} />
										)}
									</div>
									<div className="self-end w-1/4">
										{postComments[0].likes && (
											postComments[0].likes.length <= 1 ? (
											<p className="text-xs text-end text-gray-500">
												{postComments[0]?.numberOfLikes} like
											</p>
										) : (
											<p className="text-xs text-end text-gray-500">
												{postComments[0]?.numberOfLikes} likes
											</p>
										))}
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
