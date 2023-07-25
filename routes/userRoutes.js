const express = require("express");
const router = express.Router();
const User = require("../controllers/User");
const protect = require("../middleware/authMiddleware")


router.route("/all").get(protect,User.GetAllUsers);
router.route("/byId/:id").get(protect, User.GetUserById);
router.route("/update/:id").put(protect, User.UpdateUserById);
router.route("/delete/:id").delete(protect, User.DeleteUserById);

module.exports = router;