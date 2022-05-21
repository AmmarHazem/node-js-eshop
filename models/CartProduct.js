const mongoose = require("mongoose");

const CartProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

// const CartProductModel = mongoose.model("CartProduct", CartProductSchema);

module.exports = CartProductSchema; // { CartProductModel, CartProductSchema };
