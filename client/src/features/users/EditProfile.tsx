import React, {ChangeEvent, useState,} from 'react'
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { editUser } from "./userSlice";
import { useAppDispatch, useAppSelector } from '../../redux/store';

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

interface EditProfileProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
}

const EditProfile = ({setEditMode,userData,setUserData}: EditProfileProps) => {
	const [errors, setErrors] = useState({
		email: "",
		password: "",
		username: "",
	});

	const [file, setFile] = useState<File | null>(null);
	const dispatch = useAppDispatch();
	const loading = useAppSelector(
		(state) => state.currentUser.status === "loading"
	);

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

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
		event: ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setUserData((prevUser) => ({
			...prevUser!,
			[name]: value,
		}));
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFile(file);
			userData &&
				setUserData({
					...userData,
					profilePicture: URL.createObjectURL(file),
				});
		}
	};

	const handleCancelEdit = () => {
		setEditMode(false); // Disable edit mode
	};

	return (
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
					<div id="fileUpload" className="max-w-full mt-2 flex flex-col">
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
	);
}

export default EditProfile