const express = require("express");
const controller = require("./controller");
const { accessValidator } = require("./validator");

const router = express.Router();

router.post("/access", accessValidator, controller.access);
router.get("/content", controller.content);
router.get("/coupons", controller.coupons);
router.get("/events", controller.events);
router.get("/benefits", controller.benefits);

module.exports = router;
