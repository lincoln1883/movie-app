import { useState } from "react";
import TrendingMovieToday from "../features/movies/TrendingDay";
import TrendingMovieWeek from "../features/movies/TrendingWeek";

const Trending = () => {
	const [activeTab, setActiveTab] = useState("today");

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div className="w-full h-full overflow-hidden">
			<div className="flex flex-col gap-1 object-cover m-3">
				<div className="flex justify-start items-center gap-1">
					<h4 className="text-lg font-semibold">Trending</h4>
					<nav className="flex bg-violet-400 rounded-full">
						{activeTab === "today" ? (
							<button
								type="button"
								className="rounded-xl bg-blue-300 p-1 text-black w-full h-full hover:bg-blue-300 hover:text-black text-sm"
								onClick={() => handleTabChange("today")}
							>
								Today
							</button>
						) : (
							<button
								type="button"
								className="rounded-xl p-1 bg-inherit text-white hover:bg-blue-300 hover:text-black text-sm"
								onClick={() => handleTabChange("today")}
							>
								Today
							</button>
						)}
						{activeTab === "week" ? (
							<button
								type="button"
								className="rounded-xl bg-blue-300 p-1 text-black w-full h-full hover:bg-blue-300 hover:text-black text-sm"
								onClick={() => handleTabChange("week")}
							>
								Week
							</button>
						) : (
							<button
								type="button"
								className="rounded-xl p-1 bg-inherit text-white hover:bg-blue-300 hover:text-black text-sm"
								onClick={() => handleTabChange("week")}
							>
								Week
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
