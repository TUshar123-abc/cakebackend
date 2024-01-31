import tcSubOrder from "../models/tcSubOrder.js";
import Razorpay from "razorpay";

import orderRazor from "../models/orderRazor.js";
import customisedItemModel from "../models/customisedItemModel.js";
//payment verify
export const razorPayKeyController = async (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
};
//payment verify
export const razorPayCreatOrderController = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,
      currency: "INR",
    };

    const orderRazor = await instance.orders.create(options);
    if (!orderRazor) return res.status(500).send("Some error occured");
    res.send(orderRazor);
  } catch (error) {
    res.status(500).send(error);
  }
};

//payment verify complete
export const razorPayOrderController = async (req, res) => {
  try {
    const { paymentMode, amount, products, razorpay, buyer } = req.body;
    let amt = amount;
    let finamt = amt.toString().slice(0, -2);
    let dmt = parseInt(finamt);
    // for getting invoice

    let newInvoice;
    let invoice;
    const lastInvoice = await orderRazor.findOne({}).sort({ createdAt: -1 });
    if (lastInvoice == null || lastInvoice.invoiceNo == null) {
      newInvoice = 10101;
    }
    if (lastInvoice) {
      if (lastInvoice.invoiceNo) {
        invoice = lastInvoice.invoiceNo;

        newInvoice = invoice + 1;
      }
    }
    const newOrder = new orderRazor({
      isPaid: true,
      paymentMode: true,
      amount: dmt,
      item: products,
      razorpay: razorpay,
      buyer: buyer,
      invoiceNo: newInvoice,
    });
    await newOrder.save();
    res.send({
      msg: "Payment was successful",
    });
  } catch (error) {
    //  console.log(error);
    res.status(500).send(error);
  }
};
//payment verify
export const razorPayListOrderController = async (req, res) => {
  try {
    const orders = await orderRazor.find();
    res.send(orders);
  } catch (error) {
    // console.log(error);
    res.status(500).send(error);
  }
};

// find single order for customer
export const getSingleOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send("id not found");
    }
    const order = await orderRazor.find({ buyer: id });
    if (order) {
      res.status(200).send({
        success: true,
        message: "find",
        order,
      });
    }
    if (!order) {
      return res.status(200).send({
        success: true,
        message: "find",
        order,
      });
    }
  } catch (error) {
    //console.log(error);
  }
};

/// below all controller's are making for tiffin Cetner Payment getway

export const tcCreateOrderController = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,

      currency: "INR",
    };

    const tcOrder = await instance.orders.create(options);

    if (!tcOrder) return res.status(500).send("Some error occured");
    res.send(tcOrder);
  } catch (error) {
    // console.log(error);
    res.status(500).send(error);
  }
};

