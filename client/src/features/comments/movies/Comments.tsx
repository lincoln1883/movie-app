import { Avatar, Card } from "flowbite-react";
import { fetchComments } from "./commentSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import moment from "moment";
import axios from "axios";

const token = localStorage.getItem("token");
const url = import.meta.env.VITE_APP_SERVER_URL

const Comments = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [userDataForAllComments, setUserDataForAllComments] = useState<any[]>(
		[]
	);
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

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const fetchUserForComment = async (comment: any) => {
			try {
				const response = await axios.get(
					`${url}/users/${comment.userId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				return response.data; // Return the user data
			} catch (error) {
				console.error(
					`Failed to fetch user for comment ${comment._id}:`,
					error
				);
				return null; // Return null if there's an error
			}
		};

		const fetchUserDataForAllComments = async () => {
			const userRequests = comments.map((comment) =>
				fetchUserForComment(comment)
			);
			const userDataForAllComments = await Promise.all(userRequests);
			userDataForAllComments.forEach((user) => delete user.password);
			setUserDataForAllComments(userDataForAllComments);
		};

		fetchUserDataForAllComments();
	}, [comments]);

	return (
		<div className="flex flex-col gap-1 w-full">
			{status === "loading" && <Spinner aria-label="Loading" />}
			{status === "failed" && <div>{error}</div>}
			<div className="mb-4 flex items-center justify-between">
				<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
					{comments.length} comments
				</h5>
			</div>
			<div className="flow-root">
				<ul className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-scroll">
					{comments.map((comment) => {
						const user = userDataForAllComments.find(
							(user) => user._id === comment.userId
						);
						return (
							<li key={comment._id} className="py-3 sm:py-4">
								<Card className="max-w-full">
									<div className="flex space-x-4">
										{user?.profilePicture ? (
											<Avatar img={user.profilePicture} rounded bordered />
										) : (
											<Avatar
												img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
												rounded
												bordered
											/>
										)}
										<div className="min-w-0 flex-1 flex items-center">
											<p className="truncate text-sm font-medium text-gray-900 dark:text-white self-center capitalize">
												{user?.username}
											</p>
										</div>
									</div>
									<div className="flex flex-col">
										<p className="capitalize text-wrap w-full">
											{comment.content}
										</p>
										<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
											<p className="text-xs">
												{createdDate(comment.createdAt)}
											</p>
										</div>
									</div>
									<hr className="border-solid border-white" />
								</Card>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Comments;
