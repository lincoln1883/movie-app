import PostList from "../features/posts/PostList";
import { Link } from "react-router-dom";

const Feed = () => {
	return (
		<div className="flex flex-col gap-1 m-3">
			<Link
				to="/home"
				className="underline text-center font-semibold hover:cursor-pointer hover:text-slate-400"
			>
				Create a new post
			</Link>
			<div className="grid grid-cols-1 sm:grid-cols-6 gap-1">
				<div className="col-span-1">
					<div className="p-4">something goes here</div>
				</div>
				<div className="sm:col-start-2 col-span-3">
					<PostList />
				</div>
				<div className="sm:col-start-5 col-span-2">
					<div className="p-4">something goes here</div>
				</div>
			</div>
		</div>
	);
};

export default Feed;
