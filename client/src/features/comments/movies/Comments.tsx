import { Avatar, Spinner } from "flowbite-react";
import { useAppSelector } from "../../../redux/store";
import moment from "moment";
import { FaRegThumbsUp } from "react-icons/fa6";

interface Comment {
	_id?: string;
	userId: string;
	postId: string;
	comment: string;
	createdAt?: string;
	likes: number;
}
interface Props {
	postId: string | undefined;
}

const Comments = ({ postId }: Props) => {
	const users = useAppSelector((state) => state.user.users);
	const comments = useAppSelector((state) => state.comments.comments);
	const loading = useAppSelector(
		(state) => state.comments.status === "loading"
	);

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
		return comment.likes;
	};

	return (
		<div className="flex flex-col gap-1 w-full my-1">
			<hr className="my-2"/>
			{loading && <Spinner />}
			{!postComments.length && (
				<p className="text-sm text-center">No comments yet</p>
			)}
			<div>
				{postComments.map((comment: Comment) => {
					const author = findAuthor(comment.userId);
					return (
						<div key={comment._id} className="mb-2">
							<div className="flex items-center gap-2">
								<Avatar
									img={author?.profilePicture}
									alt={author?.username}
									rounded
								/>
								<div className="ps-1">
									<h4 className="text-sm font-semibold capitalize">
										{author?.username}
									</h4>
									<p className="text-xs text-gray-500">
										Commented:
										{createdDate(comment?.createdAt)}
									</p>
								</div>
							</div>
							<p className="text-sm mt-2">{comment.comment}</p>
							<div className="flex justify-between items-center gap-2 mt-2 mx-3">
								<FaRegThumbsUp className="text-gray-500 hover:cursor-pointer active:text-blue-300" />
								{comment?.likes <= 1 ? (
									<span className="text-xs text-gray-500">
										{countLikes(comment)} like
									</span>
								) : (
									<span className="text-xs text-gray-500">
										{countLikes(comment)} likes
									</span>
								)}
							</div>
						</div>
					);
				})}
				<hr />
			</div>
		</div>
	);
};

export default Comments;
