"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUsers = exports.readUsers = exports.readUser = exports.removeUser = exports.signUp = exports.updateUser = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/users/userController");
const passport_1 = __importDefault(require("../../services/passport"));
const router = express_1.default.Router();
exports.updateUser = router.put("/users/:_id", passport_1.default.authenticate("jwt", { session: false }), userController_1.editUser);
exports.signUp = router.post("/signup", userController_1.createUser);
exports.removeUser = router.delete("/users/:_id", passport_1.default.authenticate("jwt", { session: false }), userController_1.deleteUser);
exports.readUser = router.get("/users/:_id", passport_1.default.authenticate("jwt", { session: false }), userController_1.getUser);
exports.readUsers = router.get("/users", passport_1.default.authenticate("jwt", { session: false }), userController_1.getUsers);
exports.followUsers = router.put("/users/:_id/follow", passport_1.default.authenticate("jwt", { session: false }), userController_1.followUser);
