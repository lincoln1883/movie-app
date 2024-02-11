"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = __importDefault(require("express"));
const loginController_1 = __importDefault(require("../../controllers/auth/loginController"));
const router = express_1.default.Router();
exports.login = router.post("/login", loginController_1.default);
