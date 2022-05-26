const OrderModel = require("../models/Order");
const CartModel = require("../models/Cart");
const { StatusCodes } = require("http-status-codes");

const getMyOrders = async (request, response) => {
  const orders = await OrderModel.find({ user: request.user._id });
  response.json({ count: orders.length, orders });
};

const createOrder = async (request, response) => {
  const { address } = request.body;
  if (!address) {
    throw new Error("address is required");
  }
  const cart = await CartModel.findOne({ user: request.user._id });
  if (cart.products.length === 0) {
    throw new Error("cart is empty");
  }
  const order = await OrderModel.create({
    address,
    user: request.user._id,
    products: cart.products,
    amount: cart.total,
  });
  //   const deletePromises = [];
  for (const prod of cart.products) {
    // deletePromises.push();
    prod.remove();
  }
  //   await Promise.all(deletePromises);
  await cart.save();
  response.status(StatusCodes.CREATED).json({
    order,
  });
};

module.exports = { createOrder, getMyOrders };
