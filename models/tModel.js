import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    flavour: {
      type: String,
      enum: ["Pineapple", "Vanilla", "Butterscotch", "Chocolate", "Blackforest" , "Whiteforest", "Rasmalai", "Blackcurrent", "Blueberry", "Strawberry", "Paan", "Redvelvet", "Chocotruffle"],
      required: true
    }, 
    theme:{
      type: String,
      required: true
    },
    shape:{
      type: String,
      enum: ["Rectangle", "Heart", "Square", "Triangle","Polygon" , "Pentagon", "Circular"],
      required: true
    },
    description:{
        type: String
    },
    cakeId:{
      type: String
    },
    color:{
      type: String
    },
    weight:{
      type: String,
    },
    slug: {
      type: String,
      required: true,
    },
    tier:{
      type: String,
      enum: ["1","2", "3", "4", "5"]
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Egg", "Eggless"],
      required: true, 
    },
    cakeType: {
      type: String,
      enum:["StandardCake","Pastry", "Cupcake", "Jarcake", "Drycakes"],
      required: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", ItemSchema);
