import express from "express";
import Chama from "../models/Chama.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Create a new chama
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name, description, goal, members } = req.body;
    const chama = new Chama({
      name,
      description,
      goal,
      members,
      createdBy: req.user._id
    });
    await chama.save();
    res.status(201).json(chama);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all chamas
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const chamas = await Chama.find().sort({ createdAt: -1 });
    res.json(chamas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
