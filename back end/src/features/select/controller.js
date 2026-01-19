const { validationResult } = require("express-validator");
const selectService = require("./service");

const access = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const data = selectService.validateAccess(req.body.code);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const content = (req, res, next) => {
  try {
    const data = selectService.getExclusiveContent();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const coupons = (req, res, next) => {
  try {
    const data = selectService.getExclusiveCoupons();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const events = (req, res, next) => {
  try {
    const data = selectService.getEvents();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const benefits = (req, res, next) => {
  try {
    const data = selectService.getBenefits();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

module.exports = { access, content, coupons, events, benefits };
