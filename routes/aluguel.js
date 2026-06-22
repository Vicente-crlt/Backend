const express =
require("express");

const router =
express.Router();

const aluguelController =
require("../controllers/aluguelController");

router.post(
    "/iniciar",
    aluguelController.iniciar
);

router.post(
    "/finalizar",
    aluguelController.finalizar
);

module.exports =
router;