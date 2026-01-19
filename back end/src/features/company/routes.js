const express = require("express");
const multer = require("multer");
const controller = require("./controller");
const { auth } = require("../../middlewares/auth");
const {
  createAdValidator,
  updateAdValidator,
  listAdsValidator,
  metricsValidator
} = require("./validator");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 5, fileSize: 5 * 1024 * 1024 }
});

const router = express.Router();

router.use(auth(["company"])); // Apenas empresas podem acessar

router.post("/ads", createAdValidator, controller.createAd);
router.get("/ads", listAdsValidator, controller.listAds);
router.patch("/ads/:adId", updateAdValidator, controller.updateAd);
router.post("/ads/:adId/banners", upload.array("banners", 5), controller.uploadBanners);

router.get("/metrics", metricsValidator, controller.getMetrics);
router.get("/reports/export", controller.exportReport);

module.exports = router;
