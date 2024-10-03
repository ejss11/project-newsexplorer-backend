const User = require("../models/user");

// Devuelve información del usuario conectado
module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id; // El _id se extrae del JWT decodificado

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.send({ email: user.email, name: user.name });
    })
    .catch(next); // Manejo de errores
};
