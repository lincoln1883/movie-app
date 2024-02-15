import express from "express";
import {
  createComment,
  getComments,
} from "../../controllers/comments/commentsController";
import passport from "../../services/passport";

const router = express.Router();

export const postShowComment = router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  createComment
);

export const getShowComments = router.get("/comments/:movieId", getComments);