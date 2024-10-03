const express = require("express");
const { getUserInfo } = require("../controllers/usersController");
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articleController");
const auth = require("../middleware/auth"); // Middleware de autorización

const router = express.Router();

// Protege las rutas con el middleware de autenticación
router.use(auth);

// Ruta para obtener información del usuario conectado
router.get("/users/me", getUserInfo);

// Ruta para obtener todos los artículos guardados por el usuario
router.get("/articles", getArticles);

// Ruta para crear un nuevo artículo
router.post("/articles", createArticle);

// Ruta para eliminar un artículo por su _id
router.delete("/articles/:articleId", deleteArticle);

module.exports = router;
