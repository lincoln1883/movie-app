import moment from "moment";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import CommentsModal from "../comments/movies/CommentsModal";
import CreateLike from "../likes/CreateLike";
import Comments from "../comments/movies/Comments";
import { fetchPost } from "./postSlice";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { fetchComments } from "../comments/movies/commentSlice";
import { fetchAllUsers, followUser } from "../users/userSlice";
import { getLikes } from "../likes/likeSlice";
import { FaMinus, FaPlus } from "react-icons/fa";

type User = {
	_id?: string;
	username: string;
	profilePicture?: string | undefined;
	followers?: [];
	following?: [];
};

const PostDetails = () => {
	const [author, setAuthor] = useState<User | null>(null);
	const post = useAppSelector((state) => state.posts.post);
	const users = useAppSelector((state) => state.users.users);
	const currentUser = useAppSelector((state) => state.users.user);
	
	const dispatch = useAppDispatch();
	const Navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchPost(id as string));
		dispatch(getLikes());
		dispatch(fetchAllUsers());
		dispatch(fetchComments());
	}, [dispatch, id]);

	useEffect(() => {
		if (post && users) {
			const postAuthor = users?.filter((user) => user._id === post.userId);
			setAuthor(postAuthor[0]);
		}
	}, [post, users, dispatch]);

	const createdDate = (date: string | undefined) => {
		return moment(date).fromNow();
	};

	const goBack = () => {
		Navigate(-1);
	};

	// check the follow array for the current user
	// if the user is in the array, display unfollow
	// if the user is not in the array, display follow

	const isFollowed = () => {
		if (
			currentUser?.following &&
			currentUser.following.some((follow: string) => {
				return follow === author?._id;
			})
		) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div className="grid grid-cols-1 gap-1 sm:grid-cols-6 bg-inherit">
			<div className="ps-3 h-6 flex gap-1">
				<IoMdArrowRoundBack
					title="Go Back"
					className="text-lg self-center hover:text-blue-700 cursor-pointer"
					onClick={goBack}
				/>
				<span className="self-center text-xs">Go Back</span>
			</div>
			<div className="col-span-1 sm:col-start-2 sm:col-span-4">
				<div className="flex flex-col py-3 sm:mx-4 bg-white p-2">
					<div className="flex justify-between items-center">
						<Link to={`/profile/${author?._id}`}>
							<div
								key={author?._id}
								className="flex justify-between items-center gap-1 ps-0.5"
							>
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
										<p className="text-xs text-gray-400">
											{createdDate(post?.createdAt)}
										</p>
									</div>
								</div>
							</div>
						</Link>
						<div>
							{currentUser?._id !== author?._id && isFollowed() ? (
								<div className="flex items-center gap-1">
									<button
										title="unfollow"
										type="button"
										className="text-xs text-gray-400 hover:text-indigo-400"
										onClick={() => dispatch(followUser(author?._id as string))}
									>
										<FaMinus />
									</button>
									<p className="text-xs">unfollow</p>
								</div>
							) : (
								<div className="flex items-center gap-1">
									<button
										title="follow"
										type="button"
										className="text-xs text-gray-400 hover:text-indigo-400"
										onClick={() => dispatch(followUser(author?._id as string))}
									>
										<FaPlus />
									</button>
									<p className="text-xs">follow</p>
								</div>
							)}
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

					<div className="flex justify-between gap-2 mt-1">
						<div className="flex">
							<div className="flex items-center justify-center gap-1 p-2">
								<CreateLike />
								<span className="text-xs">Like</span>
							</div>
							<div className="flex items-center justify-center gap-1 p-2">
								<CommentsModal />
								<span className="text-xs">Comment</span>
							</div>
						</div>

						<div className="flex justify-end items-center gap-1 px-1">
							<div>
								{!post?.likes?.length ? (
									<p className="text-xs text-gray-400">
										{post?.likes?.length} likes
									</p>
								) : post.likes.length <= 1 ? (
									<div className="flex justify-end items-center gap-0.5">
										<p className="text-xs text-gray-400">
											{post?.likes?.length}
										</p>
										<p className="text-xs text-gray-400">like</p>
									</div>
								) : (
									<div className="flex justify-end items-center gap-0.5">
										<p className="text-xs text-gray-400">
											{post?.likes?.length}
										</p>
										<p className="text-xs text-gray-400">likes</p>
									</div>
								)}
							</div>
							<div>
								{!post?.comments?.length ? (
									<p className="text-xs text-gray-400">
										{post?.comments?.length} comments
									</p>
								) : post.comments.length <= 1 ? (
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
					</div>
					<Comments />
				</div>
			</div>
		</div>
	);
};

export default PostDetails;
