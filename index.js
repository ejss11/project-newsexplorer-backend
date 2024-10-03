const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
const { errors } = require("celebrate"); // Si usas celebrate para la validación
const logRequests = require("./middlewares/requestLogger");
const logErrors = require("./middlewares/errorLogger");
const errorHandler = require("./middleware/errorHandler"); // Middleware de manejo de errores

const { PORT = 3001, DB_URL } = process.env;

const app = express();
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
