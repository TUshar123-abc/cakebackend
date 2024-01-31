import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    delivered: {
      type: String,
    },
    notDelivered: {
      type: String,
    },
    orderId: {
      type: mongoose.ObjectId,
    },
  },
  // Define indexes for the schema
  {
    // Compound index on 'date' and 'otherField' (add it if needed)
    indexes: [{ key: { date: 1, otherField: 1 }, unique: true }],
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
