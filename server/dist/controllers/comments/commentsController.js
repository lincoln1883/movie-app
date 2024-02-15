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
exports.getComments = exports.createComment = void 0;
const Comments_1 = __importDefault(require("../../models/comments/Comments"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId, userId, comment } = req.body;
        if (!movieId ||
            !userId ||
            !comment ||
            movieId === null ||
            userId === null ||
            comment === "") {
            return res.status(401).json({ error: "All fields are required" });
        }
        //const user = await User.findById({ _id: userId }).exec();
        const newComment = new Comments_1.default({ movieId, userId, comment });
        yield newComment.save();
        return res.status(201).json(newComment);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.createComment = createComment;
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
        return res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.getComments = getComments;
