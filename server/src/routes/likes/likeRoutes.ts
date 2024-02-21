import express from 'express';
import {
  createLike,
  deleteLike,
  getLikes
} from '../../controllers/likes/likesController';
import passport from '../../services/passport';

const router = express.Router();

export const postLike = router.post(
  '/posts/:postId/likes',
  passport.authenticate('jwt', { session: false }),
  createLike
);

export const removeLike = router.delete(
  '/posts/:postId/likes/:likeId',
  passport.authenticate('jwt', { session: false }),
  deleteLike
);

export const readLikes = router.get(
  '/likes/:postId',
  getLikes
);
