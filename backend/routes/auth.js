import express from "express";
import AuthUser from "../models/AuthUser.js";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";

const router = express.Router();

// Sign up
router.post("/signup", async (req, res) => {
  try {
    let { firebaseUid, email, password, firstName, lastName, profilePic, phone, financialData } = req.body;
    const existing = await AuthUser.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already in use" });
    
    if (!firebaseUid) {
      firebaseUid = crypto.randomUUID();
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    // JWT token can be generated here if needed
    const user = new AuthUser({
      firebaseUid,
      email,
      passwordHash,
      firstName,
      lastName,
      profilePic,
      phone,
      financialData,
    });
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthUser.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid password" });
    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    user.jwtToken = token;
    await user.save();
    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
