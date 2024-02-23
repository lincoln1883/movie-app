"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeComment = exports.putComment = exports.readComment = exports.readAllComments = exports.postComment = void 0;
const express_1 = __importDefault(require("express"));
const commentsController_1 = require("../../controllers/comments/commentsController");
const passport_1 = __importDefault(require("../../services/passport"));
const router = express_1.default.Router();
exports.postComment = router.post("/posts/:postId/comments", passport_1.default.authenticate("jwt", { session: false }), commentsController_1.createComment);
exports.readAllComments = router.get("/comments", passport_1.default.authenticate("jwt", { session: false }), commentsController_1.getAllComments);
exports.readComment = router.get("/posts/:postId/comments", passport_1.default.authenticate("jwt", { session: false }), commentsController_1.getComments);
exports.putComment = router.put("posts/:postId/comments/:_id", passport_1.default.authenticate("jwt", { session: false }), commentsController_1.updateComment);
exports.removeComment = router.delete("/posts/:postId/comments/:_id", passport_1.default.authenticate("jwt", { session: false }), commentsController_1.deleteComment);
