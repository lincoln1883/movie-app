import { Avatar } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import moment from "moment";
import { fetchComments } from "./commentSlice";
import { useEffect } from "react";
import CommentLikes from "./CommentLikes";

interface Props {
	postId: string | undefined;
}

const Comments = ({ postId }: Props) => {
	const users = useAppSelector((state) => state.user.users);
	const comments = useAppSelector((state) => state.comments.comments);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchComments());
	}, [dispatch]);

	const createdDate = (date: string | undefined) => {
		return moment(date).fromNow();
	};

	const findAuthor = (userId: string) => {
		return users!.find((user) => user._id === userId);
	};

	// Filter comments for the specific post
	const postComments = comments.filter((comment) => comment.postId === postId);

	return (
		<div className="flex flex-col gap-1 w-full my-1">
			{!postComments.length && (
				<p className="text-sm mt-2 text-center">Be the first to comment</p>
			)}
			<div className="bg-slate-100 m-1">
				{postComments.map((comment) => {
					const author = findAuthor(comment.userId);
					return (
						<div
							key={comment._id}
							className="m-1 rounded-md bg-white flex gap-1 px-1"
						>
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
										<CommentLikes id={comment?._id} />
									</div>
									<div className="flex">
										<span className="text-xs text-gray-500 w-12 text-center">
											{comment.likes && comment.likes.length}{" "}
											{comment.likes && comment.likes.length < 2
												? "like"
												: "likes"}
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
