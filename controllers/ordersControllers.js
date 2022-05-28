const moment = require("moment");
const OrderModel = require("../models/Order");
const CartModel = require("../models/Cart");
const { StatusCodes } = require("http-status-codes");

const getMonthlyIncome = async (request, response) => {
  const startOfCurrentMonth = moment().startOf("month");
  const lastMonth = startOfCurrentMonth.clone().subtract(1, "month");
  const twoMonthAgo = lastMonth.clone().subtract(1, "month");
  const income = await OrderModel.aggregate([
    { $match: { createdAt: { $gt: twoMonthAgo.toDate() } } },
    { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
    { $group: { _id: "$month", total: { $sum: "$sales" } } },
  ]);
  response.json({ income });
};

const updateOrder = async (request, response) => {
  const { orderID } = request.params;
  const { products, amount, address, status } = request.body;
  const updatedOrder = await OrderModel.findByIdAndUpdate(
    orderID,
    {
      products,
      amount,
      address,
      status,
    },
    { new: true, runValidators: true }
  );
  response.json({ oreder: updatedOrder });
};

const getMyOrders = async (request, response) => {
  const orders = await OrderModel.find({ user: request.user._id }).sort({
    createdAt: -1,
  });
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
  // console.log("--- cart products", cart.products.length);
  cart.products = [];
  // for (let i = 0; i < cart.products.length; i += 1) {
  //   const prod = cart.products[i];
  //   prod.remove();
  // }
  // for (const prod of cart.products) {
  //   cart.products.id(prod._id).remove();
  //   prod.remove();
  // }
  //   await Promise.all(deletePromises);
  await cart.save();
  response.status(StatusCodes.CREATED).json({
    order,
  });
};

module.exports = { createOrder, getMyOrders, updateOrder, getMonthlyIncome };
