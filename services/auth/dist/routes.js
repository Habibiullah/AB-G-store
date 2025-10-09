import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "./models/User.js";
const router = Router();
router.post("/register", async (req, res) => {
    const { email, name, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
        return res.status(409).json({ message: "Email already used" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name, passwordHash, role });
    res.status(201).json({ id: user._id, email: user.email });
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
        return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
        return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET || "dev", { expiresIn: "1d" });
    res.json({ token });
});
export default router;
