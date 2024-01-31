import mongoose from "mongoose";

const tfcSchema = new mongoose.Schema(
  {
    buser: {
      type: mongoose.ObjectId,
      required: true,
    },
    orderId: {
      type: mongoose.ObjectId,
      require: true,
    },
    centerId: {
      type: mongoose.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
export default mongoose.model("TfOrder", tfcSchema);
