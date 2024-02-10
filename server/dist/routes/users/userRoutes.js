"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const express_1 = __importDefault(require("express"));
//import passport from 'passport';
const userController_1 = __importDefault(require("../../controllers/users/userController"));
const router = express_1.default.Router();
exports.signUp = router.post("/signup", userController_1.default);
