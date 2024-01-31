import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelpers.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import orderRazor from "../models/orderRazor.js";
import mongoose from "mongoose";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, pincode } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    if (!pincode) {
      return res.send({ message: "pincode is required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: " Email is already Registered! Please Login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      pincode,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
// Define route to handle GET request to fetch user by ID
/* export const getDataById = ()=> async (req, res) => {
  try {
    const user = await userModel.find(  );
    res.json({
      success: true,
      user: user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while getting user by ID",
      error: error.message 
    });
  }
}; */


export const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: " user  Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting user",
      error,
    });
  }
};
// Tiffin center register controller
export const addCakeSellerController = async (req, res) => {
  try {
    let role = 2;
    const {
      cakeOwnerName,
      cakeName,
      email,
      password,
      phone,
      cakeId,
      pincode,
      pincode1,
      pincode2,
      pincode3,
      pincode4,
      status,
      subscriptionPlan,
      startDate,
      endDate,
      address,
    } = req.body;
    //validations
    if (!cakeOwnerName) {
      return res.send({ error: "Owner Name is Required" });
    }
    if (!cakeName) {
      return res.send({ error: "Tiffin Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!cakeId) {
      return res.send({ error: "Tiffin Id is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!pincode) {
      return res.send({ message: "PinCode is Required" });
    }
    if (!status) {
      return res.send({ message: "Status is Required" });
    }
    if (!subscriptionPlan) {
      return res.send({ message: "Status is Required" });
    }
    if (!startDate) {
      return res.send({ message: "Start Date is Required" });
    }
    if (!endDate) {
      return res.send({ message: "End Date is Required" });
    }

    if (cakeId.toString().length !== 4 || isNaN(cakeId)) {
      return res.send({
        error: "Tiffin Id should be a 4-digit number",
      });
    }

    // Check if tiffinId already exists
    const existingCake = await userModel.findOne({ cakeId });
    if (existingCake) {
      return res.status(200).send({
        success: false,
        message: "Cake Id already exists. Please enter a different one.",
      });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //     //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      cakeOwnerName,
      cakeName,
      email,
      phone,
      cakeId,
      pincode,
      pincode1,
      pincode2,
      pincode3,
      pincode4,
      status,
      subscriptionPlan,
      startDate,
      endDate,
      address,
      password: hashedPassword,
      role,
    }).save();

    res.status(201).send({
      success: true,
      message: "Cake Seller Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Cake Seller Registration",
      error,
    });
  }
};

//add delivery boy acc to sir
export const addDelBoyController = async (req, res) => {
  try {
    let role = 3;

    const {
      name,
      email,
      password,
      uniqueId,
      phone,
      address,
      pincode,
      dln,
      acn,
      status,
    } = req.body;
    //validation
    if (!name) {
      return res.send({ message: "Name is required...!" });
    }

    if (!email) {
      return res.send({ message: "Email is required...!" });
    }

    if (!password) {
      return res.send({
        message: "Password is required...!",
      });
    }

    if (!uniqueId) {
      return res.send({
        message: "Unique id is required...!",
      });
    }
    if (uniqueId) {
      if (uniqueId.length != 4) {
        return res.send({ message: "Unique Id must be 4 digit only...!" });
      }
    }

    if (!dln) {
      return res.send({ messsage: "Driving Licence is required...!" });
    }
    if (dln) {
      if (dln.length != 16) {
        return res.send({ message: "Driving Licence Number must be 16" });
      }
    }

    if (!acn) {
      return res.send({ message: "Aadhar card number required...!" });
    }
    if (acn) {
      if (acn.length != 12) {
        return res.send({ message: "Aadhar Card Number  must be 12" });
      }
    }

    if (!status) {
      return res.send({ message: "status is required...!" });
    }
    const em = await userModel.findOne({ email });
    if (em) {
      return res.send({ message: "Email is already exist try another...!" });
    }
    // check existing user for unique id

    const e = await userModel.findOne({ uniqueId });

    if (e) {
      return res.send({
        message: "this id is already in use try another id!",
      });
    }

    // now if all is well then create new delivery boy
    const hashedPassword = await hashPassword(password);
    const data = await new userModel({
      name,
      role,
      email,
      password: hashedPassword,
      uniqueId,
      phone,
      address,
      pincode,
      dln,
      acn,
      status,
    }).save();

    res.status(201).send({
      success: true,
      message: "New Delivery Boy Created Successfully.",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Delivery Boy not created...!",
      error,
    });
    console.log(error);
  }
};

// //POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the email and pasword not found
    if (!email && !password) {
      return res.status(200).send({
        succss: false,
        message: "Please Enter Email &  Password",
      });
    }
    // check if the email is not found
    if (!email) {
      return res.status(200).send({
        success: false,
        message: "Please Enter Email",
      });
    }
    //check if the password not found
    if (!password) {
      return res.status(200).send({
        succss: false,
        message: "Please Enter Password",
      });
    }

    //check if the user registerd
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      // user: {
      //   _id: user._id,
      //   name: user.name,
      //   email: user.email,
      //   phone: user.phone,
      //   address: user.address,
      //   role: user.role,
      // },
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const transporter = nodemailer.createTransport({
  service: "GMAIL",
  auth: {
    user: "staff.manasvi@gmail.com",
    pass: "ufbnyfxdwfygdksq",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function generateOTP() {
  const length = 6; // You can change the length of the OTP
  const digits = "123456789";
  let OTP = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * 9);
    OTP += digits[index];
  }

  return OTP;
}

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate an OTP (you can use a library like `generate-otp` for this)
    const otp = generateOTP();

    // Store the OTP in your database, associated with the user
    user.resetPasswordOTP = otp;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "GMAIL", // e.g., 'Gmail'
      auth: {
        user: "staff.manasvi@gmail.com",
        pass: "ufbnyfxdwfygdksq",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailoptions = {
      from: "staff.manasvi@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailoptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to send OTP" });
      } else {
        res.status(200).json({ message: "OTP sent to your email" });
      }
    });
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;
  const salt = bcrypt.genSaltSync(10); // Generate a salt
  const hash = bcrypt.hashSync(password, salt); // Hash the password using the generated salt
  const user = await userModel.findOne({ email });

  if (!user || user.resetPasswordOTP !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // Update the user's password
  user.password = hash; // Update the password with the hashed value
  user.resetPasswordOTP = null;
  await user.save();

  // Send a confirmation email
  const confirmationMailOptions = {
    from: "staff.manasvi@gmail.com",
    to: user.email,
    subject: "Password Reset Successful",
    text: "Your password has been successfully reset.",
  };

  transporter.sendMail(confirmationMailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to send confirmation email" });
    }

    // Send a success response after the email has been sent
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  });
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, cakeName, password, address, phone, pincode } = req.body;
    const  {id} = req.params

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (password && password.length < 6) {
      return res.json({ error: "Password is required and must be at least 6 characters long" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        name: name || user.name,
        cakeName: cakeName || user.cakeName,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
        pincode: pincode || user.pincode,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile",
      error: error.message,
    });
  }
};


