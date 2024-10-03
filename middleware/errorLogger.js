const { errorLogger } = require("./logger");

// Middleware para registrar errores
const logErrors = (err, req, res, next) => {
  errorLogger.error({
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode || 500,
    method: req.method,
    url: req.url,
  });
  next(err);
};

module.exports = logErrors;
