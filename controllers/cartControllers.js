const CartModel = require("../models/Cart");

const getCart = async (request, response) => {
  const cart = await CartModel.findOneOrCreate({
    user: request.user._id,
  });
  response.json({ cart });
};

const addProductToCart = async (request, response) => {
  const { productID } = request.body;
  if (!productID) {
    throw new Error("invalid product ID");
  }
  //   const cart = await CartModel.findOneAndUpdate(
  //     { user: request.user._id },
  //     { $push: { products: { product: productID } } },
  //     { new: true, upsert: true }
  //   );
  const cart = await CartModel.findOneOrCreate({ user: request.user._id });
  const alreadyAddedProduct = cart.products.find(
    (cartProd) => cartProd.product._id.toString() == productID
  );
  if (alreadyAddedProduct) {
    alreadyAddedProduct.quantity += 1;
  } else {
    cart.products.push({ product: productID });
  }
  await cart.save();
  response.send({ cart });
};

module.exports = { addProductToCart, getCart };