// //orders for specific user
export const getOrdersController = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    const orders = await orderRazor
      .find({ buyer: _id })
      // .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};

// //all customer detail
export const getAllCustomerController = async (req, res) => {
  try {
    const Users = await userModel.find({ role: 0 });
    res.json(Users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Users",
      error,
    });
  }
};

// get all Delivery Boy

export const getAllDelBoyController = async (req, res) => {
  try {
    const Users = await userModel.find({ role: 3 });
    res.json(Users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Delivery Boy..!",
      error,
    });
  }
};

// update profile for delivery boy
export const updatedelController = async (req, res) => {
  try {
    const {
      name,
      password,
      address,
      phone,
      pincode,

      uniqueId,
      acn,
      dln,
      status,
    } = req.body;
    const { _id } = req.params;

    const user = await userModel.findById(_id);
    //password

    if (password && password.length > 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
        pincode: pincode || user.pincode,
        uniqueId: uniqueId || user.uniqueId,
        dln: dln || user.dln,
        acn: acn || user.acn,
        status: status || user.status,
      },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

export const deletedelController = async (req, res) => {
  try {
    const pd = await userModel.findById(req.params._id);

    if (pd == null) {
      return res.send({
        success: false,
        message: "id not found",
      });
    }
    const data = await userModel.findByIdAndDelete(req.params._id);

    if (data) {
      res.send({
        success: true,
        message: "Deleted Successfully....!",
        data,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: "Error in Deleting ...!",
      error,
    });
  }
};

//get single user by id
export const getSingleUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (user) {
      res.status(200).send({
        success: true,
        message: "user getting successfully....!",
        user,
      });
    } else {
      res.send({
        success: false,
        message: "Error in getting user...!",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: "Error in getting user...!",
      error,
    });
    // console.log(error);
  }
};

/// some changes

/* update tiffin center */

export const updateCakeSellersController = async (req, res) => {
  try {
    const {
      cakeOwnerName,
      cakeName,
      email,
      password,
      phone,
      cakeId,
      pincode,
      pincode1,
      pincode2,
      pincode3,
      pincode4,
      status,
      subscriptionPlan,
      startDate,
      endDate,
      address,
    } = req.body;

    const { _id } = req.params;

    const user = await userModel.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword =
      password !== undefined ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      {
        cakeOwnerName: cakeOwnerName || user.cakeOwnerName,
        cakeName: cakeName || user.cakeName,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        cakeId: cakeId || user.cakeId,
        pincode: pincode || user.pincode,
        pincode1: pincode1 || user.pincode1,
        pincode2: pincode2 || user.pincode2,
        pincode3: pincode3 || user.pincode3,
        pincode4: pincode4 || user.pincode4,
        status: status || user.status,
        subscriptionPlan: subscriptionPlan || user.subscriptionPlan,
        startDate: startDate || user.startDate,
        endDate: endDate || user.endDate,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Cake seller Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Error While Update cake seller",
      error,
    });
  }
};

//get tiffin center of wh code

export const getAllCakeSellersController = async (req, res) => {
  try {
    const Users = await userModel.find({ role: 2 });
    res.json(Users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Cake sellers",
      error,
    });
  }
};

export const getAllCakeSellersControllerByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Cake ID",
      });
    }

    const user = await userModel.findOne({ _id: id, role: 2 });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Cake Seller not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while getting Cake Seller by ID",
      error,
    });
  }
};

// // getsingleTiffin in search
export const getSingleCakeSellerController = async (req, res) => {
  try {
    const { param } = req.params;
    let query = {};

    if (param) {
      query = {
        $or: [
          { cakeId: param },
          { cakeOwnerName: param },
          { cakeName: param },
        ],
      };
    }

    const data = await userModel.aggregate([
      {
        $match: query,
      },
    ]);
    if (data.length > 0) {
      res.json(data);
    } else {
      res.send({ success: false, message: "not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// delete tiffin center

export const deleteCakeSellerController = async (req, res) => {
  try {
    const pd = await userModel.findById(req.params._id);

    if (pd == null) {
      return res.send({
        success: false,
        message: "id not found",
      });
    }
    const data = await userModel.findByIdAndDelete(req.params._id);

    if (data) {
      res.send({
        success: true,
        message: "Deleted Successfully....!",
        data,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: "Error in Deleting ...!",
      error,
    });
  }
};
// 9302578603

// single Search for delivery
export const getSingleDelSearchController = async (req, res) => {
  try {
    const { param } = req.params;
    let query = {};

    if (param) {
      query = {
        $or: [
          { name: param, role: 3 },
          { phone: param, role: 3 },
          { uniqueId: param, role: 3 },
        ],
      };
    }

    const data = await userModel.aggregate([
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
    console.log(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};
