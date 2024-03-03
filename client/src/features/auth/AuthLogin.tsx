import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { FormEvent, useEffect, useState } from "react";
import { loginUser } from "./authSlice";

interface User {
	email: string;
	password: string;
}

const AuthLogin: React.FC = () => {
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [userInfo, setUserInfo] = useState<User>({
		email: "",
		password: "",
	});
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector((state) => state.currentUser.error);
	const success = useAppSelector((state) => state.currentUser.status);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(loginUser(userInfo));
		setUserInfo({ email: "", password: "" });
		setButtonDisabled(true);
	};

	useEffect(() => {
		if (userInfo.email && userInfo.password) {
			setButtonDisabled(false);
		}
		if (success === "success") {
			navigate("/profile");
		}
	}, [navigate, dispatch, userInfo, success]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (e: any | KeyboardEvent) => {
		setButtonDisabled(false);
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex flex-col m-auto justify-center items-center h-screen">
			<h1 className="text-2xl font-semibold mb-4">Login</h1>
			<div className="shadow-lg self-center w-11/12 sm:w-2/3 md:w-2/4 rounded-lg bg-white">
				<form
					className="flex max-w-full flex-col gap-4 p-5"
					onSubmit={handleSubmit}
				>
					<div className="w-full">
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
					<div className="w-full">
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
					<Button type="submit" disabled={buttonDisabled} className="w-full">
						Login
					</Button>
				</form>
				<div className="flex gap-2 text-sm mb-5 ps-5">
					<span>Don't have an account?</span>
					<Link to="/signup" className="text-blue-500">
						Sign Up
					</Link>
				</div>
				{error && <p className="text-red-500 text-center">{error}</p>}
			</div>
		</div>
	);
};

export default AuthLogin;
