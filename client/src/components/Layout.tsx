import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import AppFooter from "./Footer";
import TokenExpirationChecker from "./CheckTokenExpiration";

const Layout = () => (
  <div className="min-w-full overscroll-x-none">
    <header>
      <NavBar />
    </header>
    <main className="min-h-screen ">
      <div className="flex justify-center items-center">
        <TokenExpirationChecker />
        <Outlet />
      </div>
      <AppFooter />
    </main>
  </div>
);

export default Layout;
