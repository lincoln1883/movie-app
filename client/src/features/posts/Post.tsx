import { FaRecycle, FaRegThumbsUp } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

interface Props {
	post: {
		_id?: string;
		movieId: string;
		userId: string;
		title: string;
		overview: string;
		release_date: string;
		poster_path: string;
		rating: number;
		likes?: string[];
		comments?: string[];
	};
}

const Post = ({ post }: Props) => {
	return (
		<div className="flex flex-col rounded-lg bg-white">
			<div className="flex flex-col shadow-md p-3">
				<div className="flex flex-col justify-center items-center w-100 sm:flex-row">
					<div className="flex items-center justify-center w-full h-1/4 sm:w-1/4 sm:h-2/4 m-1">
						<img
							src={`https://image.tmdb.org/t/p/w500${post.poster_path}`}
							alt={post.title}
							className="w-full h-1/3 sm:w-4/6 sm:h-5/6 rounded-lg flex-1 object-contain"
						/>
					</div>
					<div className="flex flex-col w-full sm:w-1/2 gap-2 flex-1">
						<div className="flex flex-col justify-center gap-1 items-start flex-1 px-1">
							<h3 className="text-xs px-1">
								<span className="text-md font-bold">Title: </span>
								{post.title}
							</h3>
							<p className="line-clamp-4 text-xs px-1">
								<span className="text-md font-bold">Details: </span>
								{post.overview || "No details available"}
							</p>
							<div className="flex text-xs">
								<p className="text-xs px-1 w-full">
									<span className="text-md font-bold">Rating: </span>
								</p>
								{post.rating / 2}%
							</div>
							<p className="text-xs px-1">
								<span className="text-md font-bold">Released: </span>
								{post.release_date}
							</p>
						</div>
					</div>
				</div>
				<hr className="my-2" />
				<div className="flex justify-evenly mt-1">
					<div className="flex-1 flex items-center justify-center gap-2 hover:cursor-pointer  hover:text-indigo-400 text-indigo-600">
						<FaRegThumbsUp />
						<span className="text-sm">Like</span>
					</div>
					<div className="flex-1 flex items-center justify-center gap-2 hover:cursor-pointer  hover:text-indigo-400 text-indigo-600">
						<FaMessage />
						<span className="text-sm">Comment</span>
					</div>
					<div className="flex-1 flex items-center justify-center gap-2 hover:cursor-pointer hover:text-indigo-400 text-indigo-600">
						<FaRecycle />
						<span className="text-sm">Repost</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
