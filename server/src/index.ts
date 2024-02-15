import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { signUp } from "./routes/users/userRoutes";
import { login } from "./routes/auth/loginRoute";
import { getMovieComments, postMovieComment } from "./routes/comments/movieComments";
import { postShowComment, getShowComments } from "./routes/comments/showComments";

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

app.use("/api", signUp);
app.use("/api/auth", login);
app.use("/api", postMovieComment);
app.use("/api", getMovieComments);
app.use("/api", postShowComment);
app.use("/api", getShowComments);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
