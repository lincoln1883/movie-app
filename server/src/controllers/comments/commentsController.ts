import { Request, Response } from "express";
import Comment from "../../models/comments/Comments";
import User from "../../models/users/User";

export const createComment = async (req: Request, res: Response) => {
	try {
		const { movieId, userId, comment } = req.body;
		if (
			!movieId ||
			!userId ||
			!comment ||
			movieId === null ||
			userId === null ||
			comment === ""
		) {
			return res.status(401).json({ error: "All fields are required" });
		}
    //const user = await User.findById({ _id: userId }).exec();
		const newComment = new Comment({ movieId, userId, comment });
		await newComment.save();
		return res.status(201).json(newComment);
	} catch (error: unknown | any) {
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
		return res.status(200).json(comments);
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
}