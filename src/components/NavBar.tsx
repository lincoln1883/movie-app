import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar fluid rounded className='bg-blue-200 h-30 py-5'>
      <h1 className="sm:self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Movie App
      </h1>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to='/' active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to='/movies'>
          Movies
        </Navbar.Link>
        <Navbar.Link as={Link} to='/shows'>
          Shows
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
