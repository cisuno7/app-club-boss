const { body, query, param } = require("express-validator");

const moderationActionValidator = [
  param("adId").isString().notEmpty(),
  body("adminId").isString().notEmpty(),
  body("reason").isString().isLength({ min: 3 })
];

const bannerValidator = [
  body("targetRoles").optional().isArray(),
  body("order").optional().isInt({ min: 1 }),
  body("scheduleAt").optional().isISO8601()
];

const userUpdateValidator = [
  param("userId").isString().notEmpty(),
  body("role").optional().isIn(["client", "company", "admin", "select"]),
  body("blocked").optional().isBoolean()
];

const userListValidator = [
  query("role").optional().isIn(["client", "company", "admin", "select"]),
  query("search").optional().isString()
];

const couponBulkValidator = [
  body("count").isInt({ min: 1, max: 100 }),
  body("expiresAt").isISO8601(),
  body("adId").isString().notEmpty()
];

module.exports = {
  moderationActionValidator,
  bannerValidator,
  userUpdateValidator,
  userListValidator,
  couponBulkValidator
};
