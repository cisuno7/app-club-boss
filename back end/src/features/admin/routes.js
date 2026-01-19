const express = require("express");
const multer = require("multer");
const controller = require("./controller");
const {
  moderationActionValidator,
  bannerValidator,
  userUpdateValidator,
  userListValidator,
  couponBulkValidator
} = require("./validator");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 1, fileSize: 10 * 1024 * 1024 }
});

const router = express.Router();

router.get("/moderation/pending", controller.listPendingAds);
router.post("/moderation/:adId/approve", moderationActionValidator, controller.approveAd);
router.post("/moderation/:adId/reject", moderationActionValidator, controller.rejectAd);
router.get("/moderation/history", controller.moderationHistory);

router.get("/banners", controller.listBanners);
router.post("/banners", bannerValidator, upload.array("banner", 1), controller.createBanner);
router.patch("/banners/:bannerId", bannerValidator, controller.updateBanner);

router.get("/users", userListValidator, controller.listUsers);
router.patch("/users/:userId", userUpdateValidator, controller.updateUser);

router.post("/coupons/bulk", couponBulkValidator, controller.createCouponsBulk);
router.get("/coupons", controller.listCoupons);

router.get("/audit", controller.listAuditLogs);

router.patch("/ads/:adId", controller.updateAdContent);

module.exports = router;
