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
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CartSchema.pre("save", async function () {
  if (this.isModified("products")) {
    const cart = await this.populate({
      path: "products",
      populate: { path: "product" },
    });
    let total = 0;
    cart.products.forEach((cartProduct) => {
      total += cartProduct.product.price * cartProduct.quantity;
    });
    this.total = total;
  }
});

// CartSchema.virtual("total").get(async function () {
//   let total = 0;
//   const cart = await this.populate({
//     path: "products",
//     // populate: { path: "product" },
//   });
//   cart.products.forEach((cartProduct) => {
//     console.log(
//       "--- cartProduct",
//       cartProduct.quantity,
//       cartProduct.product.price
//     );
//     total += cartProduct.product.price * cartProduct.quantity;
//   });
//   console.log("--- total", total);
//   return total;
// });

CartSchema.virtual("productsCount").get(function () {
  return this.products.length;
});

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
  const createdCart = await this.model("Cart").create({ ...query, total: 0 });
  // await createdCart.populate({ path: "user" });
  return createdCart;
};

module.exports = mongoose.model("Cart", CartSchema);
