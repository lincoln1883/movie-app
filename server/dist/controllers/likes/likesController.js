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
exports.getAllLikes = exports.getLikes = exports.deleteLike = exports.createLike = void 0;
const Post_1 = __importDefault(require("../../models/posts/Post"));
const User_1 = __importDefault(require("../../models/users/User"));
const Like_1 = __importDefault(require("../../models/likes/Like"));
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, userId } = req.body;
        const user = yield User_1.default.findById(userId);
        const post = yield Post_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const like = yield Like_1.default.findOne({ userId: user === null || user === void 0 ? void 0 : user._id, postId });
        if (like) {
            return res.status(400).json({ error: "You already liked this post" });
        }
        const newLike = new Like_1.default({ userId: user === null || user === void 0 ? void 0 : user._id, postId });
        yield newLike.save();
        post.likes.push(newLike._id);
        yield post.save();
        return res.status(201).json(newLike);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.createLike = createLike;
const deleteLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { likeId } = req.params;
        const { postId, userId } = req.body;
        const user = yield User_1.default.findById(userId);
        const post = yield Post_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const like = yield Like_1.default.findById({ _id: likeId, userId: user === null || user === void 0 ? void 0 : user._id, postId: post._id });
        if (!like) {
            return res.status(404).json({ error: "Like not found" });
        }
        yield like.deleteOne();
        post.likes = post.likes.filter((likeId) => likeId.toString() !== like._id.toString());
        yield post.save();
        return res.status(200).json({ message: "Like deleted", like });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.deleteLike = deleteLike;
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const post = yield Post_1.default.findById(postId).populate("likes");
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json(post.likes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.getLikes = getLikes;
const getAllLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likes = yield Like_1.default.find();
        return res.status(200).json(likes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.getAllLikes = getAllLikes;
