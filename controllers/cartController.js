import cartModel from "../models/cartModel.js";
export const PostCartController = async (req, res) => {
  try {
    const { user, cartItems } = req.body;

    if (!cartItems) {
      return res.status(400).send({
        success: false,
        message: "cartItems are not created...! ",
      });
    }

    let existingCart = await cartModel.findOne({ user });

    if (existingCart) {
      existingCart.cartItems = cartItems;
      await existingCart.save();

      // existingCart.cartItems = existingCart.cartItems.concat(cartItems);
      // await existingCart.save();

      res.status(200).send({
        success: true,
        message: "cart updated",
        cart: existingCart,
      });
    } else {
      const newCart = await new cartModel({ user, cartItems }).save();

      res.status(201).send({
        success: true,
        message: "new cart created",
        cart: newCart,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Cart not created...!",
    });
  }
};

//this is controller for getting the cart
export const getCartController = async (req, res) => {
  try {
    const id = req.params.id;

    const getItems = await cartModel.findOne({ user: id });
    res.status(200).send({
      success: true,
      message: "SuccessFully GetItems",
      getItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting cartItems",
      error,
    });
  }
};
// this is the deletecontroller

export const deleteCartController = async (req, res) => {
  try {
    const id = req.params.id;

    await cartModel.findOneAndDelete({ user: id });
    res.status(200).send({
      success: true,
      message: "SuccessFully Deleted cart",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting cart",
      error,
    });
  }
};
