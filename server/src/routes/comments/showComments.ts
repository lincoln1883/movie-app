import express from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../../controllers/comments/commentsController";
import passport from "../../services/passport";

const router = express.Router();

export const postShowComment = router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  createComment
);

export const getShowComments = router.get("/comments/:movieId", getComments);
export const putShowComment = router.put(
	"/comments/:_id",
	passport.authenticate("jwt", { session: false }),
	updateComment
);
export const removeShowComment = router.delete(
	"/comments/:_id",
	passport.authenticate("jwt", { session: false }),
	deleteComment
);
