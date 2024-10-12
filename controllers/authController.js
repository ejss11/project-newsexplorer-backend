const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { ConflictError, BadRequestError } = require("../middleware/error"); // Errores personalizados

// Crea un nuevo usuario (registro)
module.exports.signup = (req, res, next) => {
  const { email, password, name } = req.body;

  // Verifica si el usuario ya existe
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(
          "El usuario ya está registrado con este correo"
        );
        return res.status(409).json({ error: ConflictError });
      }

      // Encripta la contraseña
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      // Crea el nuevo usuario con la contraseña encriptada
      return User.create({ email, password: hashedPassword, name });
    })
    .then((user) => {
      // Retorna solo el email y nombre (no incluimos la contraseña)
      res.status(201).send({ email: user.email, name: user.name });
    })
    .catch(next);
};

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  // Busca al usuario por correo electrónico
  User.findOne({ email })
    .select("+password") // Asegura que la contraseña sea devuelta
    .then((user) => {
      if (!user) {
        throw new BadRequestError(
          "Correo electrónico o contraseña incorrectos"
        );
      }

      // Compara la contraseña ingresada con la almacenada en la base de datos
      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          throw new BadRequestError(
            "Correo electrónico o contraseña incorrectos"
          );
        }

        // Genera el token JWT
        const token = jwt.sign({ _id: user._id }, "jwt", { expiresIn: "7d" });

        // Retorna el token en el encabezado y el cuerpo de la respuesta
        res.send({ token });
      });
    })
    .catch(next);
};
