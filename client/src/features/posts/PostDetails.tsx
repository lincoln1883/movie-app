import moment from "moment";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { FaMessage } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import CommentsModal from "../comments/movies/CommentsModal";
import CreateLike from "../likes/CreateLike";
import Comments from "../comments/movies/Comments";
import { fetchPost } from "./postSlice";
import { useParams } from "react-router-dom";

type User = {
	_id?: string;
	username: string;
	profilePicture?: string | undefined;
}


const PostDetails = () => {
	const [author, setAuthor] = useState<User | null>(null);
	const [likeState, setLikeState] = useState<number>(0);

	const post = useAppSelector((state) => state.posts.post);
	const users = useAppSelector((state) => state.user.users);
	const likes = useAppSelector((state) => state.likes.likes);
	const dispatch = useAppDispatch();

	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchPost(id as string));
	}, [dispatch, id]);

	useEffect(() => {
		if (post) {
			const foundLikes = likes?.filter((like) => like.postId === id);
			setLikeState(foundLikes.length);
		}
	},[post, likes, id]);

	useEffect(() => {
		if (post && users) {
			const postAuthor = users?.filter((user) => user._id === post.userId);
			setAuthor(postAuthor[0]);
		}
	}, [post, users]);

	const createdDate = (date: string | undefined) => {
		return moment(date).fromNow();
	};

	const likeCount = likes?.filter((like) => like.postId === id).length;
	const commentCount = post?.comments?.length;

	return (
		<div className="grid grid-cols-1 gap-1 sm:grid-cols-6 bg-inherit">
			<div className="col-span-1 sm:col-start-2 sm:col-span-4">
				<div className="flex flex-col py-3 sm:mx-4 bg-white p-2">
					<div className="flex justify-between items-center px-2">
						<div className="flex items-center gap-2 mb-1">
							<img
								src={
									author?.profilePicture || "https://via.placeholder.com/150"
								}
								alt={author?.username}
								className="w-10 h-10 rounded-full"
							/>
							<div className="flex flex-col">
								<h3 className="text-xs font-bold">{author?.username}</h3>
								<div className="flex gap-1">
									<p className="text-xs text-gray-400">Posted:</p>
									<p className="text-xs text-gray-400">
										{createdDate(post?.createdAt)}
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
					<p className="text-xs px-4 my-3">{post?.reviews}</p>
					<div className="flex flex-col justify-center items-center w-100 sm:flex-row">
						<div className="flex items-center justify-center w-full h-80 sm:w-1/4 sm:h-2/4 m-1">
							<img
								src={`https://image.tmdb.org/t/p/w500${post?.poster_path}`}
								alt={post?.title}
								className="w-full h-full sm:w-4/6 sm:h-5/6 flex-1"
							/>
						</div>
						<div className="flex flex-col w-full sm:w-1/2 gap-2 flex-1">
							<div className="flex flex-col justify-center gap-1 items-start flex-1 px-1">
								<h3 className="text-xs px-1">
									<span className="text-md font-bold">Title: </span>
									{post?.title}
								</h3>
								<p className="line-clamp-4 text-xs px-1">
									<span className="text-md font-bold">Details: </span>
									{post?.overview || "No details available"}
								</p>
								<div className="flex text-xs">
									{post?.rating && (
										<p className="text-xs px-1 w-full">
											<span className="text-md font-bold">Rating: </span>
											{post?.rating / 2} %
										</p>
									)}
								</div>
								<p className="text-xs px-1">
									<span className="text-md font-bold">Released: </span>
									{post?.release_date}
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-end gap-1 px-1">
						<div>
							{likeState ? (
								<div className="flex justify-end items-center gap-0.5">
									<p className="text-xs text-gray-400">{likeCount}</p>
									<p className="text-xs text-gray-400">like</p>
								</div>
							) : (
								<div className="flex justify-end items-center gap-0.5">
									<p className="text-xs text-gray-400">{likeCount}</p>
									<p className="text-xs text-gray-400">likes</p>
								</div>
							)}
						</div>
						<div>
							{commentCount === undefined || null ? (
								"no comments"
							) : commentCount <= 1 ? (
								<div className="flex justify-end items-center gap-0.5">
									<p className="text-xs text-gray-400">
										{post?.comments?.length}
									</p>
									<p className="text-xs text-gray-400">comment</p>
								</div>
							) : (
								<div className="flex justify-end items-center gap-0.5">
									<p className="text-xs text-gray-400">
										{post?.comments?.length}
									</p>
									<p className="text-xs text-gray-400">comments</p>
								</div>
							)}
						</div>
					</div>
					<div className="flex justify-start gap-2 mt-1">
						<div className="flex items-center justify-center gap-1 text-indigo-600 p-2">
							<CreateLike />
							<span className="text-xs">Like</span>
						</div>
						<div className="flex items-center justify-center gap-1 text-indigo-600 p-2">
							<CommentsModal />
							<span className="text-xs">Comment</span>
						</div>
					</div>
					<Comments />
				</div>
			</div>
		</div>
	);
};

export default PostDetails;
