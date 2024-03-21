import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {
	signUp,
	updateUser,
	removeUser,
	readUser,
	readUsers,
	followUsers,
} from "./routes/users/userRoutes";
import { login } from "./routes/auth/loginRoute";
import {
	postComment,
	readComment,
	putComment,
	removeComment,
	readAllComments,
	like,
} from "./routes/comments/commentRoutes";
import {
	createPostRoute,
	readPost,
	readPosts,
	removePost,
	editPost,
} from "./routes/posts/postRoutes";
import { postLike, removeLike,readLikes, readAllLikes } from "./routes/likes/likeRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Users routes
app.use("/api", signUp);
app.use("/api", updateUser);
app.use("/api", removeUser);
app.use("/api", readUser);
app.use("/api", readUsers);
app.use("/api", followUsers);
// auth routes
app.use("/api/auth", login);
// Posts routes
app.use("/api", createPostRoute);
app.use("/api", readPost);
app.use("/api", readPosts);
app.use("/api", removePost);
app.use("/api", editPost);
// Comments routes
app.use("/api", postComment);
app.use("/api", readComment);
app.use("/api", readAllComments);
app.use("/api", putComment);
app.use("/api", removeComment);
app.use("/api", like);
// Likes routes
app.use("/api", postLike);
app.use("/api", removeLike);
app.use("/api", readLikes);
app.use("/api", readAllLikes);

mongoose
	.connect(process.env.MONGO_URI as string)
	.then(() => {
		console.log("MongoDb is connected");
	})
	.catch((err) => {
		console.log(err);
	});
	
	app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
