import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		default: "",
	},
	lastName: {
		type: String,
		default: "",
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
	bio: {
		type: String,
		default: "",
	},
	following: {
		type: Array,
		default: [],
	},
	followers: {
		type: Array,
		default: [],
	},
	profilePicture: {
		type: String,
		default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
	},
},{
	timestamps: true,
});

const User = mongoose.model("User", UserSchema);

export default User;
