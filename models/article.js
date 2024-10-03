const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

// Esquema del artículo
const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, "La palabra clave es obligatoria"],
  },
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
  },
  text: {
    type: String,
    required: [true, "El texto es obligatorio"],
  },
  date: {
    type: String,
    required: [true, "La fecha es obligatoria"],
  },
  source: {
    type: String,
    required: [true, "La fuente es obligatoria"],
  },
  link: {
    type: String,
    required: [true, "El enlace es obligatorio"],
    validate: {
      validator: (link) => validator.isURL(link),
      message: "Por favor ingrese una URL válida",
    },
  },
  image: {
    type: String,
    required: [true, "El enlace de la imagen es obligatorio"],
    validate: {
      validator: (image) => validator.isURL(image),
      message: "Por favor ingrese una URL válida para la imagen",
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    select: false, // Evita que el propietario sea devuelto por defecto
  },
});

// Modelo de artículo
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
