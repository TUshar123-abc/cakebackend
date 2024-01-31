import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base

export const requireSignIn = async (req, res, next) => {
  try {
    
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    req.user = decode;
    console.log(req.user._id, "req.user._id");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    console.log(req.user._id, "id inside the isAdmin");
    const user = await userModel.findById(req.user._id);
    console.log(user.role, "user roll in admin isAdmin");
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

export const isTCenter = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 2) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in TCenter middleware",
    });
  }
};
