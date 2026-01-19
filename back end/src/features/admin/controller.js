const { validationResult } = require("express-validator");
const adminService = require("./service");

const listPendingAds = (req, res, next) => {
  try {
    const data = adminService.listPendingAds();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const approveAd = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const data = adminService.approveAd({ adId: req.params.adId, ...req.body });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const rejectAd = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const data = adminService.rejectAd({ adId: req.params.adId, ...req.body });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const moderationHistory = (req, res, next) => {
  try {
    const data = adminService.getModerationHistory();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const listBanners = (req, res, next) => {
  try {
    const data = adminService.listBanners();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const createBanner = (req, res, next) => {
  try {
    const data = adminService.createBanner(req.body, req.files || []);
    return res.status(201).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const updateBanner = (req, res, next) => {
  try {
    const data = adminService.updateBanner(req.params.bannerId, req.body);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const listUsers = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const data = adminService.listUsers(req.query);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const updateUser = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const data = adminService.updateUser(req.params.userId, req.body);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const createCouponsBulk = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const data = adminService.createCouponsBulk(req.body);
    return res.status(201).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const listCoupons = (req, res, next) => {
  try {
    const data = adminService.listCoupons();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const listAuditLogs = (req, res, next) => {
  try {
    const data = adminService.listAuditLogs();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const updateAdContent = (req, res, next) => {
  try {
    const data = adminService.updateAdContent(req.params.adId, req.body);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listPendingAds,
  approveAd,
  rejectAd,
  moderationHistory,
  listBanners,
  createBanner,
  updateBanner,
  listUsers,
  updateUser,
  createCouponsBulk,
  listCoupons,
  listAuditLogs,
  updateAdContent
};
