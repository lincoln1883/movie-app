import { Link } from "react-router-dom";

const PopularPage = () => {
	return (
		<div className="w-2/6 mx-auto">
			<ul className="flex justify-between items-center">
				<li>
					<Link to="/movies">Movies</Link>
				</li>
				<li>
					<Link to="/shows">Shows</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/signup">Sign Up</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
			</ul>
		</div>
	);
};

export default PopularPage;
