import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 👈 links to User collection
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: 'INR',
    },

    orderId: {
      type: String,
      unique: true,
    },

    paymentId: {
      type: String,
    },

    signature: {
      type: String,
    },

    status: {
      type: String,
      enum: ['created', 'success', 'failed'],
      default: 'created',
    },

    method: {
      type: String, // UPI, card, etc.
    },

    type: {
      type: String,
      enum: ['verification', 'subscription', 'upgrade'],
      default: 'verification',
    },

    description: {
      type: String,
      default: 'Finverse Payment',
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.models.payment || mongoose.model("Payment", paymentSchema);

export default Payment;