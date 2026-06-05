import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv"

import healthRouter from "./routes/health.js";
import authRouter from "./routes/auth.js";
import verificationRouter from "./routes/verification.js";
import profileRouter from "./routes/profile.js";
import paymentRouter from "./routes/payments.js"
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Core middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Routes
app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/verification", verificationRouter);
app.use("/profile", profileRouter);
app.use("/payment",paymentRouter);

// 404 and error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;


