const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// Login
router.get("/login", AuthController.login);
router.post("/login", AuthController.loginPost);

// Registro
router.get("/registrar", AuthController.registrar);
router.post("/registrar", AuthController.registrarPOST);

// Logout
router.get("/logout", AuthController.logout);

module.exports = router;
