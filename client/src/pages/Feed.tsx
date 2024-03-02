import PostList from "../features/posts/PostList";
import { Link } from "react-router-dom";
import Profile from "../features/users/ProfileCard";

const Feed = () => {
	return (
		<div className="flex flex-col gap-1 m-3">
			<div className="flex justify-center items-center mb-1">
				<Link
					to="/home"
					className="text-center font-semibold hover:cursor-pointer hover:text-slate-400 mx-auto w-full sm:w-1/2"
				>
					<p className="bg-slate-300 py-1 px-4 rounded-lg w-full">
						Create a post
					</p>
				</Link>
			</div>
			<div className="grid grid-cols-1 gap-1 sm:grid-cols-6 lg:grid-cols-8">
				<div className="sm:col-start-1 sm:col-span-2 lg:col-start-2">
					<Profile />
				</div>
				<div className="sm:col-start-3 sm:col-span-4 lg:col-start-4">
					<PostList />
				</div>
			</div>
		</div>
	);
};

export default Feed;
