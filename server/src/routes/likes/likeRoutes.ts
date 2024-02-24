import express from 'express';
import {
  createLike,
  deleteLike,
  getAllLikes,
  getLikes
} from '../../controllers/likes/likesController';
import passport from '../../services/passport';

const router = express.Router();

export const postLike = router.post(
  '/likes',
  passport.authenticate('jwt', { session: false }),
  createLike
);

export const removeLike = router.delete(
  '/likes/:likeId',
  passport.authenticate('jwt', { session: false }),
  deleteLike
);

export const readLikes = router.get(
  '/likes/:postId',
  passport.authenticate('jwt', { session: false }),
  getLikes
);

export const readAllLikes = router.get(
  '/likes',
  passport.authenticate('jwt', { session: false }),
  getAllLikes
);
