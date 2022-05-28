const express = require("express");
const {
  createOrder,
  getMyOrders,
  updateOrder,
  getMonthlyIncome,
} = require("../controllers/ordersControllers");
const mustBeAdminMiddleware = require("../middleware/mustBeAdminMiddleware");

const router = express.Router();

router.get("/monthly-income", [mustBeAdminMiddleware], getMonthlyIncome);
router.put("/:orderID", [mustBeAdminMiddleware], updateOrder);
router.get("/", getMyOrders);
router.post("/", createOrder);

module.exports = router;
