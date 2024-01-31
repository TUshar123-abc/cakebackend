import fs from "fs";
import slugify from "slugify";
import tModel from "../models/tModel.js";
import { isValidObjectId } from "mongoose";
import customisedItemModel from "../models/customisedItemModel.js";

export const createItemController = async (req, res) => {
  try {
    const { name, flavour, theme, shape, description, cakeId, color, weight, tier,  price, category, cakeType } =
      req.fields;
    const { photo } = req.files;

    if (!category) {
      return res.status(200).send({ message: "Select a category..!" });
    }
    if (!tier) {
      return res.status(200).send({ message: "Select a tier..!" });
    }
    if (!weight) {
      return res.status(200).send({ message: "Select a weight..!" });
    }
    if (!color) {
      return res.status(200).send({ message: "Select a color..!" });
    }
    if (!shape) {
      return res.status(200).send({ message: "Select a shape..!" });
    }
    if (!theme) {
      return res.status(200).send({ message: "Select a theme..!" });
    }
    
    if (!flavour) {
      return res.status(200).send({ message: "Select a flavour..!" });
    }

    if (!cakeType) {
      return res.status(200).send({ message: " Select cake Type" });
    }
    if (!photo) {
      return res.status(200).send({ message: "upload a photo" });
    }
    if (photo && photo.size > 1000000) {
      return res
        .status(200)
        .send({ message: "Photo is Required and should be less than 1mb" });
    }

    if (!name) {
      return res.status(200).send({ message: "Please Enter name" });
    }

    if (!cakeId) {
      return res
        .status(200)
        .send({ message: "Please Enter cake Id and keep it unique" });
    }
    /// checking id for unique and length

    if (cakeId) {
      if (cakeId.length != 4) {
        return res.send({ message: "cake Id must be 4 digit only...!" });
      }
    }

    const e = await tModel.findOne({ cakeId });

    if (e) {
      return res.send({
        message: "this id is already in use try another id!",
      });
    }
    if (!description) {
      return res.status(200).send({ message: "Description is Required" });
    }

    if (!price) {
      return res.status(200).send({ message: " Pleas Enter price1" });
    }
   

    const data = { ...req.fields, slug: slugify(name) };

    const item = new tModel(data);
    if (photo) {
      item.photo.data = fs.readFileSync(photo.path);
      item.photo.contentType = photo.type;
    }
    await item.save();

    if (item) {
      res.status(201).send({
        success: true,
        message: "Item Created Successfully",
        item,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "item not created....!",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: ["Error in creating Item". error.message]
    });
  }
};

//get all items

export const getItemController = async (req, res) => {
  try {
    const item = await tModel.find({}).select("-photo").sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: item.length,
      message: "All Items",
      item,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting Items",
      error: error.message,
    });
  }
};

//get single item
export const getSingleItemController = async (req, res) => {
  try {
    const item = await tModel
      .findOne({ slug: req.params.slug })
      .select("-photo");

    res.status(200).send({
      success: true,
      message: "Single Item Fetched",
      item,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single Item",
      error,
    });
  }
};

//get single item by id
export const getSingleItemControllerId = async (req, res) => {
  try {
    const id = await req.params.id.trim();
    if (!isValidObjectId(id)) {
      return res.send("item id is not valid");
    }
    const item = await tModel.findById(id).select("-photo");

    if (!item) {
      return res.send({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single Item Fetched",
      item,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting single Item",
      error: error.message, // Send the error message for better client understanding.
    });
  }
};

// // get photo
export const itemPhotoController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.send("id is not valid");
    }
    const item = await tModel.findById(id).select("photo");
    if (item.photo.data) {
      res.set("Content-type", item.photo.contentType);
      return res.status(200).send(item.photo.data);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};
// delete controler
export const deleteItemController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.send("id is not valid");
    }
    const data = await tModel.findByIdAndDelete(id);

    if (data) {
      res.status(200).send({
        message: "Item Deleted Successfully!",
        success: true,
      });
    } else {
      res.status(404).send({
        message: "Item  not Deleted!",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting the item",
      error,
    });
  }
};

//upate Item

export const updataItemController = async (req, res) => {
  try {
    const { name, flavour, theme, shape, description, cakeId, color, weight, tier,  price, category, cakeType } = req.fields;
    const { photo } = req.files;

    // Validation
    const errors = [];

    if (!name) errors.push("Name is required");
    if (!flavour) errors.push("Flavour is required");
    if (!theme) errors.push("Theme is required");
    if (!shape) errors.push("Shape is required");
    if (!cakeId) errors.push("cakeid is required");
    if (!color) errors.push("color is required");
    if (!weight) errors.push("Weight is required");
    if (!tier) errors.push("Tier is required");
    if (!price) errors.push("Price is required");
    if (!category) errors.push("Category is required");
    if (!cakeType) errors.push("CakeType is required");
    if (!description) errors.push("Description is required");
    if (photo && photo.size > 1000000)
      errors.push("Photo is required and should be less than 1MB");

    if (errors.length > 0) {
      return res.status(400).send({ success: false, errors });
    }

    const itemData = { ...req.fields, slug: slugify(name) };
    if (photo) {
      itemData.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }

    const item = await tModel.findByIdAndUpdate(req.params.id, itemData, {
      new: true,
    });

    res.status(201).send({
      success: true,
      message: "Item Updated Successfully",
      item,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update Item",
    });
  }
};


