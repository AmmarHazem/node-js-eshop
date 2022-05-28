const CartModel = require("../models/Cart");

const removeProductFromCart = async (request, response) => {
  const { cartProductID } = request.body;
  if (!cartProductID) {
    throw new Error("cart product ID is required");
  }
  const cart = await CartModel.findOneOrCreate({ user: request.user._id });
  const cartProduct = cart.products.id(cartProductID);
  if (!cartProduct) {
    throw new Error("invalid product ID");
  }
  cartProduct.remove();
  await cart.save();
  response.json({ cart });
};

const setCartProductQuantity = async (request, response) => {
  const { cartProductID, quantity } = request.body;
  if (!cartProductID) {
    throw new Error("invalid product ID");
  }
  if (quantity === undefined || quantity === null) {
    throw new Error("quantity number is required");
  }
  const cart = await CartModel.findOne({ user: request.user._id }).populate({
    path: "products",
    populate: {
      path: "product",
    },
  });
  if (!cart) {
    throw new Error("invalid user ID");
  }
  for (const prod of cart.products) {
    if (prod._id.toString() === cartProductID) {
      if (quantity <= 0) {
        await prod.remove();
      } else {
        prod.quantity = quantity;
      }
    }
  }
  await cart.save();
  response.json({ cart });
};

const getCart = async (request, response) => {
  const cart = await CartModel.findOneOrCreate({
    user: request.user._id,
  });
  response.json({ cart });
};

const addProductToCart = async (request, response) => {
  const { productID, quantity } = request.body;
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
    if (quantity) {
      alreadyAddedProduct.quantity = quantity;
    } else {
      alreadyAddedProduct.quantity += 1;
    }
  } else {
    cart.products.push({ product: productID, quantity: quantity || 1 });
  }
  await cart.save();
  response.send({ cart });
};

module.exports = {
  addProductToCart,
  getCart,
  setCartProductQuantity,
  removeProductFromCart,
};
