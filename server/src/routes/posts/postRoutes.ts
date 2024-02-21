import express from "express";
import {
	createPost,
	getPosts,
	getPost,
	deletePost,
	updatePost,
} from "../../controllers/posts/postsController";
import passport from "../../services/passport";

const router = express.Router();

export const createPostRoute = router.post(
	"/posts",
	passport.authenticate("jwt", { session: false }),
	createPost
);
export const readPosts = router.get("/posts", getPosts);
export const readPost = router.get("/posts/:id", getPost);
export const removePost = router.delete(
	"/posts/:id",
	passport.authenticate("jwt", { session: false }),
	deletePost
);
export const editPost = router.put(
	"/posts/:id",
	passport.authenticate("jwt", { session: false }),
	updatePost
);
