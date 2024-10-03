const jwt = require("jsonwebtoken");

// Middleware para proteger las rutas
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Autorización requerida" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, "tu_secreto"); // Reemplaza 'tu_secreto' con tu clave secreta
  } catch (err) {
    return res.status(401).send({ message: "Token no válido" });
  }

  req.user = payload; // El JWT contiene el _id del usuario
  next();
};
