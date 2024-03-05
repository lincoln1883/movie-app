import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import AppFooter from "./Footer";

const Layout = () => {
	return (
		<div className="min-w-screen min-h-screen">
			<header>
				<NavBar />
			</header>
			<main className="min-h-screen w-full mt-24 flex flex-col bg-gray-100">
				<div className="flex justify-center items-center">
					<Outlet />
				</div>
			</main>
			<AppFooter />
		</div>
	);
};

export default Layout;
