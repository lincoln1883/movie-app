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
} from "./routes/users/userRoutes";
import { login } from "./routes/auth/loginRoute";
import {
	getMovieComments,
	postMovieComment,
	putMovieComment,
	removeMovieComment,
} from "./routes/comments/movieComments";
import {
	postShowComment,
	getShowComments,
	putShowComment,
	removeShowComment,
} from "./routes/comments/showComments";

dotenv.config();

mongoose
	.connect(process.env.MONGO_URI as string)
	.then(() => {
		console.log("MongoDb is connected");
	})
	.catch((err) => {
		console.log(err);
	});

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
// auth routes
app.use("/api/auth", login);
// Movie comments routes
app.use("/api", postMovieComment);
app.use("/api", getMovieComments);
app.use("/api", putMovieComment);
app.use("/api", removeMovieComment);
// Show comments routes
app.use("/api", postShowComment);
app.use("/api", getShowComments);
app.use("/api", putShowComment);
app.use("/api", removeShowComment);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
