const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json } = format;
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

// Configura un logger para las solicitudes
const requestLogger = createLogger({
  format: combine(
    timestamp(),
    json() // El formato de salida es JSON
  ),
  transports: [
    new DailyRotateFile({
      filename: path.join(__dirname, "logs/request.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m", // Tamaño máximo del archivo antes de rotarlo
      maxFiles: "14d", // Mantén los archivos durante 14 días
    }),
  ],
});

// Configura un logger para los errores
const errorLogger = createLogger({
  format: combine(timestamp(), json()),
  transports: [
    new DailyRotateFile({
      filename: path.join(__dirname, "logs/error.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

module.exports = { requestLogger, errorLogger };
