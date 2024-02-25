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
exports.dislikeComment = exports.likeComment = exports.deleteComment = exports.getComments = exports.getAllComments = exports.updateComment = exports.createComment = void 0;
const Comments_1 = __importDefault(require("../../models/comments/Comments"));
const User_1 = __importDefault(require("../../models/users/User"));
const Post_1 = __importDefault(require("../../models/posts/Post"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, userId, comment } = req.body;
        if (!postId || !userId || !comment || comment === "") {
            return res.status(401).json({ error: "All fields are required" });
        }
        ;
        const newComment = new Comments_1.default({ postId, userId, comment });
        yield newComment.save();
        const post = yield Post_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        post.comments.push(newComment === null || newComment === void 0 ? void 0 : newComment._id);
        yield post.save();
        return res.status(201).json(newComment);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.createComment = createComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const user = yield User_1.default.findById(req.user);
        const comment = yield Comments_1.default.findById(_id);
        if ((user === null || user === void 0 ? void 0 : user._id.toString()) !== (comment === null || comment === void 0 ? void 0 : comment.userId)) {
            return res.status(401).json({ error: "Only authors can edit comments." });
        }
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        ;
        const updatedComment = yield Comments_1.default.findByIdAndUpdate(_id, { comment }, { new: true });
        return res.status(200).json(updatedComment);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.updateComment = updateComment;
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comments_1.default.find().exec();
        if (!comments || comments.length === 0) {
            return res.status(404).json({ error: "No comments found" });
        }
        ;
        return res.status(200).json({ comments });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.getAllComments = getAllComments;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        if (!postId || postId === "" || postId === "undefined") {
            return res.status(400).json({ error: "Post ID is required" });
        }
        ;
        const comments = yield Comments_1.default.find({ postId }).populate('Comment[]').exec();
        if (!comments || comments.length === 0) {
            return res.status(404).json({ error: "No comments found" });
        }
        ;
        return res.status(200).json({ comments });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.getComments = getComments;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const user = yield User_1.default.findById(req.user);
        const comment = yield Comments_1.default.findById(_id);
        if ((comment === null || comment === void 0 ? void 0 : comment.userId) !== (user === null || user === void 0 ? void 0 : user._id.toString())) {
            return res.status(401).json({ error: "Your are not authorized to delete this comment." });
        }
        ;
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        ;
        yield Comments_1.default.findByIdAndDelete(_id);
        return res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.deleteComment = deleteComment;
const likeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const comment = yield Comments_1.default.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        ;
        comment.likes += 1;
        yield comment.save();
        return res.status(200).json(comment);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.likeComment = likeComment;
const dislikeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const comment = yield Comments_1.default.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        ;
        if (comment.likes > 0) {
            comment.likes -= 1;
        }
        ;
        if (comment.likes === 0) {
            return res.status(400).json({ error: "Comment has no likes to delete" });
        }
        yield comment.save();
        return res.status(200).json(comment);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.dislikeComment = dislikeComment;
