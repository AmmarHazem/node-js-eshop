const mongoose = require("mongoose");
const CartProductSchema = require("./CartProduct");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: [CartProductSchema],
  },
  { timestamps: true }
);

CartSchema.statics.findOneOrCreate = async function (query) {
  const existingCart = await this.model("Cart")
    .findOne(query)
    .populate({
      path: "products",
      populate: {
        path: "product",
      },
    });
  if (existingCart) return existingCart;
  const createdCart = await this.model("Cart").create(query);
  // await createdCart.populate({ path: "user" });
  return createdCart;
};

module.exports = mongoose.model("Cart", CartSchema);
