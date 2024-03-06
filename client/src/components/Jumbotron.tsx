import { Link } from "react-router-dom";
import gif from "../assets/animation-icon-png-16.jpg";

const Jumbotron = () => {
	return (
		<div className="flex flex-col justify-center items-center m-auto w-full bg-white h-screen px-3">
			<img
				src={gif}
				alt="Movie gif"
				title="Powered by Icons8.com"
				className="w-32 h-32 mx-auto mb-8 rounded-lg"
			/>
			<h1
				className="mb-4 text-4xl text-purple-500 font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl"
			>
				Pipoca Flics
			</h1>
			<div className="mx-3 w-11/12 overflow-hidden">
			<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 text-nowrap  animate-marquee">
				Explore the latest movies and tv shows, post a review, comment on and like posts and comments made by other users.
			</p>
			</div>
			<div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 w-full gap-2">
				<Link
					to={"/login"}
					className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-violet-500 hover:text-white rounded-lg border hover:border-none hover:bg-violet-500 border-violet-800 focus:ring-violet-300 dark:focus:ring-blue-900"
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
					className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white hover:text-violet-500 rounded-lg border bg-violet-300 border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
				>
					Learn more
				</Link>
			</div>
		</div>
	);
};

export default Jumbotron;
