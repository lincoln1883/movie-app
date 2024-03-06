import { Card } from "flowbite-react";
import { BsTrash2Fill } from "react-icons/bs";
import { useAppDispatch } from "../../../redux/store";
import { deletePost } from "../../posts/postSlice";

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
  // const user = localStorage.getItem("currentUser") || null;
  // const userObj = JSON.parse(user || "{}");
  // const id = userObj._id as string;
  // console.log(id, post?._id)

  const handleDelete = () => {
    dispatch(deletePost(post._id as string));
    console.log('delete')
  }

	return (
			<Card
				className="max-w-sm"
				imgSrc={`https://image.tmdb.org/t/p/w500${post.poster_path}`}
				horizontal
			>
        <BsTrash2Fill className="self-end w-6 h-6" onClick={handleDelete} />
				<div className="flex flex-col justify-center gap-1 items-start flex-1">
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
			</Card>
	);
};

export default Timeline;
