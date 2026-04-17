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

// Simple logger for verification actions (debug help)
function logDebug(userId, action, body) {
  // keep logs minimal and safe (avoid logging secrets)
  // eslint-disable-next-line no-console
  console.info(`[verification] user=${userId} action=${action} body=${JSON.stringify(body || {})}`);
}

router.get("/me", async (req, res, next) => {
  try {
    logDebug(req.userId, "me", null);
    const user = await User.findById(req.userId).select(
      "email verificationStep pan aadhar bank kyc"
    );
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json({
      id: user.id,
      email: user.email,
      verificationStep: user.verificationStep,
      pan: user.pan,
      aadhar: user.aadhar,
      bank: user.bank,
      kyc: user.kyc,
    });
  } catch (e) {
    next(e);
  }
});

router.post("/advance", async (req, res, next) => {
  try {
    const { to } = req.body || {};
    logDebug(req.userId, "advance", { to });
    const allowed = ["pan", "aadhar", "bank", "kyc", "done"];
    if (!allowed.includes(to)) return res.status(400).json({ message: "Invalid step" });
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { verificationStep: to } },
      { new: true }
    ).select("email verificationStep");
    res.json({ id: user.id, email: user.email, verificationStep: user.verificationStep });
  } catch (e) {
    next(e);
  }
});

// Save PAN details and advance to aadhar
router.post("/pan", async (req, res, next) => {
  try {
    const { number, name, dob } = req.body || {};
    logDebug(req.userId, "pan", { number, name, dob });
    if (!number) return res.status(400).json({ message: "PAN number is required" });

    // Check if PAN verification is already completed
    const existingUser = await User.findById(req.userId).select("pan");
    if (existingUser.pan.verified) {
      return res.status(400).json({ message: "PAN verification already completed" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          pan: {
            number,
            name,
            dob,
            verified: true,
            verifiedAt: new Date()
          },
          verificationStep: "aadhar",
        },
      },
      { new: true }
    ).select("email verificationStep pan");
    // eslint-disable-next-line no-console
    console.info(`[verification] updated pan for user=${req.userId} panVerified=${user.pan.verified}`);
    res.json({ id: user.id, email: user.email, verificationStep: user.verificationStep, pan: user.pan });
  } catch (e) {
    next(e);
  }
});

// Save Aadhaar details and advance to bank
router.post("/aadhar", async (req, res, next) => {
  try {
    const { number, name, dob } = req.body || {};
    logDebug(req.userId, "aadhar", { number, name, dob });
    if (!number) return res.status(400).json({ message: "Aadhaar number is required" });

    // Check if Aadhaar verification is already completed
    const existingUser = await User.findById(req.userId).select("aadhar pan");
    if (existingUser.aadhar.verified) {
      return res.status(400).json({ message: "Aadhaar verification already completed" });
    }
    // Check if PAN verification is completed
    if (!existingUser.pan.verified) {
      return res.status(400).json({ message: "Please complete PAN verification first" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          aadhar: {
            number,
            name,
            dob,
            verified: true,
            verifiedAt: new Date()
          },
          verificationStep: "bank",
        },
      },
      { new: true }
    ).select("email verificationStep aadhar");
    // eslint-disable-next-line no-console
    console.info(`[verification] updated aadhar for user=${req.userId} aadharVerified=${user.aadhar.verified}`);
    res.json({ id: user.id, email: user.email, verificationStep: user.verificationStep, aadhar: user.aadhar });
  } catch (e) {
    next(e);
  }
});

// Save Bank details and advance to kyc
router.post("/bank", async (req, res, next) => {
  try {
    const { accountNumber, ifsc, holderName } = req.body || {};
    logDebug(req.userId, "bank", { accountNumber, ifsc, holderName });
    if (!accountNumber || !ifsc) return res.status(400).json({ message: "accountNumber and ifsc are required" });

    // Check if Bank verification is already completed
    const existingUser = await User.findById(req.userId).select("bank aadhar");
    if (existingUser.bank.verified) {
      return res.status(400).json({ message: "Bank verification already completed" });
    }
    // Check if Aadhaar verification is completed
    if (!existingUser.aadhar.verified) {
      return res.status(400).json({ message: "Please complete Aadhaar verification first" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          bank: {
            accountNumber,
            ifsc,
            holderName,
            verified: true,
            verifiedAt: new Date()
          },
          verificationStep: "kyc",
        },
      },
      { new: true }
    ).select("email verificationStep bank");
    // eslint-disable-next-line no-console
    console.info(`[verification] updated bank for user=${req.userId} bankVerified=${user.bank.verified}`);
    res.json({ id: user.id, email: user.email, verificationStep: user.verificationStep, bank: user.bank });
  } catch (e) {
    next(e);
  }
});

// Complete KYC and set done
router.post("/kyc/complete", async (req, res, next) => {
  try {
    logDebug(req.userId, "kyc/complete", null);
    // Check if KYC is already completed
    const existingUser = await User.findById(req.userId).select("kyc bank");
    if (existingUser.kyc.status === "completed") {
      return res.status(400).json({ message: "KYC already completed" });
    }
    // Check if Bank verification is completed
    if (!existingUser.bank.verified) {
      return res.status(400).json({ message: "Please complete Bank verification first" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: { "kyc.status": "completed", verificationStep: "done" },
        $currentDate: { "kyc.completedAt": true },
      },
      { new: true }
    ).select("email verificationStep kyc");
    // eslint-disable-next-line no-console
    console.info(`[verification] completed kyc for user=${req.userId} status=${user.kyc.status}`);
    res.json({ id: user.id, email: user.email, verificationStep: user.verificationStep, kyc: user.kyc });
  } catch (e) {
    next(e);
  }
});

// Debug route: returns the full user document for the current authenticated user
// This is intended for local development only.
router.get("/debug", async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).lean();
    if (!user) return res.status(404).json({ message: "Not found" });
    // don't return sensitive fields
    delete user.passwordHash;
    res.json(user);
  } catch (e) {
    next(e);
  }
});

export default router;


