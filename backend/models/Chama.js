import mongoose from "mongoose";

const ChamaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  goal: { type: Number, required: true },
  members: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Chama", ChamaSchema);
