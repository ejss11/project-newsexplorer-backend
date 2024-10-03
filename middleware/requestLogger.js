const { requestLogger } = require("./logger");

// Middleware para registrar las solicitudes
const logRequests = (req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
  next();
};

module.exports = logRequests;
