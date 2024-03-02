import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../models/users/User";
import jwt from "jsonwebtoken";
import { omitPassword, verifyPassword } from "../../utils/passwordHelper";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET as string;

type UserType = {
	_id: string;
	username: string;
	password: string;
	email: string;
	profilePicture: string;
	createdAt: Date;
	bio: string;
	firstName: string;
	lastName: string;
};

const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password || email === "" || password === "") {
			return res.status(400).json({ error: "All fields are required" });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		if (!verifyPassword(password)) {
			return res.status(400).json({
				error:
					"Password must be at least 6 characters uppercase, lowercase and digit.",
			});
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid password" });
		}
		const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "3h" });
		// Generate the user object to return without the password
		const userObject = omitPassword(user.toObject() as UserType);
		return res.status(200).json({ token, userObject });
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export default loginUser;
