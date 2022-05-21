const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} = require("../controllers/productsControllers");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const mustBeAdminMiddleware = require("../middleware/mustBeAdminMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.delete(
  "/:productID",
  [authenticationMiddleware, mustBeAdminMiddleware],
  deleteProduct
);
router.put(
  "/:productID",
  [authenticationMiddleware, mustBeAdminMiddleware],
  updateProduct
);
router.post(
  "/",
  [authenticationMiddleware, mustBeAdminMiddleware],
  createProduct
);

module.exports = router;
