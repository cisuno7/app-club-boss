const { body } = require("express-validator");

const loginValidator = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password").isString().isLength({ min: 4 }).withMessage("Senha inválida")
];

const refreshValidator = [
  body("refreshToken").isString().notEmpty().withMessage("Refresh token obrigatório")
];

module.exports = { loginValidator, refreshValidator };
