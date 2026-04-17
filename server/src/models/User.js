import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    displayName: { type: String, trim: true },
    pan: {
      number: { type: String, trim: true },
      name: { type: String, trim: true },
      dob: { type: String, trim: true },
      verified: { type: Boolean, default: false },
      verifiedAt: { type: Date }
    },
    aadhar: {
      number: { type: String, trim: true },
      name: { type: String, trim: true },
      dob: { type: String, trim: true },
      verified: { type: Boolean, default: false },
      verifiedAt: { type: Date }
    },
    bank: {
      accountNumber: { type: String, trim: true },
      ifsc: { type: String, trim: true },
      holderName: { type: String, trim: true },
      verified: { type: Boolean, default: false },
      verifiedAt: { type: Date }
    },
    kyc: {
      completedAt: { type: Date },
      status: { type: String, enum: ["pending", "completed"], default: "pending" },
    },
    verificationStep: {
      type: String,
      enum: ["pan", "aadhar", "bank", "kyc", "done"],
      default: "pan",
      index: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;


