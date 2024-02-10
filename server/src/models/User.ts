import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	profilePicture: {
		type: String,
		default: "",
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const User = mongoose.model("User", UserSchema);

export default User;
