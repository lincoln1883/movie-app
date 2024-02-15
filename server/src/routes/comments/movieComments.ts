import express from "express";
import {
	createComment,
	getComments,
} from "../../controllers/comments/commentsController";
import passport from "../../services/passport";

const router = express.Router();

export const postMovieComment = router.post(
	"/comments",
	passport.authenticate("jwt", { session: false }),
	createComment
);
export const getMovieComments = router.get("/comments/:movieId", getComments);
