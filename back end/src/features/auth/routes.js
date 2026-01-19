const express = require("express");
const { loginValidator, refreshValidator } = require("./validator");
const controller = require("./controller");

const router = express.Router();

router.post("/login", loginValidator, controller.login);
router.post("/refresh", refreshValidator, controller.refresh);

module.exports = router;
