import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import moment from "moment";
import EditProfile from "./EditProfile";

interface User {
	_id: string;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string;
	bio: string;
	createdAt?: string;
	password?: string;
	updatedAt?: string;
}

const User = () => {
	const [userData, setUserData] = useState<User | null>(null);
	const [editMode, setEditMode] = useState(false); // State variable to toggle edit mode

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
		setUserData(user);
	}, []);

	const handleEditProfile = () => {
		setEditMode(true); // Enable edit mode
	};

	const incompleteProfile = () => {
		if (userData) {
			if (
				!userData.firstName ||
				!userData.lastName ||
				!userData.profilePicture ||
				!userData.bio
			) {
				return (
					<div>
						<h1 className="text-center capitalize">
							{userData.username}'s profile
						</h1>
						<div className="flex h-full items-center justify-center mx-auto shadow-lg rounded-lg p-3 bg-white relative">
							<div className="flex flex-col justify-center items-center mt-2 gap-1 w-11/12 py-5">
								<img
									className="rounded-full object-cover w-40 h-40"
									src={userData.profilePicture}
									alt={userData.username}
								/>
								<div className="text-left">
									<h5 className="font-extralight text-pretty">
										<span className="font-semibold text-sm">Username: </span>
										{userData.username}
									</h5>
									<p className="font-extralight text-pretty">
										<span className="font-semibold text-sm">Email: </span>
										{userData.email}
									</p>
									<p className="font-extralight text-pretty">
										<span className="font-semibold text-sm">Full Name: </span>
										{userData.firstName} {userData.lastName}
									</p>
									<p className="font-extralight text-pretty">
										<span className="font-semibold text-sm">Bio: </span>
										{userData.bio}
									</p>
									{userData.createdAt && (
										<p className="font-extralight text-pretty">
											<span className="font-semibold text-sm">Joined: </span>
											{moment(userData.createdAt).format("MMMM Do, YYYY")}
										</p>
									)}
									{userData.updatedAt && (
										<p className="font-extralight text-pretty">
											<span className="font-semibold text-sm">Updated: </span>
											{moment(userData.updatedAt).fromNow()}
										</p>
									)}
									<p className="text-yellow-500 text-xs">
										Please take a moment to complete your profile!
									</p>
								</div>
							</div>
							<div className="self-start flex-1 text-center justify-center h-5 absolute top-4 right-4">
								<BsPencil
									title="Edit Profile"
									className="mx-auto hover:cursor-pointer"
									onClick={handleEditProfile}
								/>
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div>
						<h1 className="text-center">{userData.username}'s Profile</h1>
						<div className="flex h-full items-center justify-center mx-auto shadow-lg rounded-lg p-3 bg-white relative">
							<div className="flex flex-col justify-center items-center mt-2 gap-1 w-11/12 py-5">
								<img
									className="rounded-full object-cover w-40 h-40"
									src={userData.profilePicture}
									alt={userData.username}
								/>
								<div className="text-left">
									<h5 className="font-extralight text-pretty">
										<span className="font-semibold text-sm">Username: </span>
										{userData.username}
									</h5>
									<p className="font-extralight text-pretty">
										<span className="font-semibold text-sm">Email: </span>
										{userData.email}
									</p>
									<p className="font-extralight text-pretty">
										<span className="font-semibold text-sm">Full Name: </span>
										{userData.firstName} {userData.lastName}
									</p>
									<p className="font-extralight text-pretty">
										<span className="font-semibold text-sm">Bio: </span>
										{userData.bio}
									</p>
									{userData.createdAt && (
										<p className="font-extralight text-pretty">
											<span className="font-semibold text-sm">Joined: </span>
											{moment(userData.createdAt).format("MMMM Do, YYYY")}
										</p>
									)}
									{userData.updatedAt && (
										<p className="font-extralight text-pretty">
											<span className="font-semibold text-sm">Updated: </span>
											{moment(userData.updatedAt).fromNow()}
										</p>
									)}
								</div>
							</div>
							<div className="self-start flex-1 text-center justify-center h-5 absolute top-4 right-4">
								<BsPencil
									title="Edit Profile"
									className="mx-auto hover:cursor-pointer"
									onClick={handleEditProfile}
								/>
							</div>
						</div>
					</div>
				);
			}
		}
	};

	return (
		<>
			{!editMode ? (
				incompleteProfile()
			) : (
				<EditProfile
					userData={userData as User}
					setUserData={setUserData}
					setEditMode={setEditMode}
				/>
			)}
		</>
	);
};

export default User;
