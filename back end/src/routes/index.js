const express = require("express");
const authRoutes = require("../features/auth/routes");
const clientRoutes = require("../features/client/routes");
const companyRoutes = require("../features/company/routes");
const adminRoutes = require("../features/admin/routes");
const selectRoutes = require("../features/select/routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/client", clientRoutes);
router.use("/company", companyRoutes);
router.use("/admin", adminRoutes);
router.use("/select", selectRoutes);

module.exports = router;
