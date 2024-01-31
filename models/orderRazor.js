import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    isPaid: {
      type: Boolean,
      default: true,
    },
    paymentMode: {
      type: Boolean,
      default: true,
    },
    amount: {
      type: Number,
    },
    invoiceNo: {
      type: Number,
    },
    item: [],
    razorpay: {
      orderId: {
        type: String,
        default: "",
      },
      paymentId: {
        type: String,
        default: "",
      },
      signature: {
        type: String,
        default: "",
      },
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
