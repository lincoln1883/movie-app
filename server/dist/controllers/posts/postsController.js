"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPost = exports.getPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../../models/posts/Post"));
const User_1 = __importDefault(require("../../models/users/User"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, movieId, overview, poster_path, release_date, rating, reviews, } = req.body;
        if (!title ||
            !movieId ||
            !overview ||
            !poster_path ||
            !release_date ||
            !rating ||
            !reviews) {
            return res.status(401).json({ error: "Post cannot be empty" });
        }
        const newPost = new Post_1.default({
            userId: req.user,
            title,
            movieId,
            overview,
            poster_path,
            release_date,
            rating,
            reviews,
        });
        yield newPost.save();
        return res.status(201).json(newPost);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find()
            .populate("comments")
            .sort({ createdAt: -1 })
            .exec();
        if (!posts) {
            return res.status(404).json({ error: "No posts found" });
        }
        return res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield Post_1.default.findById(id)
            .populate("likes")
            .populate("comments")
            .exec();
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.getPost = getPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, overview, poster_path, release_date, vote_average, reviews, } = req.body;
        const post = yield Post_1.default.findById(id);
        if ((post === null || post === void 0 ? void 0 : post.userId) !== req.user) {
            return res
                .status(401)
                .json({ error: "You are not authorized to edit this post" });
        }
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const updatedPost = yield Post_1.default.findByIdAndUpdate(id, { title, overview, poster_path, release_date, vote_average, reviews }, { new: true });
        return res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield Post_1.default.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const user = yield User_1.default.findById(req.user);
        if ((post === null || post === void 0 ? void 0 : post.userId) !== (user === null || user === void 0 ? void 0 : user._id)) {
            return res
                .status(401)
                .json({ error: "You are not authorized to delete this post" });
        }
        yield Post_1.default.findByIdAndDelete(id);
        return res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.deletePost = deletePost;
