const express = require("express");
const router = express.Router();
const Authentication = require("../controllers/Authentication");

router.route("/signup").post(Authentication.Signup);
router.route("/login").post(Authentication.Login)

module.exports = router;