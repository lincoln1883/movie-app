import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMessage } from "react-icons/fa6";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Link } from "react-router-dom";
import { useEffect } from "react";
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
		likes?: [];
		comments?: [];
		reviews?: string;
		createdAt?: string | undefined;
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
		if (!likes) {
			dispatch(fetchPosts());
			dispatch(getLikes());
		}
	}, [dispatch, likes]);

	// count the number of comments
	const commentCount = comments.filter(
		(comment) => comment.postId === post._id
	).length;

	// count the number of likes
	const likeCount = likes.filter((like) => like.postId === post._id).length;

	return (
		<>
			{users && (
				<div className="flex flex-col rounded-xl shadow-md bg-white">
					<div className="flex flex-col py-1">
						<div
							key={users?._id}
							className="flex justify-between items-center px-2"
						>
							<Link to={`/profile/${users?._id}`}>
								<div className="flex items-center gap-2 mb-1">
									<img
										src={
											users?.profilePicture || "https://via.placeholder.com/150"
										}
										alt={users?.username}
										className="w-10 h-10 rounded-full"
									/>
									<div className="flex flex-col">
										<h3 className="text-xs font-bold">{users?.username}</h3>
										<div className="flex gap-1">
											<p className="text-xs text-gray-400">
												{createdDate(post?.createdAt)}
											</p>
										</div>
									</div>
								</div>
							</Link>
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
						<Link to={`/posts/${post._id}`}>
							<p className="text-xs px-4 my-3">{post.reviews}</p>
							<div className="flex flex-col justify-center items-center w-100 sm:flex-row">
								<div className="flex items-center justify-center w-full h-80 sm:w-1/4 sm:h-2/4 m-1">
									<img
										src={`https://image.tmdb.org/t/p/w500${post.poster_path}`}
										alt={post.title}
										className="w-full h-full sm:w-4/6 sm:h-5/6 flex-1"
									/>
								</div>
								<div className="flex flex-col w-full sm:w-1/2 gap-6 flex-1">
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
									<div className="flex justify-end gap-1 mx-2">
										<div>
											{likeCount <= 1 ? (
												<div className="flex justify-end items-center gap-0.5">
													<p className="text-xs text-gray-400">
														{post.likes?.length} like
													</p>
												</div>
											) : (
												<div className="flex justify-end items-center gap-0.5">
													<p className="text-xs text-gray-400">
														{post.likes?.length} likes
													</p>
												</div>
											)}
										</div>
										<div>
											{commentCount <= 1 ? (
												<div className="flex justify-end items-center gap-0.5">
													<p className="text-xs text-gray-400">
														{post.comments?.length} comment
													</p>
												</div>
											) : (
												<div className="flex justify-end items-center gap-0.5">
													<p className="text-xs text-gray-400">
														{post.comments?.length} comments
													</p>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default Post;
