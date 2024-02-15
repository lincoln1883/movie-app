import { fetchComments } from "./commentSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import moment from "moment";
import { FaComment } from "react-icons/fa";

const  Comments = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const comments = useAppSelector((state) => state.comments.comments);
	const status = useAppSelector((state) => state.comments.status);
	const error = useAppSelector((state) => state.comments.error);

	useEffect(() => {
		dispatch(fetchComments(id as string));
	}, [dispatch, id]);

	const createdDate = (date: string | undefined) => {
		return moment(date).fromNow();
	};

	const commentsCount = comments.length;

	return (
		<div className="flex flex-col gap-1 w-full">
			{commentsCount === 0 ? <p className="text-center">There are no comments yet!</p> :
			<div className="flex relative mt-4">
				<FaComment className="text-2xl text-blue-600" />
				<p className="text-center text-xs absolute bottom-2.5 left-5 w-4 mb-1 bg-red-600 rounded-full text-white">
					{commentsCount}
				</p>
			</div>
			}
			{status === "loading" && <Spinner aria-label="Loading" />}
			{status === "failed" && <div>{error}</div>}
			<ul>
				{comments
					.slice(-3)
					.reverse()
					.map((comment) => (
						<li key={comment._id} className="">
							<div>
								<p className="capitalize text-wrap">{comment.comment}</p>
								<p className="text-xs">{createdDate(comment.createdAt)}</p>
							</div>
						</li>
					))}
			</ul>
		</div>
	);
};

export default Comments;
