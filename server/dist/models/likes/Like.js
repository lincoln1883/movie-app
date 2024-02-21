"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LikeSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        ref: "User",
        required: true,
    },
    postId: {
        type: String,
        ref: "Post",
        required: true,
    },
}, {
    timestamps: true,
});
const Like = mongoose_1.default.model("Like", LikeSchema);
exports.default = Like;
