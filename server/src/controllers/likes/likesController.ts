import { Request, Response } from "express";
import Post from "../../models/posts/Post";
import User from "../../models/users/User";
import Like from "../../models/likes/Like";


export const createLike = async (req: Request, res: Response) => {
	try {
		const { postId, userId } = req.body;
		const user = await User.findById(userId);
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		const like = await Like.findOne({ userId: user?._id, postId });
		if (like) {
			return res.status(400).json({ error: "You already liked this post" });
		}
		const newLike = new Like({ userId: user?._id, postId });
		await newLike.save();
		post.likes.push(newLike._id);
		await post.save();
		return res.status(201).json(newLike);
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const deleteLike = async (req: Request, res: Response) => {
	try {
		const { postId } = req.params;
		const user = await User.findById(req.user);
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		const like = await Like.findOne({ userId: user?._id, postId });
		if (!like) {
			return res.status(400).json({ error: "You have not liked this post" });
		}
		await Like.findByIdAndDelete(like._id);
		post.likes = post.likes.filter((likeId) => likeId !== like._id);
		await post.save();
		return res.status(200).json({ message: "Like deleted successfully" });
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const getLikes = async (req: Request, res: Response) => {
	try {
		const { postId } = req.params;
		const post = await Post.findById(postId).populate("likes");
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		return res.status(200).json(post.likes);
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};
