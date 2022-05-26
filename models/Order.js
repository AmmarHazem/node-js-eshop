const mongoose = require("mongoose");
const CartProductSchema = require("./CartProduct");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  products: [CartProductSchema],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: mongoose.Types.ObjectId,
    ref: "UserAddress",
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

OrderSchema.index({ user: 1 });

module.exports = mongoose.model("Order", OrderSchema);
