const { body, query, param } = require("express-validator");

const feedValidator = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 50 }),
  query("category").optional().isString(),
  query("search").optional().isString()
];

const redeemValidator = [
  param("adId").isString().notEmpty(),
  body("userId").isString().notEmpty()
];

const contactValidator = [
  body("userId").isString().notEmpty(),
  body("channel").isIn(["whatsapp", "email", "chat"]).withMessage("Canal inválido"),
  body("message").isString().isLength({ min: 5 }),
  body("adId").optional().isString()
];

const availableCouponsValidator = [
  query("userId").optional().isString()
];

const historyValidator = [
  query("userId").isString().notEmpty()
];

module.exports = {
  feedValidator,
  redeemValidator,
  contactValidator,
  availableCouponsValidator,
  historyValidator
};
