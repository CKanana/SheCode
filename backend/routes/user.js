import express from "express";
import User from "../models/User.js";
import verifyFirebaseToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new user (protected)
router.post("/", verifyFirebaseToken, async (req, res) => {
  try {
    const { firebaseUid, email, firstName, lastName } = req.body;
    const user = new User({ firebaseUid, email, firstName, lastName });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch a user by email (protected)
router.get("/:email", verifyFirebaseToken, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.email });
    if (!user) {
      // Auto-create user for Google sign-in
      const firebaseUser = req.firebaseUser;
      user = new User({
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        firstName: firebaseUser.name || "",
        lastName: "",
      });
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
