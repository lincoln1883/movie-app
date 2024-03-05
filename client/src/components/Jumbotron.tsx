import { Link } from "react-router-dom";
import gif from "../assets/animation-icon-png-16.jpg";

const Jumbotron = () => {
	// render a gif and a welcome message

	return (
		<div className="flex flex-col justify-center items-center m-auto w-full bg-white h-screen px-3">
			<img
				src={gif}
				alt="Movie gif"
				title="Powered by Icons8.com"
				className="w-32 h-32 mx-auto mb-8 rounded-lg"
			/>
			<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
				Pipoca Flics
			</h1>
			<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
				Explore the latest movies and TV shows Post reviews comment and like.
			</p>
			<div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 w-full">
				<Link
					to={"/login"}
					className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
				>
					Get started
					<svg
						className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 5h12m0 0L9 1m4 4L9 9"
						/>
					</svg>
				</Link>
				<Link
					to={"/about"}
					className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center rounded-lg border bg-slate-300 border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
				>
					Learn more
				</Link>
			</div>
		</div>
	);
};

export default Jumbotron;
