const mongoose = require("mongoose");
const validator = require("validator");

// Esquema del usuario
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: "Por favor ingrese un correo electrónico válido",
    },
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    select: false, // Evita que este campo sea devuelto por defecto
  },
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    maxlength: [30, "El nombre no puede exceder los 30 caracteres"],
  },
});

// Modelo de usuario
const User = mongoose.model("User", userSchema);

module.exports = User;
