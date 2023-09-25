const { Router } = require("express");
const authCtrl = require("../controllers/auth.controller.js");
const { authRequired, isAdmin } = require("../middlewares/validateToken.js");

const router = Router();

// Rutas y controladores

router.post("/register", authCtrl.register); // Ruta para registrar un usuario (POST /api/register)
router.post("/login", authCtrl.login); // Ruta para iniciar sesión (POST /api/login)
router.post("/logout", authCtrl.logout); // Ruta para cerrar sesión (POST /api/logout)

// Se requiere autenticación y que el usuario sea administrador
router.delete("/profile/:id", [authRequired, isAdmin], authCtrl.deleteUser); // Ruta para eliminar un usuario por su ID (DELETE /api/profile/:id)
router.put("/profile/:id", [authRequired, isAdmin], authCtrl.updateUser); // Ruta para actualizar un usuario por su ID (PUT /api/profile/:id)

module.exports = router;
