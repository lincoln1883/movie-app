import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { createComment } from "./commentSlice";
import { FaMessage } from "react-icons/fa6";
import { useParams } from "react-router-dom";

interface Comment {
	postId: string;
	userId: string;
	comment: string;
	likes?: string[];	
}

const CommentsModal = () => {
	const [openModal, setOpenModal] = useState(false);
	const [comment, setComment] = useState<Comment>({
		postId: "",
		userId: "",
		comment: "",
	});
	const user = JSON.parse(localStorage.getItem("currentUser")!) as {
		_id: string;
	};

	const {id} = useParams<{id: string}>();

	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createComment(comment));
		setComment({ postId: "", userId: "", comment: "" });
		setOpenModal(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setComment({
			...comment,
			[name]: value,
			userId: user?._id,
			postId: id as string,
		});
	};

	return (
		<>
			<FaMessage
				className="hover:cursor-pointer hover:text-indigo-400 text-indigo-600 "
				onClick={() => setOpenModal(true)}
			/>
			<Modal
				dismissible
				show={openModal}
				onClose={() => setOpenModal(false)}
				popup
			>
				<Modal.Body className="m-0 p-0">
					<div className="text-center w-full p-6">
						<form className="w-full" onSubmit={handleSubmit}>
							<label htmlFor="comment" hidden></label>
							<input type="hidden" name="postId" value={id} />
							<input type="hidden" name="userId" value={user?._id} />
							<textarea
								name="comment"
								id="comment"
								placeholder="Write a comment..."
								value={comment.comment}
								className="w-full h-40 p-2 rounded-lg shadow-md"
								onChange={handleChange}
								required
							></textarea>
							<div className="flex justify-center gap-4">
								<button
									type="submit"
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								>
									Submit
								</button>
								<Button
									color="rose"
									className="hover:bg-red-200"
									onClick={() => setOpenModal(false)}
								>
									No, cancel
								</Button>
							</div>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CommentsModal;
