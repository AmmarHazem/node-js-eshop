const express = require("express");
const { addProductToCart } = require("../controllers/cartControllers");

const router = express.Router();

router.post("/addProductToCart", addProductToCart);

module.exports = router;
