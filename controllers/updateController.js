import userModel from "../models/userModel.js";






export const getDataById = ()=> async (req, res) => {
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
  };