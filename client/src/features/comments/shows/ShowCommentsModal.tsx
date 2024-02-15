import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { createComment } from "./commentSlice";
import Show from "../../shows/Show";

interface Props {
	shows: Show;
}

interface Comment {
	movieId: string;
	userId: string;
	comment: string;
}

const ShowCommentsModal = ({ shows }: Props) => {
	const [openModal, setOpenModal] = useState(false);
	const [comment, setComment] = useState<Comment>({
		movieId: "",
		userId: "",
		comment: "",
	});
	const user = JSON.parse(localStorage.getItem("currentUser")!) as {
		_id: string;
	};
	const show = shows.id.toString();
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createComment(comment));
		setComment({ movieId: "", userId: "", comment: "" });
		setOpenModal(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setComment({
			...comment,
			[name]: value,
			userId: user?._id,
			movieId: show,
		});
	};

	return (
		<>
			<Button onClick={() => setOpenModal(true)}>Comment</Button>
			<Modal
				dismissible
				show={openModal}
				onClose={() => setOpenModal(false)}
				popup
			>
				<Modal.Header>{shows.name}</Modal.Header>
				<Modal.Body>
					<div className="text-center">
						<form className="w-full" onSubmit={handleSubmit}>
							<label htmlFor="comment">Comment:</label>
							<input type="hidden" name="movieId" value={show} />
							<input type="hidden" name="userId" value={user._id} />
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
								<Button color="gray" onClick={() => setOpenModal(false)}>
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

export default ShowCommentsModal;
