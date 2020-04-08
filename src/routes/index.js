import ClienteController from "../controllers/ClienteController";
import UsuariosController from "../controllers/UsuariosController";

const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
  res.status(200).send({
    title: "Node Express API",
    version: "0.0.1",
  });
});

router.post("/cliente", ClienteController.guardar);
router.post("/usuario", UsuariosController.guardar);

module.exports = router;
