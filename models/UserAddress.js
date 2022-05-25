const mongoose = require("mongoose");

const UserAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    line1: {
      type: String,
      required: true,
    },
    line2: {
      type: String,
    },
  },
  { timestamps: true }
);

UserAddressSchema.index({ user: 1 });

module.exports = mongoose.model("UserAddress", UserAddressSchema);
