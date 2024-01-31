import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getAllCustomerController,
  deleteUserController,
  resetPassword,
  getOrdersController,
  addDelBoyController,
  getAllDelBoyController,
  updatedelController,
  deletedelController,
  getSingleUserController,
  getSingleDelSearchController,
  addCakeSellerController,
  getAllCakeSellersController,
  getAllCakeSellersControllerByID,
  updateCakeSellersController,
  deleteCakeSellerController,
  getSingleCakeSellerController,
 /*  getDataById, */
} from "../controllers/authController.js";

//router object
const router = express.Router();

// user register \\ method post
router.post("/register", registerController);

/* // user register \\ method get
router.get('/aja-use', getDataById) */
// delete user  || method delete
router.delete(
  "/delete-user/:id",

  deleteUserController
);
// Tiffin Center Register // mehtod post

router.post("/add-cake", addCakeSellerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forget-password", forgotPasswordController);

//reset password
router.post("/resetpassword", resetPassword);
//update profile
router.put(
  "/update-profile/:id",
  // requireSignIn,
  updateProfileController
);
// update delivery boy
router.put(
  "/update-del/:_id",
  // requireSignIn,
  updatedelController
);

//delete delivery boy
router.delete("/delete-del/:_id", deletedelController);

//orders
router.get("/orders", getOrdersController);

// get single orders
router.get("/getSingleOrder");
router.get(
  "/get-allcakeseller",

  getAllCakeSellersController
);

//get all customer details
router.get(
  "/get-allcustomer",

  getAllCustomerController
);

//tiffin
// Tiffin Center Register // mehtod post

router.post("/add-cake", addCakeSellerController);

/* getallTiffinCnetr */

router.get("/get-allcakeseller", getAllCakeSellersController);

/* get tc by id */
router.get(
  "/get-allcakeseller",

  getAllCakeSellersController
);

router.get("/get-cs/:id", getAllCakeSellersControllerByID);

/* update tiffin center */

router.put("/update-cs/:_id", updateCakeSellersController);

/* delete tiffin center */

router.delete("/delete-cs/:_id", deleteCakeSellerController);

//tiffin

router.post("/add-delboy", addDelBoyController);
router.get("/get-delboy", getAllDelBoyController);
router.get("/get-sUser/:id", getSingleUserController);

// serching for tiffin center
router.get("/getS-search/:param", getSingleCakeSellerController);
// searching for delivery boy
router.get("/get-searchDel/:param", getSingleDelSearchController);
export default router;
