import express from "express";
import JwtMiddle from "../middlewares/JwtClient";

import LoginController from "../controllers/LoginController";
import UserController from "../controllers/UserController";
import DeliveryTypeController from "../controllers/DeliveryTypeController";
import ProductController from "../controllers/ProductController";

const routes = express.Router();

routes.get("/usuarios", JwtMiddle, UserController.listar);

routes.post("/login", LoginController.loginCliente);
routes.put("/login", JwtMiddle, LoginController.atualizar);

routes.post("/tipo_entrega", JwtMiddle, DeliveryTypeController.guardar);
routes.get("/tipo_entrega", JwtMiddle, DeliveryTypeController.listar);

routes.post('/produto', JwtMiddle, ProductController.guardar)
routes.get('/meus_produtos', JwtMiddle, ProductController.listarProdutos)

routes.get('/produto', JwtMiddle, ProductController.overviewProduto)

routes.get("/", function(req, res, next) {
  res.status(200).send({
    title: "Node Express API",
    version: "0.0.1",
  });
});

export default routes;
