const mongoose = require("mongoose");

const CartProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// CartProductSchema.virtual("product", {
//   ref: "Product",
//   foreignField: "_id",
//   localField: "product",
//   justOne: true,
// });

// const CartProductModel = mongoose.model("CartProduct", CartProductSchema);

module.exports = CartProductSchema; // { CartProductModel, CartProductSchema };
