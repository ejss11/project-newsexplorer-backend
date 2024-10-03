const express = require("express");
const { signup, signin } = require("../controllers/authController");
const { validateSignup, validateSignin } = require("../middleware/validators"); // Valida las solicitudes

const router = express.Router();

// Ruta para el registro de usuario
router.post("/signup", validateSignup, signup);

// Ruta para el inicio de sesión
router.post("/signin", validateSignin, signin);

module.exports = router;
