const { validationResult } = require("express-validator");
const authService = require("./service");

const login = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email, password } = req.body;
    const result = authService.login(email, password);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return next(error);
  }
};

const refresh = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { refreshToken } = req.body;
    const result = authService.refresh(refreshToken);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return next(error);
  }
};

module.exports = { login, refresh };
