import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema({
  firebaseUid: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  jwtToken: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  profilePic: { type: String },
  phone: { type: String },
  chamaMemberships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chama' }],
  financialData: { type: Object },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("AuthUser", authUserSchema);
