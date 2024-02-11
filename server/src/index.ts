import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { signUp } from "./routes/users/userRoutes";
import { login } from "./routes/auth/loginRoute";

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/api", signUp);
app.use("/api/auth", login);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
