import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    req.userId = payload.sub;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

router.use(authMiddleware);

router.get("/me", async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("email displayName pan");
    if (!user) return res.status(404).json({ message: "Not found" });
    return res.json({ id: user.id, email: user.email, displayName: user.displayName, pan: user.pan });
  } catch (e) {
    next(e);
  }
});

router.put("/me", async (req, res, next) => {
  try {
    const { displayName, email } = req.body || {};
    const updates = {};
    if (typeof displayName === "string") updates.displayName = displayName;
    if (typeof email === "string") {
      const normalized = email.trim().toLowerCase();
      // ensure email uniqueness excluding current user
      const existing = await User.findOne({ email: normalized, _id: { $ne: req.userId } }).select("_id");
      if (existing) {
        return res.status(409).json({ message: "Email already in use" });
      }
      updates.email = normalized;
    }
    const user = await User.findByIdAndUpdate(req.userId, { $set: updates }, { new: true }).select(
      "email displayName"
    );
    return res.json({ id: user.id, email: user.email, displayName: user.displayName });
  } catch (e) {
    next(e);
  }
});

export default router;


