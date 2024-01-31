import Attendance from "../models/attendenceModel.js";
import tfcOrder from "../models/tfcOrder.js";

//create attendence

export const createAttendance = async (req, res) => {
  const { date, delivered, notDelivered } = req.body;
  const orderId = req.params.orderId;

  // console.log("Received request with data:", { date, morningAttendance, eveningAttendance, orderId });

  try {
    const newAttendance = await new Attendance({
      date,
      delivered,
      notDelivered,
      orderId,
    }).save();

    // console.log("Saved attendance:", newAttendance);
    res.status(201).json(newAttendance);
  } catch (error) {
    // console.error("Error saving attendance:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAttendence = async (req, res) => {
  try {
    const attendance = await Attendance.find({ orderId: req.params.orderId });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAttendence = async (req, res) => {
  try {
    const attendance = await Attendance.findOneAndUpdate(
      { orderId: req.params.orderId },
      req.body,
      { new: true, upsert: true }
    );
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTfAllotedOrderController = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await tfcOrder.find({ centerId: id });
    if (data) {
      res.send({ success: true, message: "data find ", data });
    }
    if (!data) {
      res.send({ success: false, message: "data not find..!" });
    }
  } catch (error) {
    //  console.log(error)
  }
};
export const getTfOrderDataController = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await tfcOrder.find({ centerId: id });
    if (data) {
      res.send({ success: true, message: "data find ", data });
    }
    if (!data) {
      res.send({ success: false, message: "data not find..!" });
    }
  } catch (error) {
    // console.log(error)
  }
};
