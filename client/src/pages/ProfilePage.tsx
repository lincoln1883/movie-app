import { useNavigate } from "react-router-dom";
import User from "../features/users/User";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect } from "react";
import { fetchPosts } from "../features/posts/postSlice";
import { IoMdArrowRoundBack } from "react-icons/io";
import Timeline from "../features/users/activities/Timeline";

const ProfilePage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = JSON.parse(localStorage.getItem("currentUser") as string);
	const userId = user?._id as string;
	const posts = useAppSelector((state) => state.posts.posts);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	// filter posts by user id
	const userPosts = posts.filter((post) => post.userId === userId);

	// construct a timeline of posts by user in chronological order (newest first) if there are any
	const timeline = userPosts.sort((a, b) => {
		if (!a.createdAt || !b.createdAt) return 0;
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);
		return dateB.getTime() - dateA.getTime();
	});

	return (
		<div className="flex flex-col gap-2 mx-3 w-full mb-6 bg-slate-100">
			<div className="flex gap-1">
				<IoMdArrowRoundBack
					onClick={() => navigate("/posts")}
					title="Go to Feed"
					className="hover:cursor-pointer text-lg"
				/>
				<span className="text-sm">Go to feed</span>
			</div>
			<div className="grid grid-cols-1 gap-1 sm:grid-cols-6 lg:grid-cols-8">
				<div className="col-span-1 sm:col-start-1 sm:col-span-3 lg:col-start-2 lg:col-span-3 mb-2">
					<User />
				</div>
				<div className="sm:col-start-4 sm:col-span-3 lg:col-start-5 overflow-y-scroll">
					<h1 className="text-center">Recent activities</h1>
					<div className="flex flex-col justify-center gap-1">
						{timeline.length === 0 && (
							<p className="text-center">You have created {userPosts.length} posts.</p>
						)}
						<div className="flex flex-col gap-1">
							{timeline.map((post) => (
								<Timeline key={post._id} post={post} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