export const createCustomItemController = async (req, res) => {
  try {
    const { flavour, quantity, theme, shape, buyer, deliveryDate, deliveryTime, description, price, color, tier, occasionType, writeName } =
      req.fields;
    const { addPhoto, design  } = req.files;

    if (!quantity) {
      return res.status(200).send({ message: "Select a quantity..!" });
    }
    if (!tier) {
      return res.status(200).send({ message: "Select a tier..!" });
    }
    if (!deliveryDate) {
      return res.status(200).send({ message: "Select delivery date..!" });
    }
    if (!deliveryTime) {
      return res.status(200).send({ message: "Select delivery time..!" });
    }
    if (!color) {
      return res.status(200).send({ message: "Select a color..!" });
    }
    if (!shape) {
      return res.status(200).send({ message: "Select a shape..!" });
    }
    if (!theme) {
      return res.status(200).send({ message: "Select a theme..!" });
    }
    if (!design) {
      return res.status(200).send({ message: "Select a design..!" });
    }
    if (!flavour) {
      return res.status(200).send({ message: "Select a flavour..!" });
    }
    if (!price) {
      return res.status(200).send({ message: "Select a Price..!" });
    }
    if (!occasionType) {
      return res.status(200).send({ message: " Select occassion Type" });
    }
    if (!writeName) {
      return res.status(200).send({ message: " write a name" });
    }
    if (!design) {
      return res.status(200).send({ message: "upload a design" });
    }
    if (!addPhoto){
      return res.status(200).send({ message: "upload a photo" });
    }
    if (design && design.size > 1000000) {
      return res
        .status(200)
        .send({ message: "Photo is Required and should be less than 1mb" });
    }
    if (addPhoto && addPhoto.size > 1000000) {
      return res
        .status(200)
        .send({ message: "Photo is Required and should be less than 1mb" });
    }

    if (!description) {
      return res.status(200).send({ message: "Description is Required" });
    }


    const data = { ...req.fields, slug: slugify(flavour) };

    const item = new customisedItemModel(data);
    if (addPhoto) {
      item.addPhoto.data = fs.readFileSync(addPhoto.path);
      item.addPhoto.contentType = addPhoto.type;
    }
    if (design) {
      item.design.data = fs.readFileSync(design.path);
      item.design.contentType = design.type;
    }
    await item.save();
 
    if (item) {
      res.status(201).send({
        success: true,
        message: "Custom Item Created Successfully",
        item,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Custom item not created....!",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: ["Error in creating Custom Item"]
    });
  }
}


// Custom item creation and Razorpay integration



export const getCustomItemController = async (req, res) => {
  try {
    const item = await customisedItemModel.find({}).select("-addPhoto -design").sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: item.length,
      message: "All Items",
      item,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting Items",
      error: error.message,
    });
  }
};

export const getCustomSingleItemController = async (req, res) => {
  try {
    const item = await customisedItemModel
      .findOne({ slug: req.params.slug })
      .select("-addPhoto -design ");

    res.status(200).send({
      success: true,
      message: "Single Item Fetched",
      item,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single Item",
      error,
    });
  }
};


export const getSingleCustomItemControllerId = async (req, res) => {
  try {
    const id = await req.params.id.trim();
    if (!isValidObjectId(id)) {
      return res.send("item id is not valid");
    }
    const item = await customisedItemModel.findById(id).select("-addPhoto -design");
   /*  console.log("Item:", item) */

    if (!item) {
      return res.send({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single Item Fetched",
      item,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting single Item",
      error: error.message, // Send the error message for better client understanding.
   
    });
  }
};

export const itemCustomisedPhotoController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.send("id is not valid");
    }
    const item = await customisedItemModel.findById(id);

    if (item.addPhoto && item.addPhoto.data && item.design && item.design.data) {
      const addPhotoBase64 = item.addPhoto.data.toString('base64');
      const designBase64 = item.design.data.toString('base64');

      res.status(200).send({
        addPhoto: {
          contentType: item.addPhoto.contentType,
          data: addPhotoBase64,
        },
        design: {
          contentType: item.design.contentType,
          data: designBase64,
        },
      });
    } else if (item.addPhoto && item.addPhoto.data) {
      const addPhotoBase64 = item.addPhoto.data.toString('base64');
      res.set("Content-type", item.addPhoto.contentType);
      return res.status(200).send(addPhotoBase64);
    } else if (item.design && item.design.data) {
      const designBase64 = item.design.data.toString('base64');
      res.set("Content-type", item.design.contentType);
      return res.status(200).send(designBase64);
    } else {
      return res.status(404).send("No photo or design found for the given item.");
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

export const deleteCustomItemController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.send("id is not valid");
    }
    const data = await customisedItemModel.findByIdAndDelete(id);

    if (data) {
      res.status(200).send({
        message: "Item Deleted Successfully!",
        success: true,
      });
    } else {
      res.status(404).send({
        message: "Item  not Deleted!",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting the item",
      error,
    });
  }
};

/* //get single item by id
export const getSingleCustomItemControllerById = async (req, res) => {
  try {
    const id = await req.params.id.trim();
    if (!isValidObjectId(id)) {
      return res.send("item id is not valid");
    }
    const item = await customisedItemModel.findById(id).select("-photo");

    if (!item) {
      return res.send({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single Item Fetched",
      item,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting single Item",
      error: error.message, // Send the error message for better client understanding.
    });
  }
}; */