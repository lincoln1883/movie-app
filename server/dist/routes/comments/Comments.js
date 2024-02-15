"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsRoute = exports.postComment = void 0;
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../../controllers/comments/shows/commentController");
const passport_1 = __importDefault(require("../../services/passport"));
const router = express_1.default.Router();
exports.postComment = router.post("/comments", passport_1.default.authenticate("jwt", { session: false }), commentController_1.createComment);
exports.getCommentsRoute = router.get("/comments/:movieId", commentController_1.getComments);
