const express = require("express");
const {
  createOrder,
  getMyOrders,
} = require("../controllers/ordersControllers");

const router = express.Router();

router.get("/", getMyOrders);
router.post("/", createOrder);

module.exports = router;
