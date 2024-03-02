"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = require("./routes/users/userRoutes");
const loginRoute_1 = require("./routes/auth/loginRoute");
const commentRoutes_1 = require("./routes/comments/commentRoutes");
const postRoutes_1 = require("./routes/posts/postRoutes");
const likeRoutes_1 = require("./routes/likes/likeRoutes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Users routes
app.use("/api", userRoutes_1.signUp);
app.use("/api", userRoutes_1.updateUser);
app.use("/api", userRoutes_1.removeUser);
app.use("/api", userRoutes_1.readUser);
app.use("/api", userRoutes_1.readUsers);
// auth routes
app.use("/api/auth", loginRoute_1.login);
// Posts routes
app.use("/api", postRoutes_1.createPostRoute);
app.use("/api", postRoutes_1.readPost);
app.use("/api", postRoutes_1.readPosts);
app.use("/api", postRoutes_1.removePost);
app.use("/api", postRoutes_1.editPost);
// Comments routes
app.use("/api", commentRoutes_1.postComment);
app.use("/api", commentRoutes_1.readComment);
app.use("/api", commentRoutes_1.readAllComments);
app.use("/api", commentRoutes_1.putComment);
app.use("/api", commentRoutes_1.removeComment);
app.use("/api", commentRoutes_1.dislike);
app.use("/api", commentRoutes_1.like);
// Likes routes
app.use("/api", likeRoutes_1.postLike);
app.use("/api", likeRoutes_1.removeLike);
app.use("/api", likeRoutes_1.readLikes);
app.use("/api", likeRoutes_1.readAllLikes);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDb is connected");
})
    .catch((err) => {
    console.log(err);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
