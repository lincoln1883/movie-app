import express from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../../controllers/comments/commentsController";
import passport from "../../services/passport";

const router = express.Router();

export const postComment = router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  createComment
);
export const getComment = router.get("/comments/:postId", getComments);
export const putComment = router.put("/comments/:_id", passport.authenticate("jwt", { session: false }), updateComment);
export const removeComment = router.delete("/comments/:_id", passport.authenticate("jwt", { session: false }), deleteComment);