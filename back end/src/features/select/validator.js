const { body } = require("express-validator");

const accessValidator = [
  body("code").isString().notEmpty()
];

module.exports = { accessValidator };
