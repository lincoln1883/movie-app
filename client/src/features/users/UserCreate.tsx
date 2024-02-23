import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { FormEvent, useEffect, useState } from "react";
import { createUser,clearError } from "./userSlice";

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
	const navigate = useNavigate();
	const success = useAppSelector((state) => state.user.status);
  const error = useAppSelector((state) => state.user.error);

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

	useEffect(() => {
		if (userInfo.username && userInfo.email && userInfo.password) {
			setButtonDisabled(false);
		}
		if(success === 'success'){
			navigate('/login');
		}
	}, [navigate, userInfo, success]);

	return (
		<div className="flex flex-col justify-start my-10 sm:justify-center items-center w-80 h-full mx-2 sm:min-h-full sm:min-w-full">
			<h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
			<form
				className="flex w-full max-w-md flex-col gap-4"
				onSubmit={handleSubmit}
			>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="username" value="Username" />
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
						<Label htmlFor="email" value="Email" />
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
						<Label htmlFor="password" value="Password" />
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
				<Link to="/login" className="text-blue-500">
					Sign In
				</Link>
			</div>
      {error && <p className="text-red-500">{error}</p>}
		</div>
	);
};

export default UserCreate;
