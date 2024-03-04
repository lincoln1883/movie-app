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

const UserSignUp = () => {
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});
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

	useEffect(() => {
		if (userInfo.username && userInfo.email && userInfo.password) {
			setButtonDisabled(false);
		}
		if(success === 'success'){
			navigate('/login');
		}
	}, [navigate, userInfo, success]);

	return (
		<div className="flex flex-col m-auto justify-center items-center h-screen">
			<div className="shadow-lg self-center w-11/12 sm:w-2/3 md:w-2/4 rounded-lg bg-white">
				<h1 className="text-2xl font-semibold mt-4 text-center">Sign Up</h1>
				<form
					className="flex w-full flex-col gap-4 p-5"
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
						{errors.email && (
							<p className="text-red-500 text-xs mt-1">{errors.email}</p>
						)}
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
						{errors.password && (
							<p className="text-red-500 text-xs mt-1">{errors.password}</p>
						)}
					</div>
					<div className="flex items-center gap-2">
						<Checkbox id="remember" />
						<Label htmlFor="remember">Remember me</Label>
					</div>
					{buttonDisabled ? (
						<Button
							type="submit"
							disabled={buttonDisabled}
							outline
							gradientDuoTone="cyanToBlue"
						>
							Submit
						</Button>
					) : (
						<Button type="submit">Submit</Button>
					)}
				</form>
				<div className="flex justify-center gap-2 text-xs sm:text-sm mb-5">
					<span>Have an account?</span>
					<Link to="/login" className="text-blue-500">
						Sign In
					</Link>
				</div>
				{error && <p className="text-red-500">{error}</p>}
			</div>
		</div>
	);
};

export default UserSignUp;
