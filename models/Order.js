const mongoose = require("mongoose");
const CartProductSchema = require("./CartProductSchema");

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
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Order", OrderSchema);