import { FaRecycle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMessage } from "react-icons/fa6";
import moment from "moment";
import CommentsModal from "../comments/movies/CommentsModal";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Comments from "../comments/movies/Comments";
import CreateLike from "../likes/CreateLike";
import { getLikes } from "../likes/likeSlice";
import { fetchPosts } from "./postSlice";

interface Props {
	post: {
		_id?: string | undefined;
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

type Post = {
	_id: string | undefined;
};

const Post = ({ post, users }: Props) => {
	const comments = useAppSelector((state) => state.comments.comments);
	const likes = useAppSelector((state) => state.likes.likes);

	const dispatch = useAppDispatch();
	const createdDate = (date: string | undefined) => {
		return moment(date).fromNow();
	};

	useEffect(() => {
		dispatch(fetchPosts())
		dispatch(getLikes());
	}, [dispatch])

	// count the number of comments
	const commentCount = comments.filter(
		(comment) => comment.postId === post._id
	).length;

	// count the number of likes
	const likeCount = likes.filter((like) => like.postId === post._id).length;

	return (
		<div className="flex flex-col rounded-xl shadow-md bg-white">
			<div className="flex flex-col py-3">
				<div className="flex justify-between items-center px-2">
					<div className="flex items-center gap-2 mb-1">
						<img
							src={users?.profilePicture || "https://via.placeholder.com/150"}
							alt={users?.username}
							className="w-10 h-10 rounded-full"
						/>
						<div className="flex flex-col">
							<h3 className="text-xs font-bold">{users?.username}</h3>
							<div className="flex gap-1">
								<p className="text-xs text-gray-400">Posted:</p>
								<p className="text-xs text-gray-400">
									{createdDate(post.createdAt)}
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<button
							title="message"
							type="button"
							className="text-xs text-gray-400 hover:text-indigo-400"
						>
							<FaMessage />
						</button>
						<button
							title="Report this post"
							type="button"
							className="text-xs text-gray-400 hover:text-indigo-400"
						>
							<BsThreeDotsVertical />
						</button>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center w-100 sm:flex-row">
					<div className="flex items-center justify-center w-full h-1/4 sm:w-1/4 sm:h-2/4 m-1">
						<img
							src={`https://image.tmdb.org/t/p/w500${post.poster_path}`}
							alt={post.title}
							className="w-full h-1/3 sm:w-4/6 sm:h-5/6 flex-1 object-contain"
						/>
					</div>
					<div className="flex flex-col w-full sm:w-1/2 gap-2 flex-1">
						<div className="flex flex-col justify-center gap-1 items-start flex-1 px-1">
							<h3 className="text-xs px-1">
								<span className="text-md font-bold">Title: </span>
								{post.title}
							</h3>
							<p className="line-clamp-4 text-xs px-1">
								<span className="text-md font-bold">Details: </span>
								{post.overview || "No details available"}
							</p>
							<div className="flex text-xs">
								<p className="text-xs px-1 w-full">
									<span className="text-md font-bold">Rating: </span>
								</p>
								{post.rating / 2}%
							</div>
							<p className="text-xs px-1">
								<span className="text-md font-bold">Released: </span>
								{post.release_date}
							</p>
						</div>
					</div>
				</div>
				<div className="flex justify-end gap-1 px-1">
					<div>
						{likeCount === undefined || null ? (
							"no likes"
						) : likeCount <= 1 ? (
							<div className="flex justify-end items-center gap-0.5">
								<p className="text-xs text-gray-400">{post.likes?.length}</p>
								<p className="text-xs text-gray-400">like</p>
							</div>
						) : (
							<div className="flex justify-end items-center gap-0.5">
								<p className="text-xs text-gray-400">{post.likes?.length}</p>
								<p className="text-xs text-gray-400">likes</p>
							</div>
						)}
					</div>
					<div>
						{commentCount <= 1 ? (
							<div className="flex justify-end items-center gap-0.5">
								<p className="text-xs text-gray-400">{post.comments?.length}</p>
								<p className="text-xs text-gray-400">comment</p>
							</div>
						) : (
							<div className="flex justify-end items-center gap-0.5">
								<p className="text-xs text-gray-400">{post.comments?.length}</p>
								<p className="text-xs text-gray-400">comments</p>
							</div>
						)}
					</div>
				</div>
				<hr className="my-2" />
				<p className="text-xs px-4">{post.reviews}</p>
				<hr className="my-2" />
				<div className="flex justify-evenly mt-1">
					<div className="flex-1 flex items-center justify-center gap-2 hover:cursor-pointer  hover:text-indigo-400 text-indigo-600">
						<CreateLike post={post} />
						<span className="text-xs">Like</span>
					</div>
					<div className="flex-1 flex items-center justify-center gap-2 hover:cursor-pointer  hover:text-indigo-400 text-indigo-600">
						<CommentsModal post={post} />
						<span className="text-xs">Comment</span>
					</div>
					<div className="flex-1 flex items-center justify-center gap-2 hover:cursor-pointer hover:text-indigo-400 text-indigo-600">
						<FaRecycle />
						<span className="text-xs">Repost</span>
					</div>
				</div>
				<Comments postId={post._id} />
			</div>
		</div>
	);
};

export default Post;
