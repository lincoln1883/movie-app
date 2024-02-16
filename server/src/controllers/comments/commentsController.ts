import { Request, Response } from "express";
import Comment from "../../models/comments/Comments";
import User from "../../models/users/User";

export const createComment = async (req: Request, res: Response) => {
	try {
		const { movieId, userId, content } = req.body;
		if (!movieId || !userId || !content || movieId === null || userId === null || content === "") {
			return res.status(401).json({ error: "All fields are required" });
		};
		const newComment = new Comment({ movieId, userId, content });
		await newComment.save();
		return res.status(201).json(newComment);
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const updateComment = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const { content } = req.body;
		const user = await User.findById(req.user);
		const comment = await Comment.findById(_id);
		console.log("line 25",user);
		if(user?._id.toString() !== comment?.userId) {
			return res.status(401).json({ error: "Only authors can edit comments." });
		}
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		};
		const updatedComment = await Comment.findByIdAndUpdate(_id, { content }, { new: true });
		return res.status(200).json(updatedComment);
	}
	catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const getComments = async (req: Request, res: Response) => {
	try {
		const { movieId } = req.params;
		if(!movieId) {
			return res.status(400).json({ error: "Movie ID is required" });
		};
		const comments = await Comment.find({ movieId }).exec();
		if(!comments) {
			return res.status(404).json({ error: "No comments found" });
		};
		return res.status(200).json({comments});
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
}

export const deleteComment = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const user = await User.findById(req.user);
		const comment = await Comment.findById(_id);
		if (comment?.userId !== user?._id.toString()) {
			return res.status(401).json({ error: "Your are not authorized to delete this comment." });
		};
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		};
		await Comment.findByIdAndDelete(_id);
		return res.status(200).json({ message: "Comment deleted successfully" });
	}
	catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const likeComment = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const user = await User.findById(req.user);
		const comment = await Comment.findById(_id);
		if(user?._id.toString() === comment?.userId) {
			return res.status(401).json({ error: "You cannot like your own comment." });
		}
		if(user?.likedComments.includes(_id)) {
			return res.status(401).json({ error: "You have already liked this comment." });
		};
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		};
		comment.likes += 1;
		await comment.save();
		return res.status(200).json(comment);
	}
	catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const dislikeComment = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const user = await User.findById(req.user);
		const comment = await Comment.findById(_id);
		if(user?._id.toString() !== comment?.userId) {
			return res.status(400).json({ error: "You did not like this comment." });
		}
		if(user?.likedComments.includes(_id)) {
			return res.status(401).json({ error: "You have already disliked this comment." });
		};
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		};
		comment.dislikes -= 1;
		await comment.save();
		return res.status(200).json(comment);
	}
	catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};