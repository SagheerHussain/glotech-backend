const express = require("express");
const router = express.Router();

const { registerAccount, loginAccount } = require("../controllers/user.Controller");

router.post("/register", registerAccount);
router.post("/login", loginAccount);

module.exports = router;
