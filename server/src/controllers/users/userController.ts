import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../models/User";

const createUser = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;
		if (
			!username ||
			!email ||
			!password ||
			username === "" ||
			email === "" ||
			password === ""
		) {
			return res.status(400).json({ error: "All fields are required" });
		}
		const hashedPassword = await bcrypt.hashSync(password, 10);
		const user = new User({ username, email, password: hashedPassword });
		await user.save();
		res.json(user);
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export default createUser;
