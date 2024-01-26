import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => (
  <div className='min-w-full overscroll-x-none'>
    <header>
      <NavBar />
    </header>
    <main className="h-screen ">
      <Outlet />
      <Footer />
    </main>
  </div>
);

export default Layout;
