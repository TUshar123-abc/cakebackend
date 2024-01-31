import { isValidObjectId } from "mongoose";
import DelOrder from "../models/DelOrder.js";
import tfcOrder from "../models/tfcOrder.js";
import userModel from "../models/userModel.js";

export const createdelOrderController = async (req, res) => {
  try {
    const { buyer, delId, orderId } = req.body;

    // getin order idddddddddddd
    const d = await tfcOrder.findOne({ orderId });
    if (!d) {
      return res.send({
        success: false,
        message: "First allot tiffin center then allot delivery boy",
      });
    }
    // check if this order already placed

    const exe = await DelOrder.findOne({ orderId });
    if (exe) {
      return res.send({
        success: false,
        message: "already alloted...!",
      });
    }
    /// validation
    if (!isValidObjectId(buyer)) {
      return res.status(404).send({
        success: false,
        message: "buyer not valid",
      });
    }
    if (!isValidObjectId(orderId)) {
      return res.status(404).send({
        success: false,
        message: "order not valid",
      });
    }

    const tiffincenter = d.centerId;

    if (!isValidObjectId(d.centerId)) {
      return res.status(404).send({
        success: false,
        message: "Tiffin Center  not valid",
      });
    }

    if (!isValidObjectId(delId)) {
      return res.status(404).send({
        success: false,
        message: "delId is not valid",
      });
    }

    const data = await DelOrder.create({
      buyer,
      orderId,
      delId,
      tiffincenter,
    });
    if (data) {
      res.status(201).send({
        success: true,
        message: "created successfully....!",
        data,
      });
    }
  } catch (error) {
    // console.log(error);
  }
};

//get all orders

export const getDetails = async (req, res) => {
  try {
    // console.log("Request received for getDetails");

    const { orderId } = req.params;
    //  console.log("orderId:", orderId);

    const delOrder = await tfcOrder.findOne({ orderId });
    // console.log("delOrder:", delOrder);

    if (!delOrder) {
      // console.log("DelOrder not found for the given orderId");
      return res.send({
        success: false,
        message: "DelOrder not found for the given orderId",
      });
    }

    const customer = await userModel.findOne({ _id: delOrder.buser });
    // console.log("customer:", customer);

    if (!customer) {
      //console.log("Customer not found for the given orderId");
      return res.send({
        success: false,
        message: "Customer not found for the given orderId",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer information retrieved successfully",
      data: {
        customerName: customer.name,
        customerId: customer._id,
        address: customer.address,
        contact: customer.phone,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//getdetails using

export const getTCDetails = async (req, res) => {
  try {
    //console.log("Request received for getDetails");

    const { orderId } = req.params;
    //console.log("orderId:", orderId);

    const delOrder = await tfcOrder.findOne({ orderId });
    //  console.log("delOrder:", delOrder);

    if (!delOrder) {
      //console.log("DelOrder not found for the given orderId");
      return res.send({
        success: false,
        message: "DelOrder not found for the given orderId",
      });
    }

    const tcenter = await userModel.findOne({ _id: delOrder.centerId });
    //console.log("customer:", tcenter);

    if (!tcenter) {
      //console.log("T center not found for the given orderId");
      return res.send({
        success: false,
        message: "T center not found for the given orderId",
      });
    }

    res.status(200).json({
      success: true,
      message: "t Center information retrieved successfully",
      data: {
        cakeName: tcenter.cakeName,
        cakeId: tcenter.cakeId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllotedDelOrderByIdController = async (req, res) => {
  try {
    // Retrieve all delivery orders
    const { delId } = req.params;

    const allDelOrders = await DelOrder.find({ delId });

    if (!allDelOrders || allDelOrders.length === 0) {
      return res.send({
        success: false,
        message: "No delivery orders found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All delivery orders retrieved successfully",
      data: allDelOrders,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// getDetailsByBuser

export const getDelOrdersByBuser = async (req, res) => {
  try {
    // Retrieve delivery orders based on buser
    const { buser } = req.params; // Assuming buser is in the request parameters

    const delOrdersByBuser = await tfcOrder.find({ buser });

    if (!delOrdersByBuser || delOrdersByBuser.length === 0) {
      return res.send({
        success: false,
        message: `No delivery orders found for buser: ${buser}`,
      });
    }

    // Customize the response based on your requirements
    res.status(200).json({
      success: true,
      message: `Delivery orders for buser: ${buser} retrieved successfully`,
      data: delOrdersByBuser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    console.log("Request received for getDetails");

    const { centerId } = req.params;
    //console.log("centerId:", centerId);

    // Find all orders with the specified centerId
    const orders = await tfcOrder.find({ centerId: centerId });
    // console.log("Orders:", orders);

    if (!orders || orders.length === 0) {
      //  console.log("Orders not found for the given centerId");
      return res.send({
        success: false,
        message: "Orders not found for the given centerId",
      });
    }

    // Extract user ids from orders
    const userIds = orders.map((order) => order.buser);

    // Find all users with the extracted ids
    const users = await userModel.find({ _id: { $in: userIds } });
    // console.log("Users:", users);

    if (!users || users.length === 0) {
      // console.log("Users not found for the given centerId");
      return res.send({
        success: false,
        message: "Users not found for the given centerId",
      });
    }

    res.status(200).json({
      success: true,
      message: "User information retrieved successfully",
      data: users.map((user) => ({
        name: user.name,
        address: user.address,
        email: user.email,
        pincode: user.pincode,
        phone: user.phone,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
