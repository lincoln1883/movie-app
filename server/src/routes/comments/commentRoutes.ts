import express from "express";
import {
	createComment,
  getAllComments,
	getComments,
	updateComment,
	deleteComment,
	likeComment,
} from "../../controllers/comments/commentsController";
import passport from "../../services/passport";

const router = express.Router();

export const postComment = router.post(
	"/posts/:postId/comments",
	passport.authenticate("jwt", { session: false }),
	createComment
);
export const readAllComments = router.get(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  getAllComments
);
export const readComment = router.get(
	"/posts/:postId/comments",
	passport.authenticate("jwt", { session: false }),
	getComments
);
export const putComment = router.put(
	"posts/:postId/comments/:_id",
	passport.authenticate("jwt", { session: false }),
	updateComment
);
export const removeComment = router.delete(
	"/posts/:postId/comments/:_id",
	passport.authenticate("jwt", { session: false }),
	deleteComment
);
export const like = router.put(
	"/comments/:_id",
	passport.authenticate("jwt", { session: false }),
	likeComment
);