import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    cartItems: [],
   
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
