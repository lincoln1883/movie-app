import { Request, Response } from "express";
import Post from "../../models/posts/Post";
import User from "../../models/users/User";

export const createPost = async (req: Request, res: Response) => {
	try {
		const {
			title,
			movieId,
			overview,
			poster_path,
			release_date,
			rating,
			reviews,
		} = req.body;
		if (
			!title ||
			!movieId ||
			!overview ||
			!poster_path ||
			!release_date ||
			!rating ||
			!reviews
		) {
			return res.status(401).json({ error: "Post cannot be empty" });
		}
		const newPost = new Post({
			userId: req.user,
			title,
			movieId,
			overview,
			poster_path,
			release_date,
			rating,
			reviews,
		});
		await newPost.save();
		return res.status(201).json(newPost);
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const getPosts = async (req: Request, res: Response) => {
	try {
		const posts = await Post.find()
			.populate("comments")
			.sort({ createdAt: -1 })
			.exec();
		if (!posts) {
			return res.status(404).json({ error: "No posts found" });
		}
		return res.status(200).json(posts);
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const getPost = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const post = await Post.findById(id)
			.populate("likes")
			.populate("comments")
			.exec();
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		return res.status(200).json(post);
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const updatePost = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const {
			title,
			overview,
			poster_path,
			release_date,
			vote_average,
			reviews,
		} = req.body;
		const post = await Post.findById(id);
		if (post?.userId !== req.user) {
			return res
				.status(401)
				.json({ error: "You are not authorized to edit this post" });
		}
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ title, overview, poster_path, release_date, vote_average, reviews },
			{ new: true }
		);
		return res.status(200).json(updatedPost);
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const deletePost = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const post = await Post.findById(id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		const user = await User.findById(req.user);
		if (post?.userId !== user?._id) {
			return res
				.status(401)
				.json({ error: "You are not authorized to delete this post" });
		}
		await Post.findByIdAndDelete(id);
		return res.status(200).json({ message: "Post deleted successfully" });
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};
