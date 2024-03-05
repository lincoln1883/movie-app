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
	const [errors, setErrors] = useState({ email: "", password: "" });
	const [userInfo, setUserInfo] = useState<User>({
		email: "",
		password: "",
	});
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector((state) => state.currentUser.error);
	const success = useAppSelector((state) => state.currentUser.status);
	const loading = useAppSelector((state) => state.currentUser.status === "loading");

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
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setButtonDisabled(false);
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

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
		};

		if (validations[name]) {
			setErrors({ ...errors, [name]: validations[name](value) });
		}
	};

	return (
		<div className="flex flex-col m-auto justify-center items-center h-screen">
			<div className="shadow-lg self-center w-11/12 sm:w-2/3 md:w-2/4 rounded-lg bg-white">
				<h1 className="text-2xl font-semibold mt-4 text-center">Login</h1>
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
						{errors.email && (
							<p className="text-red-500 text-xs mt-1">{errors.email}</p>
						)}
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
						{errors.password && (
							<p className="text-red-500 text-xs mt-1">{errors.password}</p>
						)}
					</div>
					<div className="flex items-center gap-2">
						<Checkbox id="remember" />
						<Label htmlFor="remember">Remember me</Label>
					</div>
					<Button
						type="submit"
						disabled={buttonDisabled}
						className="w-full font-semibold"
						outline
						gradientDuoTone="cyanToBlue"
					>
						{loading ? "Loading..." : "Login"}
					</Button>
				</form>
				<div className="flex justify-center gap-2 text-xs sm:text-smm mb-5">
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
