import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchUser } from "./userSlice";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";

const Profile = () => {
	const user = JSON.parse(localStorage.getItem("currentUser") as string);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const userId = user?._id as string;
		dispatch(fetchUser(userId));
	}, [dispatch, user]);

	return (
			<Card className="bg-white relative shadow rounded-lg text-gray-800 hover:shadow-lg hover:transition-transform ease-in-out">
				<div className="right-0 top-5 mt-4 rounded-l-full absolute text-center font-bold text-xs px-2 py-1 bg-slate-300">
					{user?.following?.length} Following
				</div>
				<div className="flex justify-center">
					<img
						alt={user?.username}
						src={user?.profilePicture || "https://via.placeholder.com/150"}
						className="rounded-full -mt-3 border-4 object-center object-cover border-white h-32 w-32"
					/>
				</div>
				<div className="py-2 px-2">
					<div className=" font-bold font-title text-center">
						<Link className="underline" to="/profile">{user?.username}</Link>
					</div>
					<div className="text-sm font-light text-center my-2">
						{user?.bio || "No bio available"}
					</div>
				</div>
			</Card>
	);
};

export default Profile;
