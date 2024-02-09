import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => (
  <div className="min-w-full overscroll-x-none">
    <header>
      <NavBar />
    </header>
    <main className="min-h-screen ">
      <div className="flex justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </main>
  </div>
);

export default Layout;
