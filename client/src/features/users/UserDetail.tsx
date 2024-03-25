import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUser } from "./userSlice";
import { fetchPosts }  from "../posts/postSlice"
import { IoMdArrowRoundBack } from "react-icons/io";
import { Card } from "flowbite-react";

const UserDetail = () => {
	const user = useAppSelector((state) => state.users.user);
	const posts = useAppSelector((state) => state.posts.posts);
	const dispatch = useAppDispatch();

	const { id } = useParams();
	const Navigate = useNavigate();

	useEffect(() => {
		if (id) {
			dispatch(fetchUser(id));
			dispatch(fetchPosts())
		}
	}, [id, dispatch]);

	if (!user) {
		return <div>Loading...</div>;
	}

	const goBack = () => {
		Navigate(-1);
	};

	const userPosts = posts.filter((post) => post.userId === id);

	const timeline = userPosts.sort((a, b) => {
		if (!a.createdAt || !b.createdAt) return 0;
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);
		return dateB.getTime() - dateA.getTime();
	});

	return (
		<section className="w-full h-full">
			<div>
				<div className="ps-3 h-6 flex gap-1">
					<IoMdArrowRoundBack title="Go Back" className="text-lg self-center hover:text-blue-700 cursor-pointer" onClick={goBack}
					/>
					<span className="self-center text-xs">Go Back</span>
				</div>
				<h1 className="text-center">{user.username}'s Profile Page</h1>
			</div>
			<div className="grid grid-cols-1 gap-1 sm:grid-cols-6 lg:grid-cols-8">
				<Card key={user._id}
					className="col-span-1 sm:col-start-1 sm:col-span-3 lg:col-start-2 lg:col-span-3 mb-2 relative"
				>
					<div>
						<div className="right-0 top-20 mt-4 rounded-l-full absolute text-center font-bold text-xs text-white px-2 py-1 bg-orange-500">
              {user?.followers?.length} Followers
						</div>
						<div className="right-0 top-12 mt-4 rounded-l-full absolute text-center font-bold text-xs text-white px-2 py-1 bg-orange-500">
              {user?.following?.length} Following
						</div>
						<div className="flex justify-center items-center">
							<img
								alt={user.username}
								src={user?.profilePicture || "https://via.placeholder.com/150"}
								className="rounded-full -mt-6 border-4 object-center object-cover border-white h-40 w-40"
							/>
						</div>
						<div className="py-2 px-2">
							<div className=" font-bold font-title text-center">
								{user?.username}
							</div>
							<div className="text-sm font-light text-center my-2">
								{user.bio || "No bio available"}
							</div>
						</div>
					</div>
				</Card>
				<div className="sm:col-start-4 sm:col-span-3 lg:col-start-5 ">
					<div className="flex flex-col justify-center gap-1">
						{timeline.length === 0 && (
							<p className="text-center">
								You have created {userPosts.length} posts.
							</p>
						)}
						<div className="flex flex-col gap-1">
							{timeline.map((post) => (
								<Card key={post._id} horizontal className="h-58">
									<img
										src={`https://image.tmdb.org/t/p/w500${post.poster_path}`}
										alt={post.title}
										className="h-56"
									/>
									<div className="flex flex-col justify-center gap-0.5 flex-1">
										<h3 className="text-xs">
											<span className="text-md font-bold">Title: </span>
											{post.title}
										</h3>
										<p className="line-clamp-4 text-xs">
											<span className="text-md font-bold">Details: </span>
											{post.overview || "No details available"}
										</p>
										<p className="text-xs">
											<span className="text-md font-bold">Released: </span>
											{post.release_date}
										</p>
									</div>
								</Card>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UserDetail;
