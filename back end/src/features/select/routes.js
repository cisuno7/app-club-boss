const express = require("express");
const controller = require("./controller");
const { auth } = require("../../middlewares/auth");
const { accessValidator } = require("./validator");

const router = express.Router();

router.post("/access", accessValidator, controller.access); // Não requer auth (valida código de acesso)

router.use(auth(["select"])); // Rotas abaixo requerem autenticação Select

router.get("/content", controller.content);
router.get("/coupons", controller.coupons);
router.get("/events", controller.events);
router.get("/benefits", controller.benefits);

module.exports = router;
