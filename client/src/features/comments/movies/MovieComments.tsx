import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { createComment } from "./commentSlice";
import Movie from "../../movies/Movie";
import { TfiCommentAlt } from "react-icons/tfi";

interface Props {
	movies: Movie;
}

interface Comment {
	movieId: string;
	userId: string;
	content: string;
}

const MovieCommentsModal = ({ movies }: Props) => {
	const [openModal, setOpenModal] = useState(false);
	const [content, setContent] = useState<Comment>({
		movieId: "",
		userId: "",
		content: "",
	});
	const user = JSON.parse(localStorage.getItem("currentUser")!) as {
		_id: string;
	};
	const movie = movies.id.toString();
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createComment(content));
		setContent({ movieId: "", userId: "", content: "" });
		setOpenModal(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setContent({
			...content,
			[name]: value,
			userId: user?._id,
			movieId: movie,
		});
	};

	return (
		<>
			<TfiCommentAlt
				className="w-7 h-7 hover:cursor-pointer text-blue-500 text-2xl"
				onClick={() => setOpenModal(true)}
			/>
			<Modal
				dismissible
				show={openModal}
				onClose={() => setOpenModal(false)}
				popup
			>
				<Modal.Header>{movies.title}</Modal.Header>
				<Modal.Body>
					<div className="text-center">
						<form className="w-full" onSubmit={handleSubmit}>
							<label htmlFor="comment">Comment:</label>
							<input type="hidden" name="movieId" value={movie} />
							<input type="hidden" name="userId" value={user._id} />
							<textarea
								name="content"
								id="content"
								placeholder="Write a comment..."
								value={content.content}
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

export default MovieCommentsModal;
