const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const userController =
require("../controllers/userController");

router.get(
    "/perfil",
    auth,
    userController.perfil
);

router.put(
    "/perfil",
    auth,
    userController.atualizarPerfil
);

router.put(
    "/senha",
    auth,
    userController.alterarSenha
);

module.exports = router;