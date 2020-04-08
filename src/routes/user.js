import express from "express";
import JwtMiddle from "../middlewares/JwtUser";
import LoginController from "../controllers/LoginController";
import UsuariosController from "../controllers/UsuariosController";
import PedidosController from "../controllers/PedidosController";

const routes = express.Router();

routes.post("/usuario", UsuariosController.guardar);
routes.get("/usuarios", JwtMiddle, UsuariosController.listar);

routes.post("/login", LoginController.loginUser);
routes.put("/login", JwtMiddle, LoginController.atualizar);

routes.post("/pedido", JwtMiddle, PedidosController.guardar);
routes.get("/meus_pedidos", JwtMiddle, PedidosController.meusPedidos);

routes.get("/", function(req, res, next) {
  res.status(200).send({
    title: "Node Express API",
    version: "0.0.1",
  });
});

export default routes;
