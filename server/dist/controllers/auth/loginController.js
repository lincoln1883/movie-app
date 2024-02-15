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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../models/users/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passwordHelper_1 = require("../../utils/passwordHelper");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password || email === "" || password === "") {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!(0, passwordHelper_1.verifyPassword)(password)) {
            return res.status(400).json({
                error: "Password must be at least 6 characters uppercase, lowercase and digit.",
            });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, secret, { expiresIn: "3h" });
        // Generate the user object to return without the password
        const userObject = (0, passwordHelper_1.omitPassword)(user.toObject());
        return res.status(200).json({ token, userObject });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.default = loginUser;
