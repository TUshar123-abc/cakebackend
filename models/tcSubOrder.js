import mongoose from "mongoose";
const tcPaymentSchema = new mongoose.Schema(
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
    cakeOwnerName: {
      type: String,
    },
    cakeName: {
      type: String,
    },
    cakeId: {
     type: String
    },
    subscriptionPlan: {
      type: String,
    },
    invoiceNo:{
      type:Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", tcPaymentSchema);
