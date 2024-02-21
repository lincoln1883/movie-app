import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchPosts } from "./postSlice";
import Post from "./Post";
import { Spinner } from "flowbite-react";

const PostList = () => {
	const posts = useAppSelector((state) => state.posts.posts);
	const status = useAppSelector((state) => state.posts.status);
	const error = useAppSelector((state) => state.posts.error);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchPosts());
		}
	}, [status, dispatch]);
	console.log(posts);

	return (
		<>
			{status === "loading" && <Spinner aria-label="Default status example" />}
			{status === "failed" && <div>{error}</div>}
			<div>
				{posts.map((post) => (
					<Post key={post._id} post={post} />
				))}
			</div>
		</>
	);
};

export default PostList;
