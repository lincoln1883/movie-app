import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import AppFooter from "./Footer";
import TokenExpirationChecker from "./CheckTokenExpiration";

const Layout = () => {
	return (
		<div className="min-w-full min-h-screen m-0 p-0">
			<header>
				<NavBar />
			</header>
			<main className="h-full w-full p-0 m-0 flex flex-col">
				<div className="flex justify-center items-center">
					<TokenExpirationChecker />
					<Outlet />
				</div>
			</main>
			<AppFooter />
		</div>
	);
};

export default Layout;
