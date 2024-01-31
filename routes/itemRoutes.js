import express from "express";
import formidable from "express-formidable";
import {
  createCustomItemController,
  createItemController,
  deleteCustomItemController,
  deleteItemController,
  getCustomItemController,
  getCustomSingleItemController,
  getItemController,
  getSingleCustomItemControllerId,
  getSingleItemController,
  getSingleItemControllerId,
  itemCustomisedPhotoController,
  itemPhotoController,
  updataItemController,
} from "../controllers/tItemController.js";

const router = express.Router();

//create food
router.post(
  "/create-item",
  // requireSignIn,
  // isAdmin,
  formidable(),

  createItemController
);
//get all item
router.get(
  "/get-item",
  //requireSignIn, isAdmin,
  getItemController
);
//get single item by id
router.get("/get-singleItemById/:id", getSingleItemControllerId);
//get single item by slug
router.get("/get-singleItem/:slug", getSingleItemController);

//get single item
router.get("/get-photo/:id", itemPhotoController);

//this is another router for getting all images in one time

//delete item
router.delete("/delete-item/:id", deleteItemController);
//update item
router.put("/update-item/:id", formidable(), updataItemController);

// //search order
// router.get("/searchOrder/:orderId", searchOrderController);


router.post(
  "/create-customitem",
  // requireSignIn,
  // isAdmin,
  formidable(),

  createCustomItemController
);
router.get(
  "/get-customitem",
  getCustomItemController
);

//get single item
router.get("/get-customphoto/:id", itemCustomisedPhotoController);

router.get("/get-customsingleItem/:slug", getCustomSingleItemController);
//delete item
router.delete("/delete-customitem/:id", deleteCustomItemController);

//get single custom item by id
router.get("/get-singleCustomItemById/:id", getSingleCustomItemControllerId);

export default router;
