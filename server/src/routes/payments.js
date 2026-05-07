import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

import Payment from "../models/payment.js";

const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// CREATE ORDER
router.post("/order", async (req, res) => {
  try {
    const { amount, userId } = req.body;

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save to DB
    const payment = new Payment({
      userId,
      amount,
      currency: "INR",
      orderId: order.id,
      status: "created",
    });

    await payment.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// VERIFY PAYMENT
router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          status: "success",
        }
      );

      return res.json({
        success: true,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;