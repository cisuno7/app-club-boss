const { body, query, param } = require("express-validator");

const createAdValidator = [
  body("companyId").isString().notEmpty(),
  body("title").isString().isLength({ min: 3, max: 100 }),
  body("description").isString().isLength({ min: 10, max: 500 }),
  body("category").isString().notEmpty(),
  body("tags").isArray().optional(),
  body("budgetDaily").isFloat({ min: 50 })
];

const updateAdValidator = [
  param("adId").isString().notEmpty(),
  body("title").optional().isString().isLength({ max: 100 }),
  body("description").optional().isString().isLength({ max: 500 }),
  body("status").optional().isIn(["active", "pending", "expired"])
];

const listAdsValidator = [
  query("companyId").isString().notEmpty(),
  query("status").optional().isIn(["active", "pending", "expired"])
];

const metricsValidator = [
  query("companyId").isString().notEmpty(),
  query("range").optional().isIn(["7d", "30d", "90d"])
];

module.exports = {
  createAdValidator,
  updateAdValidator,
  listAdsValidator,
  metricsValidator
};
