import express from "express";
import createUser from "../../controllers/users/userController";

const router = express.Router();

export const signUp = router.post("/signup", createUser);
