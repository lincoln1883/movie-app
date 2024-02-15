"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieComments = exports.postMovieComment = void 0;
const express_1 = __importDefault(require("express"));
const commentsController_1 = require("../../controllers/comments/commentsController");
const passport_1 = __importDefault(require("../../services/passport"));
const router = express_1.default.Router();
exports.postMovieComment = router.post("/comments", passport_1.default.authenticate("jwt", { session: false }), commentsController_1.createComment);
exports.getMovieComments = router.get("/comments/:movieId", commentsController_1.getComments);
