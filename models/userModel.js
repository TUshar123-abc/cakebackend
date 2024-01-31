import mongoose from "mongoose";
import { format } from "date-fns";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    resetPasswordOTP: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    pincode: {
      type: Number,
    },

    // for develivery
    uniqueId: {
      type: String,
    },
    dln: {
      type: String,
    },
    acn: {
      type: Number,
    },
 /*    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    }, */
    //end del status,

    //start of tiffin

  cakeOwnerName: {
      type: String,
    },
    cakeName: {
      type: String,
    },
    cakeId: {
      type: Number,
    },
    pincode1: {
      type: Number,
    },
    pincode2: {
      type: Number,
    },
    pincode3: {
      type: Number,
    },
    pincode4: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
    },
    subscriptionPlan: {
      type: String,
      enum: ["Monthly", "Quarterly", "Half Yearly", "Yearly"],
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },

    // end of tiffin
  },
  { timestamps: true }
);

// for tiffin c
userSchema.pre("save", function (next) {
  if (!this.startDate) {
    const today = new Date();
    this.startDate = format(today, "dd/MM/yy");
  }
  if (!this.endDate) {
    const today = new Date();
    this.endDate = format(today, "dd/MM/yy");
  }
  next();
});

//end

export default mongoose.model("users", userSchema);
