import { useLocation, Link } from 'react-router-dom';
import Movie from '../features/movies/Movie';
import { Navbar } from 'flowbite-react';

const NavBar = () => {
  const location = useLocation();

  const title = (id: string) => {
    if (location.pathname === '/') {
      return <p>Popular Movies</p>;
    }
    if (location.pathname === `/movies/${id}`) {
      return <p>Movie Details</p>;
    }
    return <p>Movie Details</p>;
  };

  return (
    <Navbar fluid rounded className='bg-blue-200 h-16'>
      <h1 className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Movie App
      </h1>
      <div className="flex justify-center">
        <h1 className="text-2xl">{title(Movie.name)}</h1>
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href='#' active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="#">
          About
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
