const { validationResult } = require("express-validator");
const companyService = require("./service");

const createAd = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const data = companyService.createAd(req.body);
    return res.status(201).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const listAds = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { companyId, status } = req.query;
    const data = companyService.listAds(companyId, status);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const updateAd = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { adId } = req.params;
    const data = companyService.updateAd(adId, req.body);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const uploadBanners = (req, res, next) => {
  try {
    const { adId } = req.params;
    const data = companyService.uploadBanners(adId, req.files || []);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const getMetrics = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { companyId } = req.query;
    const data = companyService.getMetrics(companyId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const exportReport = (req, res, next) => {
  try {
    const { companyId, type } = req.query;
    const data = companyService.exportReport(companyId, type);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createAd,
  listAds,
  updateAd,
  uploadBanners,
  getMetrics,
  exportReport
};
