import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => (
  <>
  <header>
    <NavBar />
  </header>
  <main className='h-100 my-5'>
    <Outlet />
  </main>
  <footer className='mb-0'>
    <Footer />
  </footer>
  </>
);

export default Layout;
