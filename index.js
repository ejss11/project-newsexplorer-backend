const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
const { errors } = require("celebrate"); // Si usas celebrate para la validación
const logRequests = require("./middleware/requestLogger");
const logErrors = require("./middleware/errorLogger");
const errorHandler = require("./middleware/errorHandler"); // Middleware de manejo de errores

const { PORT = 3001, DB_URL } = process.env;

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

// Conexión a la base de datos
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectarse a MongoDB", err);
  });

// Logger de solicitudes
app.use(logRequests);

// Rutas de autenticación (sin protección)
app.use(authRoutes);

// Rutas protegidas por JWT
app.use(routes);

// Logger de errores
app.use(logErrors);

// Manejo de errores
app.use(errors()); // Maneja los errores de celebrate
app.use(errorHandler); // Tu middleware para manejar errores personalizados

//const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en ${PORT}`);
});