export const getSingletcsController = async (req, res) => {
  const { cakeId } = req.params;
  /*   console.log(tiffinId) */

  try {
    const data = await tcSubOrder.findOne({ cakeId: cakeId });
    /* console.log(data) */

    if (data) {
      res.send({ message: "Subscription found", success: true, data });
    } else {
      res.send({
        message: "Subscription not found",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const tcPayOrderController = async (req, res) => {
  try {
    const {
      amount,
      razorpay,
      cakeOwnerName,
      cakeName,
      subscriptionPlan,
      cakeId,
    } = req.body;
    let amt = amount;
    let finamt = amt.toString().slice(0, -2);
    let dmt = parseInt(finamt);

    // for getting invoice
    let newInvoice;
    let invoice;
    const lastInvoice = await tcSubOrder.findOne({}).sort({ createdAt: -1 });
    if (lastInvoice == null || lastInvoice.invoiceNo == null) {
      newInvoice = 1001;
    }
    if (lastInvoice) {
      if (lastInvoice.invoiceNo) {
        invoice = lastInvoice.invoiceNo;

        newInvoice = invoice + 1;
      }
    }

    //end here
    const newOrder = new tcSubOrder({
      isPaid: true,
      paymentMode: true,
      amount: dmt,
      razorpay: razorpay,
      cakeOwnerName: req.body.cakeOwnerName,
      cakeName: req.body.cakeName,
      cakeId: req.body.cakeId,
      subscriptionPlan: req.body.subscriptionPlan,
      invoiceNo: newInvoice,
    });
    await newOrder.save();

    res.send({
      msg: "Payment was successful",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send(error);
  }
};

export const getAlltcsController = async (req, res) => {
  try {
    const data = await tcSubOrder.find();
    if (data) {
      res.send({ message: "all subscriptions find", success: true, data });
    }
    if (!data) {
      res.send({
        message: "not find subscriptions",
        success: false,
      });
    }
  } catch (error) {
    // console.log(error);
  }
};
// for get single subs

export const getSingleSubsController = async (req, res) => {
  try {
    const { param } = req.params;
    let query = {};

    if (param) {
      query = {
        $or: [
          { tiffinId: param },
          { tcOwnerName: param },
          { tiffinName: param },
          { invoiceNo: param },
        ],
      };
    }

    const data = await tcSubOrder.aggregate([
      {
        $match: query,
      },
    ]);

    if (data.length > 0) {
      res.send({ success: true, message: "get single data", data });
    } else {
      res.send({ success: false, message: "not found" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// Searching for all ordre page
export const allOrderSearch = async (req, res) => {
  try {
    const { param } = req.params;
    let query = {};

    if (param) {
      query = {
        $or: [{ "razorpay.orderId": param }],
      };
    }

    const data = await orderRazor.aggregate([
      {
        $match: query,
      },
    ]);

    if (data.length > 0) {
      res.send(data);
    } else {
      res.send({ success: false, message: "not found" });
    }
  } catch (error) {
    //console.log(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

//apis for checkout payment for customised cake orders

export const customcakeCreateOrderController = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,
      currency: "INR",
    };

    const customCakeOrder = await instance.orders.create(options);

    if (!customCakeOrder) return res.status(500).send("Some error occured");
    res.send(customCakeOrder);
  } catch (error) {
    // console.log(error);
    res.status(500).send(error);
  }
};

export const cakePayOrderController = async (req, res) => {
  try {
    // Extract relevant fields from the request body
    const { price, razorpay, deliveryDate, buyer, deliveryTime } = req.body;

    /*  console.log("Request body:", req.body); // Log the request body */

    // Fetch last invoice to generate new invoice number
    const lastInvoice = await customisedItemModel
      .findOne({}, { invoiceNo: 1 })
      .sort({ invoiceNo: -1 });

    let newInvoice;
    if (!lastInvoice || isNaN(lastInvoice.invoiceNo)) {
      newInvoice = 5001; // Set a default invoice number if no previous invoice exists
    } else {
      newInvoice = lastInvoice.invoiceNo + 1; // Increment the last invoice number
    }

    /*     console.log("New invoice:", newInvoice); // Log the new invoice */

    // Create a new order instance
    const newOrder = new customisedItemModel({
      isPaid: true,
      paymentMode: true,
      price: price,
      razorpay: razorpay,
      deliveryDate: deliveryDate,
      deliveryTime: deliveryTime,
      invoiceNo: newInvoice,
      buyer: buyer,
    });
    /* 
    console.log("New order:", newOrder); // Log the new order before saving */

    // Save the new order to the database
    await newOrder.save();
    console.log("Order saved successfully");

    // Send success response
    res.send({
      msg: "Payment was successful",
      invoiceNo: newInvoice, // Include invoice number in the response
    });
  } catch (error) {
    console.error("Error in cakePayOrderController:", error); // Log the error
    res.status(500).send(error); // Send error message in response
  }
};


// find single order for customer
export const getSinglecustomisedOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send("id not found");
    }
    const order = await customisedItemModel.find({ buyer: id });
    if (order) {
      res.status(200).send({
        success: true,
        message: "find",
        order,
      });
    }
    if (!order) {
      return res.status(200).send({
        success: true,
        message: "find",
        order,
      });
    }
  } catch (error) {
    //console.log(error);
  }
};