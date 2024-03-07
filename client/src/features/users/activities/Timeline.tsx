import { Card } from "flowbite-react";
import { BsTrash } from "react-icons/bs";
import { useAppDispatch } from "../../../redux/store";
import { deletePost, fetchPosts } from "../../posts/postSlice";
import { useEffect } from "react";

interface Post {
	_id?: string;
	title: string;
	overview: string;
	release_date: string;
	poster_path: string;
	movieId: string;
	rating: number;
	createdAt?: string;
	updatedAt?: string;
}
interface Props {
	post: Post;
}

const Timeline = ({ post }: Props) => {
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);
	
  const handleDelete = () => {
		dispatch(deletePost(post._id as string));
  }

	return (
			<Card horizontal className="h-58">
				<img src={`https://image.tmdb.org/t/p/w500${post.poster_path}`} alt={post.title} className="h-56" />
        <BsTrash className="self-end w-3 h-3" onClick={handleDelete} />
				<div className="flex flex-col justify-center gap-0.5 flex-1">
					<h3 className="text-xs">
						<span className="text-md font-bold">Title: </span>
						{post.title}
					</h3>
					<p className="line-clamp-4 text-xs">
						<span className="text-md font-bold">Details: </span>
						{post.overview || "No details available"}
					</p>
					<p className="text-xs">
						<span className="text-md font-bold">Released: </span>
						{post.release_date}
					</p>
				</div>
			</Card>
	);
};

export default Timeline;
