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
			return res.status(400).json({
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
			const { _id } = req.params;
			const { username, bio, firstName, lastName, email, profilePicture } = req.body;
			const user = await User.findById(_id);
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			// Construct updated user object
			const updateUser = {
				username: username || user.username,
				email: email || user.email,
				firstName: firstName || user.firstName,
				lastName: lastName || user.lastName,
				bio: bio || user.bio,
				profilePicture: profilePicture || user.profilePicture,
			};
			// Update user in the database
			const updatedUser = await User.findByIdAndUpdate(_id, updateUser, {
				new: true,
			});

			if (!updatedUser) {
				return res.status(500).json({ error: "Failed to update user" });
			}
			return res.status(200).json(omitPassword(updatedUser.toObject()));
		} catch (error: unknown | any) {
			console.error("Error updating user profile:", error);
			return res.status(500).json({ error: "Internal server error" });
		}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const user = await User.findByIdAndDelete({ _id });
		if (user?._id.toString() !== _id) {
			return res
				.status(401)
				.json({ error: "You are not authorized to delete this user" });
		}
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.status(200).json({ message: "User deleted successfully" });
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

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
		const user = await User.findById({ _id });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.status(200).json(user);
	} catch (error: unknown | any) {
		res.status(500).json({ error: error.message });
		throw error as Error;
	}
};

export const followUser = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const authenticatedUser = await User.findById(req?.user);
		const authenticatedUserId = authenticatedUser?._id;
		if (!authenticatedUser) {
			res.status(404).json({ error: "User not found " });
		}
		const userToFollow = await User.findById(_id);
		if (!userToFollow) {
			res.status(404).json({ error: "The user you want to follow is not found" });
		}

		let message;
		if (authenticatedUser?.following.includes(_id)) {
			await User.findByIdAndUpdate(authenticatedUserId, { $pull: { following: userToFollow?._id } });
			await User.findByIdAndUpdate(userToFollow, { $pull: { followers: authenticatedUserId } });
			message = "Unfollowed successfully";
		} else {
			await User.findByIdAndUpdate(authenticatedUserId, { $push: { following: userToFollow?._id } });
			await User.findByIdAndUpdate(userToFollow, { $push: { followers: authenticatedUserId } });
			message = "Followed successfully";
		}
		return res.status(200).json({ message: message });
	}catch (error: unknown |any) {
		res.status(500).json({error: error.message})
		throw error as Error
	}
}

export { createUser, editUser, deleteUser, getUsers, getUser };
