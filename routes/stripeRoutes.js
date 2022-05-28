const express = require("express");
const {
  createStripePaymentIntent,
} = require("../controllers/stripeControllers");

const router = express.Router();

router.post("/create-payment-intent", createStripePaymentIntent);

module.exports = router;
