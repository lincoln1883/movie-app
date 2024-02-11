import express from "express";
import loginUser from "../../controllers/auth/loginController";

const router = express.Router();

export const login = router.post("/login", loginUser);