const { logger } = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message || "Erro interno");
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Erro interno",
    code: err.code || "INTERNAL_ERROR"
  });
};

module.exports = { errorHandler };
