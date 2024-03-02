import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchUser } from "./userSlice";
import { Link } from "react-router-dom";

const Profile = () => {
	const user = JSON.parse(localStorage.getItem("currentUser") as string);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const userId = user?._id as string;
		dispatch(fetchUser(userId));
	}, [dispatch, user]);

	return (
		<div>
			<div className="bg-white relative shadow p-2 rounded-lg text-gray-800 hover:shadow-lg hover:transition-transform ease-in-out">
				<div className="right-0 mt-4 rounded-l-full absolute text-center font-bold text-xs text-white px-2 py-1 bg-orange-500">
					0 Follower
				</div>
				<img
					alt=""
					src="https://images.unsplash.com/photo-1564497717650-489eb99e8d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1963&q=80"
					className="h-32 rounded-lg w-full object-cover"
				/>
				<div className="flex justify-center">
					<img
						alt={user.username}
						src={user?.profilePicture || "https://via.placeholder.com/150"}
						className="rounded-full -mt-6 border-4 object-center object-cover border-white mr-2 h-16 w-16"
					/>
				</div>
				<div className="py-2 px-2">
					<div className=" font-bold font-title text-center">
						<Link className="underline" to="/profile">{user?.username}</Link>
					</div>
					<div className="text-sm font-light text-center my-2">
						{user.bio || "No bio available"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
