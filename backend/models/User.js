import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  createdAt: { type: Date, default: Date.now },
  // Add more fields as needed (profile, chama info, etc)
});

export default mongoose.model("User", userSchema);
