import mongoose from "mongoose";
const delorderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.ObjectId,
      required: true,
    },
    orderId: {
      type: mongoose.ObjectId,
      required: true,
    },
    tiffincenter: {
      type: mongoose.ObjectId,
      //required: true,
    },
    delId: {
      type: mongoose.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("delOrder", delorderSchema);
