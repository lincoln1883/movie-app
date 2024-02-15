import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../models/users/User";
import { omitPassword, verifyPassword } from "../../utils/passwordHelper";

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
		const nameInUse = await User.findOne({ username }).exec();
		if (nameInUse) {
			return res
				.status(409)
				.json({ error: "Username already taken, try again" });
		}
		if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
			return res.status(400).json({ error: "Invalid email" });
		}
		if (!verifyPassword(password)) {
			return res
				.status(400)
				.json({
					error:
						"Password must be at least 6 characters uppercase, lowercase and digit.",
				});
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ error: "User already exists" });
		}
		const hashedPassword = await bcrypt.hashSync(password, 10);
		const user = new User({ username, email, password: hashedPassword });
		await user.save();
		return res.status(201).json(omitPassword(user.toObject()));
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export default createUser;
