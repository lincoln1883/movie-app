"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAllLikes = exports.readLikes = exports.removeLike = exports.postLike = void 0;
const express_1 = __importDefault(require("express"));
const likesController_1 = require("../../controllers/likes/likesController");
const passport_1 = __importDefault(require("../../services/passport"));
const router = express_1.default.Router();
exports.postLike = router.post('/likes', passport_1.default.authenticate('jwt', { session: false }), likesController_1.createLike);
exports.removeLike = router.delete('/likes/:likeId', passport_1.default.authenticate('jwt', { session: false }), likesController_1.deleteLike);
exports.readLikes = router.get('/likes/:postId', passport_1.default.authenticate('jwt', { session: false }), likesController_1.getLikes);
exports.readAllLikes = router.get('/likes', passport_1.default.authenticate('jwt', { session: false }), likesController_1.getAllLikes);
