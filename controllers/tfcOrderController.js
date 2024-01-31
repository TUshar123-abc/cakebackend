import { isValidObjectId } from "mongoose";
import tfcOrder from "../models/tfcOrder.js";

export const createTfc = async (req, res) => {
  try {
    const { buser, orderId, centerId } = req.body;
    // only validation part
    if (!buser) {
      console.log("buser not found");
    }
    if (!isValidObjectId(buser)) {
      return res.send({
        success: false,
        message: "buyer id not valid check it ",
      });
    }

    if (!isValidObjectId(orderId)) {
      return res.send({
        success: false,
        message: "order id not valid check it ",
      });
    }

    // making some extra api

    const alr = await tfcOrder.findOne({ orderId });
    if (alr) {
      return res.send({
        success: false,
        message: "this order already placed",
      });
    }
    const tf = await tfcOrder.create({ buser, orderId, centerId });
    if (tf) {
      res.status(201).send({
        success: true,
        message: "Order Alloted to Tiffin Center ",
        tf,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Order not alloted...!",
      error,
    });
    //   console.log(error, "error");
  }
};

// get tfc order in tiffin center panel

// get alloted tiffin

export const getAllotedTiffin = async (req, res) => {
  try {
    // Retrieve all delivery orders
    const { centerId } = req.params;

    const alloted = await tfcOrder.find({ centerId });

    if (!alloted || alloted.length === 0) {
      return res.send({
        success: false,
        message: "No delivery orders found",
      });
    }

    // You can customize the response based on your requirements
    res.status(200).json({
      success: true,
      message: "All delivery orders retrieved successfully",
      data: alloted,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
