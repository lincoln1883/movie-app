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

const editUser = async (req: Request, res: Response) => {
	try {
		const { username, email, password, profilePicture } = req.body;
		const { _id } = req.params;
		const user = await User.findById({_id});
		if(user?._id.toString() !== _id) {
			return res.status(401).json({ error: "You are not authorized to edit this user" });
		}
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		if (username) {
			const nameInUse = await User.findOne({ username }).exec();
			if (nameInUse) {
				return res
				.status(409)
				.json({ error: "Username already taken, try again" });
			}
		}
		if (email) {
		if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
			return res.status(400).json({ error: "Invalid email" });
		}
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(409).json({ error: "Email already exists" });
		}
	}
	if (password) {
		if (!verifyPassword(password)) {
			return res
				.status(400)
				.json({
					error:
						"Password must be at least 6 characters uppercase, lowercase and digit.",
					});
				}
				const hashedPassword = await bcrypt.hashSync(password, 10);
				user.password = hashedPassword;
	}
	if (username) user.username = username;
	if (email) user.email = email;
	if (profilePicture) user.profilePicture = profilePicture;
	await user.save();
	return res.status(200).json(omitPassword(user.toObject()));

}catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

const deleteUser = async (req: Request, res: Response) => {	
	try {
		const { _id } = req.params;
		const user = await User.findByIdAndDelete({_id});
		if(user?._id.toString() !== _id) {
			return res.status(401).json({ error: "You are not authorized to delete this user" });
		}
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.status(200).json({ message: "User deleted successfully" });
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
}

const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

const getUser = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const user = await User.findById({_id});
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.status(200).json(user);
	}catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
}

export{ createUser, editUser, deleteUser, getUsers, getUser};
