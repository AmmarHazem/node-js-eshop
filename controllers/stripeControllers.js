const Stripe = require("stripe");
const OrderModel = require("../models/Order");

const stripe = Stripe(process.env.STRIPE_KEY);

const createStripePaymentIntent = async (request, response) => {
  const { orderID } = request.body;
  if (!orderID) {
    throw new Error("order ID is required");
  }
  const order = await OrderModel.findOne({
    _id: orderID,
    user: request.user._id,
  });
  if (!order) {
    throw new Error("invalid order ID");
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.amount * 100,
    currency: "usd",
    // customer: request.user._id,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  response.json({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = { createStripePaymentIntent };
