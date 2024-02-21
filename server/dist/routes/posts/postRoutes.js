"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPost = exports.removePost = exports.readPost = exports.readPosts = exports.createPostRoute = void 0;
const express_1 = __importDefault(require("express"));
const postsController_1 = require("../../controllers/posts/postsController");
const passport_1 = __importDefault(require("../../services/passport"));
const router = express_1.default.Router();
exports.createPostRoute = router.post("/posts", passport_1.default.authenticate("jwt", { session: false }), postsController_1.createPost);
exports.readPosts = router.get("/posts", postsController_1.getPosts);
exports.readPost = router.get("/posts/:id", postsController_1.getPost);
exports.removePost = router.delete("/posts/:id", passport_1.default.authenticate("jwt", { session: false }), postsController_1.deletePost);
exports.editPost = router.put("/posts/:id", passport_1.default.authenticate("jwt", { session: false }), postsController_1.updatePost);
