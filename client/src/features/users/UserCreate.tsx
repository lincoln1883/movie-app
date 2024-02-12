import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { FormEvent, useState } from "react";
import { createUser } from "./userSlice";
import { clearError } from "../auth/authSlice";

interface User {
	username: string;
	email: string;
	password: string;
}

const UserCreate = () => {
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [userInfo, setUserInfo] = useState<User>({
		username: "",
		email: "",
		password: "",
	});
	const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.registeredUser.error);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(createUser(userInfo));
		setUserInfo({ username: "", email: "", password: "" });
    setButtonDisabled(true);
    dispatch(clearError());
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (e: any | KeyboardEvent) => {
    setButtonDisabled(false);
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex flex-col justify-center items-center w-80 h-screen mx-2 sm:min-h-screen sm:min-w-full">
			<h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
			<form
				className="flex w-full max-w-md flex-col gap-4"
				onSubmit={handleSubmit}
			>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="username" value="Your name" />
					</div>
					<TextInput
						id="username"
						type="text"
						name="username"
						placeholder="Your username"
						required
						onChange={handleChange}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email" value="Your email" />
					</div>
					<TextInput
						id="email"
						type="email"
						name="email"
						placeholder="Your email"
						required
						onChange={handleChange}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password" value="Your password" />
					</div>
					<TextInput
						id="password"
						type="password"
						name="password"
						placeholder="Your password"
						required
						onChange={handleChange}
					/>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="remember" />
					<Label htmlFor="remember">Remember me</Label>
				</div>
				{buttonDisabled ? (
					<Button type="submit" disabled={buttonDisabled}>
						Submit
					</Button>
				) : (
					<Button type="submit">Submit</Button>
				)}
			</form>
			<div className="flex gap-2 text-sm mt-5">
				<span>Have an account?</span>
				<Link to="/sign-in" className="text-blue-500">
					Sign In
				</Link>
			</div>
      {error && <p className="text-red-500">{error}</p>}
		</div>
	);
};

export default UserCreate;
