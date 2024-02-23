import { Request, Response } from "express";
import Comment from "../../models/comments/Comments";
import User from "../../models/users/User";
import Post from "../../models/posts/Post";

export const createComment = async (req: Request, res: Response) => {
	try {
		const { postId, userId, comment } = req.body;
		if (!postId || !userId || !comment || comment === "") {
			return res.status(401).json({ error: "All fields are required" });
		};
		const newComment = new Comment({ postId, userId, comment });
		await newComment.save();
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		post.comments.push(newComment?._id);
		await post.save();
		return res.status(201).json(newComment);
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const updateComment = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const user = await User.findById(req.user);
		const comment = await Comment.findById(_id);
		if(user?._id.toString() !== comment?.userId) {
			return res.status(401).json({ error: "Only authors can edit comments." });
		}
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		};
		const updatedComment = await Comment.findByIdAndUpdate(_id, { comment }, { new: true });
		return res.status(200).json(updatedComment);
	}
	catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const getAllComments = async (req: Request, res: Response) => {
	try {
		const comments = await Comment.find().exec();
		if(!comments || comments.length === 0) {
			return res.status(404).json({ error: "No comments found" });
		};
		return res.status(200).json({comments});
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
}

export const getComments = async (req: Request, res: Response) => {
	try {
		const { postId } = req.params;
		if(!postId || postId === "" || postId === "undefined") {
			return res.status(400).json({ error: "Post ID is required" });
		};
		const comments = await Comment.find({postId}).populate('Comment[]').exec();
		if(!comments || comments.length === 0) {
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

// export const likeComment = async (req: Request, res: Response) => {
// 	try {
// 		const { _id } = req.params;
// 		const user = await User.findById(req.user);
// 		const comment = await Comment.findById(_id);
// 		if(user?._id.toString() === comment?.userId) {
// 			return res.status(401).json({ error: "You cannot like your own comment." });
// 		}
// 		if (!comment) {
// 			return res.status(404).json({ error: "Comment not found" });
// 		};
// 		comment.likes += 1;
// 		await comment.save();
// 		return res.status(200).json(comment);
// 	}
// 	catch (error: unknown | any) {
// 		res.status(500).json({ error: error.message });
// 		throw error as Error;
// 	}
// };

// export const dislikeComment = async (req: Request, res: Response) => {
// 	try {
// 		const { _id } = req.params;
// 		const user = await User.findById(req.user);
// 		const comment = await Comment.findById(_id);
// 		if(user?._id.toString() !== comment?.userId) {
// 			return res.status(400).json({ error: "You did not like this comment." });
// 		}
// 		if (!comment) {
// 			return res.status(404).json({ error: "Comment not found" });
// 		};
// 		comment.likes -= 1;
// 		await comment.save();
// 		return res.status(200).json(comment);
// 	}
// 	catch (error: unknown | any) {
// 		res.status(500).json({ error: error.message });
// 		throw error as Error;
// 	}
// };