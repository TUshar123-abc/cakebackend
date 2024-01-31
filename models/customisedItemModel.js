import mongoose from "mongoose";
import { format } from "date-fns";


const ItemSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      
    },
    flavour: {
      type: String,
      enum: ["Pineapple", "Vanilla", "Butterscotch", "Chocolate", "Blackforest" , "Whiteforest", "Rasmalai", "Blackcurrent", "Blueberry", "Strawberry", "paan", "Redvelvet", "Chocotruffle"],
      
    },
    shape:{
        type: String,
        enum: ["Rectangle", "Heart", "Square", "Triangle", "Pentagon", "Circular"],
      },
    theme:{
      type: String,
    },
    description:{
        type: String
    },
    color:{
      type: String
    },
    addPhoto: {
        data: Buffer,
        contentType: String,
      },
    slug: {
      type: String,
    },
    tier:{
      type: String,
      enum: ["1","2", "3", "4", "5"]
    },
    price:{
      type:Number
    },
    design: {
        data: Buffer,
        contentType: String,
    },
    occasionType: {
      type: String,
    },
    writeName:{
        type: String
    },

    //payment
    deliveryDate:{
      type: String,
    },
    deliveryTime:{
      type: String,
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    paymentMode: {
      type: Boolean,
      default: true,
    },
    invoiceNo:{
      type:Number, 
    },
    razorpay: {
      orderId: {
        type: String,
        default: "",
      },
      paymentId: {
        type: String,
        default: "",
      },
      
      signature: {
        type: String,
        default: "",
      },
     
    },
   
  },
  { timestamps: true }
);

ItemSchema.pre("save", function (next) {
  if (!this.deliveryDate) {
    const today = new Date();
    this.deliveryDate = format(today, "dd/MM/yy");
  }
  next();
});


export default mongoose.model("customItem", ItemSchema);
