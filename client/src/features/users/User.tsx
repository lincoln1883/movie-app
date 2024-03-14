import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { editUser } from "./userSlice";
import { BsPencil } from "react-icons/bs";
import moment from "moment";

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
	const [errors, setErrors] = useState({
		email: "",
		password: "",
		username: "",
	});
	const [userData, setUserData] = useState<User | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [editMode, setEditMode] = useState(false); // State variable to toggle edit mode

	const dispatch = useAppDispatch();
	const loading = useAppSelector(
		(state) => state.currentUser.status === "loading"
	);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
		setUserData(user);
	}, []);

	const handleEditProfile = () => {
		setEditMode(true); // Enable edit mode
	};

	const handleCancelEdit = () => {
		setEditMode(false); // Disable edit mode
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			if (file) {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("upload_preset", "shango"); // Change to your Cloudinary preset name

				const response = await fetch(
					"https://api.cloudinary.com/v1_1/dvmwg6zrg/image/upload",
					{
						method: "POST",
						body: formData,
					}
				);
				const data = await response.json();
				setUserData((prevUser) => ({
					...prevUser!,
					profilePicture: data.secure_url,
				}));
			}
			dispatch(editUser(userData!));
			localStorage.setItem("currentUser", JSON.stringify(userData));
			setEditMode(false); // Disable edit mode after submission
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setUserData((prevUser) => ({
			...prevUser!,
			[name]: value,
		}));
		const validations: { [key: string]: (value: string) => string } = {
			email: (val: string) => {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(val) ? "" : "Invalid email address";
			},
			password: (val: string) => {
				const pasRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
				return pasRegex.test(val)
					? ""
					: "Password > 6 characters, 1(A-Z letter & number).";
			},
			username: (val: string) => {
				const userRegex = /^[a-zA-Z0-9]{3,30}$/;
				return userRegex.test(val) ? "" : "Invalid username";
			},
		};

		if (validations[name]) {
			setErrors({ ...errors, [name]: validations[name](value) });
		}
	};

	const handleTextareaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setUserData((prevUser) => ({
			...prevUser!,
			[name]: value,
		}));
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFile(file);
			userData &&
				setUserData({ ...userData, profilePicture: URL.createObjectURL(file) });
		}
	};

	return (
		<>
			{userData && (
				<div>
					{!editMode ? (
						<>
						<h1 className="text-center">User Profile</h1>
							<div className="flex h-full items-center justify-center mx-auto shadow-lg rounded-lg p-3 bg-white">
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
								<div className="self-start flex-1 text-center justify-center h-5">
									<BsPencil
									title="Edit Profile"
										className="mx-auto hover:cursor-pointer"
										onClick={handleEditProfile}
									/>
								</div>
							</div>
						</>
					) : (
						<div className="bg-white shadow-md rounded-lg p-2">
							<h1 className="text-center">Edit Your Profile</h1>
							<div className="flex max-w-full flex-col gap-4">
								<form
									onSubmit={handleSubmit}
									className="w-full"
									encType="multipart/form-data"
								>
									<div>
										<div className="mb-2 block">
											<Label htmlFor="username" value="Username" />
										</div>
										<TextInput
											id="username"
											placeholder="Your username"
											type="text"
											name="username"
											value={userData.username}
											onChange={handleChange}
										/>
										{errors.username && (
											<p className="text-red-500 text-xs">{errors.username}</p>
										)}
									</div>
									<div>
										<div className="mb-2 block">
											<Label htmlFor="firstName" value="FirstName" />
										</div>
										<TextInput
											id="firstName"
											placeholder="Your first name"
											type="text"
											name="firstName"
											value={userData.firstName}
											onChange={handleChange}
										/>
									</div>
									<div>
										<div className="mb-2 block">
											<Label htmlFor="lastName" value="LastName" />
										</div>
										<TextInput
											id="lastName"
											placeholder="Your last name"
											type="text"
											name="lastName"
											value={userData.lastName}
											onChange={handleChange}
										/>
									</div>
									<div>
										<div className="mb-2 block">
											<Label htmlFor="bio" value="Bio" />
										</div>
										<Textarea
											id="bio"
											placeholder="Write a short bio about yourself."
											name="bio"
											value={userData.bio}
											onChange={handleTextareaChange}
										/>
									</div>
									<div>
										<div className="mb-2 block">
											<Label htmlFor="email" value="Email" />
										</div>
										<TextInput
											type="email"
											name="email"
											value={userData.email}
											onChange={handleChange}
											id="email"
											placeholder="Your email"
										/>
										{errors.email && (
											<p className="text-red-500 text-xs">{errors.email}</p>
										)}
									</div>
									<div
										id="fileUpload"
										className="max-w-full mt-2 flex flex-col"
									>
										<label htmlFor="image" className="block">
											Images
											<input
												className="w-full border border-gray-300 rounded bg-white text-gray-800"
												onChange={handleFileChange}
												type="file"
												name="image"
												accept=".png, .jpg, .jpeg"
												id="image"
												placeholder="Upload Image"
											/>
											<p className="text-xs mt-2">JPEG, PNG or JPG</p>
										</label>
									</div>
									<div className="flex gap-1 justify-center mt-2">
										<Button
											type="submit"
											className="w-full"
											outline
											gradientDuoTone="greenToBlue"
										>
											{loading ? "Loading..." : "Save"}
										</Button>
										<Button
											type="button"
											outline
											className="w-full"
											gradientDuoTone="redToYellow"
											onClick={handleCancelEdit}
										>
											Cancel
										</Button>
									</div>
								</form>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default User;
