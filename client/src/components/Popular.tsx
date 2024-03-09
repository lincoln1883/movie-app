import { useState } from "react";
import PaginateShow from "../features/shows/PopularShows";
import PopularMovie from "../features/movies/PopularMovies";

const Popular = () => {
	const [activeTab, setActiveTab] = useState("movies");

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div className="w-full h-full overflow-hidden">
			<div className="flex flex-col gap-1 object-cover m-3">
				<div className="flex justify-start items-center gap-1">
					<h4 className="sm:text-lg font-semibold">Popular</h4>
					<nav className="flex gap-1">
						{activeTab === "movies" ? (
							<button
								type="button"
								className="rounded-lg bg-blue-400 px-2 text-white hover:bg-blue-300 hover:text-black"
								onClick={() => handleTabChange("movies")}
							>
								Movies
							</button>
						) : (
							<button
								type="button"
								className="rounded-lg bg-gray-300 px-2 text-gray-500 hover:bg-blue-300 hover:text-black"
								onClick={() => handleTabChange("movies")}
							>
								Movies
							</button>
						)}
						{activeTab === "shows" ? (
							<button
								type="button"
								className="rounded-lg bg-blue-400 px-2 text-white hover:bg-blue-300 hover:text-black"
								onClick={() => handleTabChange("shows")}
							>
								shows
							</button>
						) : (
							<button
								type="button"
								className="rounded-lg bg-gray-300 px-2 text-gray-500 hover:bg-blue-300 hover:text-black"
								onClick={() => handleTabChange("shows")}
							>
								Shows
							</button>
						)}
					</nav>
				</div>
				{activeTab === "movies" && <PopularMovie />}
				{activeTab === "shows" && <PaginateShow />}
			</div>
		</div>
	);
};

export default Popular;
