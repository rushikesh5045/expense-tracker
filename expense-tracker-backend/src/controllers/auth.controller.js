import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "changeme";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing credentials" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already in use" });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "7d" });
  res
    .status(201)
    .json({
      user: { id: user._id, email: user.email, name: user.name },
      token,
    });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "7d" });
  res.json({
    user: { id: user._id, email: user.email, name: user.name },
    token,
  });
};

export const hasUsers = async (req, res) => {
  const count = await User.countDocuments();
  res.json({ hasUsers: count > 0 });
};

export const me = async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
    const user = await User.findById(req.userId).select("_id name email");
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
