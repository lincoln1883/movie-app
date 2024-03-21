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
exports.getUser = exports.getUsers = exports.deleteUser = exports.editUser = exports.createUser = exports.followUser = void 0;
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
            return res.status(400).json({
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
        const { _id } = req.params;
        const { username, bio, firstName, lastName, email, profilePicture } = req.body;
        const user = yield User_1.default.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Construct updated user object
        const updateUser = {
            username: username || user.username,
            email: email || user.email,
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            bio: bio || user.bio,
            profilePicture: profilePicture || user.profilePicture,
        };
        // Update user in the database
        const updatedUser = yield User_1.default.findByIdAndUpdate(_id, updateUser, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(500).json({ error: "Failed to update user" });
        }
        return res.status(200).json((0, passwordHelper_1.omitPassword)(updatedUser.toObject()));
    }
    catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const user = yield User_1.default.findByIdAndDelete({ _id });
        if ((user === null || user === void 0 ? void 0 : user._id.toString()) !== _id) {
            return res
                .status(401)
                .json({ error: "You are not authorized to delete this user" });
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
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        console.log(req.user);
        console.log(_id);
        const user = yield User_1.default.findById(req === null || req === void 0 ? void 0 : req.user);
        if (!user) {
            res.status(404).json({ error: "User not found." });
        }
        const following = yield User_1.default.findById(_id);
        if (!following) {
            res.status(401).json({ error: "Unauthorized" });
        }
        if (user === null || user === void 0 ? void 0 : user.following.includes(_id)) {
            yield User_1.default.findByIdAndUpdate(req.user, { $pull: { following: _id } });
            yield User_1.default.findByIdAndUpdate(_id, { $pull: { followers: req.user } });
        }
        else {
            yield User_1.default.findByIdAndUpdate(req.user, { $push: { following: _id } });
            yield User_1.default.findByIdAndUpdate(_id, { $push: { followers: req.user } });
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield (following === null || following === void 0 ? void 0 : following.save());
        res.status(200).json({ message: "Operation successful" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        throw error;
    }
});
exports.followUser = followUser;
