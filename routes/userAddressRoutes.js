const express = require("express");
const {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} = require("../controllers/userAddressControllers");

const router = express.Router();

router.get("/", getAddresses);
router.post("/", createAddress);
router.put("/:addressID", updateAddress);
router.delete("/:addressID", deleteAddress);

module.exports = router;
