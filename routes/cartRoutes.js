const express = require("express");
const {
  addProductToCart,
  getCart,
  setCartProductQuantity,
} = require("../controllers/cartControllers");

const router = express.Router();

router.put("/set-cart-product-quantity", setCartProductQuantity);
router.get("/", getCart);
router.post("/addProductToCart", addProductToCart);

module.exports = router;
