// import express from "express";
// import {
// 	createComment,
// 	getComments,
// 	updateComment,
// 	deleteComment,
// } from "../../controllers/comments/commentsController";
// import passport from "../../services/passport";

// const router = express.Router();

// export const postMovieComment = router.post(
// 	"/comments",
// 	passport.authenticate("jwt", { session: false }),
// 	createComment
// );
// export const getMovieComments = router.get("/comments/:movieId", getComments);
// export const putMovieComment = router.put("/comments/:_id", passport.authenticate("jwt", { session: false }), updateComment);
// export const removeMovieComment = router.delete("/comments/:_id", passport.authenticate("jwt", { session: false }), deleteComment);
