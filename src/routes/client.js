import express from "express";
import JwtMiddle from "../middlewares/JwtClient";

import LoginController from "../controllers/LoginController";
import UsuariosController from "../controllers/UsuariosController";
import TipoDeEntregaController from "../controllers/TipoDeEntregaController";
import ClienteController from "../controllers/ClienteController";
import PedidosController from "../controllers/PedidosController";
import ProdutosController from "../controllers/ProdutosController";

const routes = express.Router();

routes.get("/usuarios", JwtMiddle, UsuariosController.listar);

routes.post("/login", LoginController.loginCliente);
routes.put("/login", JwtMiddle, LoginController.atualizar);

routes.post("/tipo_entrega", JwtMiddle, TipoDeEntregaController.guardar);
routes.get("/tipo_entrega", JwtMiddle, TipoDeEntregaController.listar);

routes.post('/produto', JwtMiddle, ProdutosController.guardar)
routes.get('/meus_produtos', JwtMiddle, ProdutosController.meusProdutos)

routes.get("/", function(req, res, next) {
  res.status(200).send({
    title: "Node Express API",
    version: "0.0.1",
  });
});

export default routes;
