import express from "express";
import {
	createUser,
	editUser,
	deleteUser,
	getUsers,
	getUser,
	followUser,
} from "../../controllers/users/userController";
import passport from "../../services/passport";

const router = express.Router();

export const updateUser = router.put(
	"/users/:_id",
	passport.authenticate("jwt", { session: false }),
	editUser
);
export const signUp = router.post("/signup", createUser);
export const removeUser = router.delete(
	"/users/:_id",
	passport.authenticate("jwt", { session: false }),
	deleteUser
);
export const readUser = router.get(
	"/users/:_id",
	passport.authenticate("jwt", { session: false }),
	getUser
);
export const readUsers = router.get(
	"/users",
	passport.authenticate("jwt", { session: false }),
	getUsers
);

export const followUsers = router.put(
	"/users/:_id/follow",
	passport.authenticate("jwt", { session: false }),
	followUser
);
