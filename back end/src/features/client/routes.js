const express = require("express");
const controller = require("./controller");
const {
  feedValidator,
  redeemValidator,
  contactValidator,
  availableCouponsValidator,
  historyValidator
} = require("./validator");

const router = express.Router();

router.get("/feed", feedValidator, controller.getFeed);
router.get("/coupons/available", availableCouponsValidator, controller.getAvailableCoupons);
router.post("/coupons/:adId/redeem", redeemValidator, controller.redeemCoupon);
router.get("/coupons/history", historyValidator, controller.getCouponHistory);
router.post("/contact", contactValidator, controller.contactBoss);

module.exports = router;
