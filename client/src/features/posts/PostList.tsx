import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchPosts } from "./postSlice";
import { fetchAllUsers } from "../users/userSlice";
import Post from "./Post";
import { Spinner } from "flowbite-react";
import { fetchComments } from "../comments/movies/commentSlice";
import { getLikes } from "../likes/likeSlice";

type User = {
	_id: string;
	username: string;
	email: string;
	profilePicture: string;
};

const PostList = () => {
	const posts = useAppSelector((state) => state.posts.posts);
	const status = useAppSelector((state) => state.posts.status);
	const error = useAppSelector((state) => state.posts.error);
	const users = useAppSelector((state) => state.users.users);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (posts.length === 0) {
			dispatch(fetchPosts());
			dispatch(fetchComments());
			dispatch(getLikes());
		}
	}, [dispatch, posts]);

	useEffect(() => {
		if (users?.length === 0) {
			dispatch(fetchAllUsers());
		}
	}, [users, dispatch]);

	const findUser = (userId: string) => {
		return users?.find((user) => user._id === userId) as User;
	};

	return (
		<>
			{status === "loading" && <Spinner aria-label="Default status example" />}
			{status === "failed" && <div>{error}</div>}
			<div className="flex flex-col gap-1">
				{posts.map((post) => {
					const author = findUser(post.userId);
					return <Post key={post._id} post={post} users={author} />;
				})}
			</div>
		</>
	);
};

export default PostList;
