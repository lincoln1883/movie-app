import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch } from "../redux/store";

const NavBar = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
		window.location.reload();
	};

	return (
		<Navbar
			fluid
			rounded
			className="bg-gradient-to-r to-violet-400 from-purple-200 h-30 py-5 w-full fixed top-0 z-10"
		>
			<Navbar.Brand as={Link} to="/">
				<span className="self-center whitespace-nowrap text-xl font-semibold">
					Pipoca Flics
				</span>
			</Navbar.Brand>
			{token ? (
				<>
					<div className="flex md:order-2">
						<Dropdown
							arrowIcon={false}
							inline
							label={
								<Avatar
									alt={user?.username}
									img={
										`${user?.profilePicture}` ||
										"https://flowbite.com/docs/images/people/profile-picture-5.jpg"
									}
									rounded
								/>
							}
						>
							<Dropdown.Header>
								<span className="block text-sm capitalize">
									{user?.username}
								</span>
								<span className="block truncate text-sm font-medium">
									{user?.email}
								</span>
							</Dropdown.Header>
							<Dropdown.Item>
								<Link to={"/profile"}>Profile</Link>
							</Dropdown.Item>
							<Dropdown.Item>
								<Link to={"/feed"}>Feed</Link>
							</Dropdown.Item>
							<Dropdown.Item>
								<Link to={"/home"}>Home</Link>
							</Dropdown.Item>
							<Dropdown.Item
								className="hover:cursor-pointer"
								onClick={handleLogout}
							>
								Sign out
							</Dropdown.Item>
						</Dropdown>
						{/* <Navbar.Toggle  /> */}
					</div>
					{/* <Navbar.Collapse>
						<Navbar.Link as={Link} to="/home" active>
							Home
						</Navbar.Link>
						<Navbar.Link as={Link} to="/feed">
							Feed
						</Navbar.Link>
						<Navbar.Link as={Link} to="/profile">
							Profile
						</Navbar.Link>
						</Navbar.Collapse> */}
				</>
			) : null}
		</Navbar>
	);
};

export default NavBar;
