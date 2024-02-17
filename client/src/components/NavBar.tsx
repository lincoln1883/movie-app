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
			className="bg-gradient-to-r from-green-300 to-blue-200 h-30 py-5"
		>
			<Navbar.Brand as={Link} href="#">
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
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
									alt="User settings"
									img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
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
							<Dropdown.Item>Dashboard</Dropdown.Item>
							<Dropdown.Item>Settings</Dropdown.Item>
							<Dropdown.Item>Favorites</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item
								className="hover:cursor-pointer"
								onClick={handleLogout}
							>
								Sign out
							</Dropdown.Item>
						</Dropdown>
						<Navbar.Toggle  />
					</div>
					<Navbar.Collapse>
						<Navbar.Link as={Link} to="/" active>
							Home
						</Navbar.Link>
						<Navbar.Link as={Link} to="/movies">
							Movies
						</Navbar.Link>
						<Navbar.Link as={Link} to="/shows">
							Shows
						</Navbar.Link>
					</Navbar.Collapse>
				</>
			) : null
			}
		</Navbar>
	);
};

export default NavBar;
