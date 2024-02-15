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
const movieComments_1 = require("./routes/comments/movieComments");
const showComments_1 = require("./routes/comments/showComments");
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDb is connected");
})
    .catch((err) => {
    console.log(err);
});
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api", userRoutes_1.signUp);
app.use("/api/auth", loginRoute_1.login);
app.use("/api", movieComments_1.postMovieComment);
app.use("/api", movieComments_1.getMovieComments);
app.use("/api", showComments_1.postShowComment);
app.use("/api", showComments_1.getShowComments);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
