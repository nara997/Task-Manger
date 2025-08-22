import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

// Generate JWT
const signToken = (user) => {
    return jwt.sign(
        { id: user._id.toString(), email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );
};

// Cookie options
const cookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
});

// 🔹 Signup
export const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email & password required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(409).json({ error: "Email already in use" });
    }

    const user = await User.create({ username, email, password });
    const token = signToken(user);

    res
        .cookie("token", token, cookieOptions())
        .status(201)
        .json({
            user: { id: user._id, username: user.username, email: user.email },
        });
});

// 🔹 Login
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email & password required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user);

    res
        .cookie("token", token, cookieOptions())
        .json({
            user: { id: user._id, username: user.username, email: user.email },
        });
});

// 🔹 Logout
export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token", cookieOptions());
    res.json({ message: "Logged out successfully" });
});

// 🔹 Me (check session)
export const me = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("_id username email");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
});
