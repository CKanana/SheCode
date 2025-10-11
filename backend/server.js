import admin from "./firebase.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";
import User from "./models/User.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Direct test route to create a user (matches requested endpoint)
app.post("/api/test-user", async (req, res) => {
  try {
    const { firebaseUid, email, firstName, lastName } = req.body;
    const user = new User({ firebaseUid, email, firstName, lastName });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("MongoDB connection test successful!");
});

// Protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// User routes
app.use("/user", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
