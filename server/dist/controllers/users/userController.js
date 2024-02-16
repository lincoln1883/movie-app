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
exports.getUser = exports.getUsers = exports.deleteUser = exports.editUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../models/users/User"));
const passwordHelper_1 = require("../../utils/passwordHelper");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username ||
            !email ||
            !password ||
            username === "" ||
            email === "" ||
            password === "") {
            return res.status(400).json({ error: "All fields are required" });
        }
        const nameInUse = yield User_1.default.findOne({ username }).exec();
        if (nameInUse) {
            return res
                .status(409)
                .json({ error: "Username already taken, try again" });
        }
        if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
            return res.status(400).json({ error: "Invalid email" });
        }
        if (!(0, passwordHelper_1.verifyPassword)(password)) {
            return res
                .status(400)
                .json({
                error: "Password must be at least 6 characters uppercase, lowercase and digit.",
            });
        }
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hashSync(password, 10);
        const user = new User_1.default({ username, email, password: hashedPassword });
        yield user.save();
        return res.status(201).json((0, passwordHelper_1.omitPassword)(user.toObject()));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.createUser = createUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, profilePicture } = req.body;
        const { _id } = req.params;
        const user = yield User_1.default.findById({ _id });
        if ((user === null || user === void 0 ? void 0 : user._id.toString()) !== _id) {
            return res.status(401).json({ error: "You are not authorized to edit this user" });
        }
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (username) {
            const nameInUse = yield User_1.default.findOne({ username }).exec();
            if (nameInUse) {
                return res
                    .status(409)
                    .json({ error: "Username already taken, try again" });
            }
        }
        if (email) {
            if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
                return res.status(400).json({ error: "Invalid email" });
            }
            const existingEmail = yield User_1.default.findOne({ email });
            if (existingEmail) {
                return res.status(409).json({ error: "Email already exists" });
            }
        }
        if (password) {
            if (!(0, passwordHelper_1.verifyPassword)(password)) {
                return res
                    .status(400)
                    .json({
                    error: "Password must be at least 6 characters uppercase, lowercase and digit.",
                });
            }
            const hashedPassword = yield bcrypt_1.default.hashSync(password, 10);
            user.password = hashedPassword;
        }
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        if (profilePicture)
            user.profilePicture = profilePicture;
        yield user.save();
        return res.status(200).json((0, passwordHelper_1.omitPassword)(user.toObject()));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const user = yield User_1.default.findByIdAndDelete({ _id });
        if ((user === null || user === void 0 ? void 0 : user._id.toString()) !== _id) {
            return res.status(401).json({ error: "You are not authorized to delete this user" });
        }
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.deleteUser = deleteUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        return res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const user = yield User_1.default.findById({ _id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.getUser = getUser;
