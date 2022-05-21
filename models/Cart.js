const mongoose = require("mongoose");
const CartProductSchema = require("./CartProductSchema");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [CartProductSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
