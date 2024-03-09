import React from "react";
import TrendingMovieToday from "../features/movies/TrendingDay";
import TrendingMovieWeek from "../features/movies/TrendingWeek";

const Trending = () => {
	const [activeTab, setActiveTab] = React.useState("today");

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div className="w-full h-full overflow-hidden">
			<div className="flex flex-col gap-1 object-cover m-3">
				<div className="flex justify-start items-center gap-1">
					<h4 className="text-lg font-semibold">Trending</h4>
					<nav className="flex gap-1">
						{activeTab === "today" ? (
							<button
								type="button"
								className="rounded-lg bg-blue-400 px-2 text-white hover:bg-blue-300 hover:text-black "
								onClick={() => handleTabChange("today")}
							>
								Today
							</button>
						) : (
							<button
								type="button"
								className="rounded-lg bg-gray-300 px-2 text-gray-500 hover:bg-blue-300 hover:text-black "
								onClick={() => handleTabChange("today")}
							>
								Today
							</button>
						)}
						{activeTab === "week" ? (
							<button
								type="button"
								className="rounded-lg bg-blue-400 px-2 text-white hover:bg-blue-300 hover:text-black "
								onClick={() => handleTabChange("week")}
							>
								This Week
							</button>
						) : (
							<button
								type="button"
								className="rounded-lg bg-gray-300 px-2 text-gray-500 hover:bg-blue-300 hover:text-black "
								onClick={() => handleTabChange("week")}
							>
								This Week
							</button>
						)}
					</nav>
				</div>
				{activeTab === "today" && <TrendingMovieToday />}
				{activeTab === "week" && <TrendingMovieWeek />}
			</div>
		</div>
	);
};

export default Trending;
