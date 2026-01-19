const { validationResult } = require("express-validator");
const clientService = require("./service");

const getFeed = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { userId, interests, category, search, page, limit } = req.query;
    const interestList = interests ? interests.split(",").map((i) => i.trim()) : [];
    const data = clientService.getFeed({
      userId,
      interests: interestList,
      category,
      search,
      page,
      limit
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const getAvailableCoupons = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { userId } = req.query;
    const data = clientService.getAvailableCoupons(userId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const redeemCoupon = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { adId } = req.params;
    const { userId } = req.body;
    const data = clientService.redeemCoupon(userId, adId);
    return res.status(201).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const getCouponHistory = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { userId } = req.query;
    const data = clientService.getCouponHistory(userId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const contactBoss = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const data = clientService.createContact(req.body);
    return res.status(201).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getFeed,
  getAvailableCoupons,
  redeemCoupon,
  getCouponHistory,
  contactBoss
};
