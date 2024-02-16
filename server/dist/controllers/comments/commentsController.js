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
exports.dislikeComment = exports.likeComment = exports.deleteComment = exports.getComments = exports.updateComment = exports.createComment = void 0;
const Comments_1 = __importDefault(require("../../models/comments/Comments"));
const User_1 = __importDefault(require("../../models/users/User"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId, userId, content } = req.body;
        if (!movieId || !userId || !content || movieId === null || userId === null || content === "") {
            return res.status(401).json({ error: "All fields are required" });
        }
        ;
        const newComment = new Comments_1.default({ movieId, userId, content });
        yield newComment.save();
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
        const { content } = req.body;
        const user = yield User_1.default.findById(req.user);
        const comment = yield Comments_1.default.findById(_id);
        console.log("line 25", user);
        if ((user === null || user === void 0 ? void 0 : user._id.toString()) !== (comment === null || comment === void 0 ? void 0 : comment.userId)) {
            return res.status(401).json({ error: "Only authors can edit comments." });
        }
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        ;
        const updatedComment = yield Comments_1.default.findByIdAndUpdate(_id, { content }, { new: true });
        return res.status(200).json(updatedComment);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.updateComment = updateComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        if (!movieId) {
            return res.status(400).json({ error: "Movie ID is required" });
        }
        ;
        const comments = yield Comments_1.default.find({ movieId }).exec();
        if (!comments) {
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
        const { _id } = req.params;
        const user = yield User_1.default.findById(req.user);
        const comment = yield Comments_1.default.findById(_id);
        if ((user === null || user === void 0 ? void 0 : user._id.toString()) === (comment === null || comment === void 0 ? void 0 : comment.userId)) {
            return res.status(401).json({ error: "You cannot like your own comment." });
        }
        if (user === null || user === void 0 ? void 0 : user.likedComments.includes(_id)) {
            return res.status(401).json({ error: "You have already liked this comment." });
        }
        ;
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
        const { _id } = req.params;
        const user = yield User_1.default.findById(req.user);
        const comment = yield Comments_1.default.findById(_id);
        if ((user === null || user === void 0 ? void 0 : user._id.toString()) !== (comment === null || comment === void 0 ? void 0 : comment.userId)) {
            return res.status(400).json({ error: "You did not like this comment." });
        }
        if (user === null || user === void 0 ? void 0 : user.likedComments.includes(_id)) {
            return res.status(401).json({ error: "You have already disliked this comment." });
        }
        ;
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        ;
        comment.dislikes -= 1;
        yield comment.save();
        return res.status(200).json(comment);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.dislikeComment = dislikeComment;
