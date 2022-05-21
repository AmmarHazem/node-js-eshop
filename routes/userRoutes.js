const express = require("express");
const {
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userControllers");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const mustBeAdminMiddleware = require("../middleware/mustBeAdminMiddleware");

const router = express.Router();

router.get("/", [authenticationMiddleware, mustBeAdminMiddleware], getAllUsers);
router.delete(
  "/:id",
  [authenticationMiddleware, mustBeAdminMiddleware],
  deleteUser
);
router.put("/:id", [authenticationMiddleware], updateUser);

module.exports = router;
