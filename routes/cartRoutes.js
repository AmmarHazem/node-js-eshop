const express = require("express");
const { addProductToCart, getCart } = require("../controllers/cartControllers");

const router = express.Router();

router.get("/", getCart);
router.post("/addProductToCart", addProductToCart);

module.exports = router;
