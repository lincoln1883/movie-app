"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
const Comment = mongoose_1.default.model("Comment", CommentSchema);
exports.default = Comment;
