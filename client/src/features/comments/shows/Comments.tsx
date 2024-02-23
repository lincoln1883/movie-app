// import { Avatar, Card } from "flowbite-react";
// import { fetchComments } from "./commentSlice";
// import { useAppDispatch, useAppSelector } from "../../../redux/store";
// import { useEffect } from "react";
// import { Spinner } from "flowbite-react";
// import moment from "moment";

// const Comments = () => {
//  const dispatch = useAppDispatch();
//  const comments = useAppSelector((state) => state.comments.comments);
//  const loading = useAppSelector((state) => state.comments.status === "loading");
//  const postId = useAppSelector((state) => state.posts.post);

//  useEffect(() => {
// 		dispatch(fetchComments(postId?._id))
//  }, [postId, dispatch]);

//  const createdDate = (date: string) => {
// 		// Assuming you have a function to format the date
// 		return moment(date).format("MMMM Do YYYY, h:mm:ss a");
//  };


// 	return (
// 		<div className="flex flex-col gap-1 w-full">
// 			{loading && <Spinner className="w-10 h-10" />}
// 			<div className="flow-root">
// 				<ul className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-scroll">
// 					{comments.map((comment) => (
// 						<li key={comment._id} className="py-4">
// 							<div className="flex space-x-3">
// 								<Avatar
// 									src="https://cdn.flowbite.com/files/1/flowbite-avatar-64x64.jpg"
// 									size="md"
// 									className="flex-none"
// 								/>
// 								<div className="flex-1 space-y-1">
// 									<div className="flex items-center justify-between">
// 										<h3 className="text-sm font-medium">{comment.name}</h3>
// 										<p className="text-sm text-gray-500 dark:text-gray-400">
// 											{createdDate(comment.createdAt)}
// 										</p>
// 									</div>
// 									<p className="text-sm text-gray-500 dark:text-gray-400">
// 										{comment.body}
// 									</p>
// 								</div>
// 							</div>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 		</div>
// 	);
// };

// export default Comments;
