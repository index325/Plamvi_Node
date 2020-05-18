import express from "express";
import JwtMiddle from "../middlewares/JwtUser";
import LoginController from "../controllers/LoginController";
import UserController from "../controllers/UserController";
import OrderController from "../controllers/OrderController";
import CustomerController from "../controllers/CustomerController";
import ProductController from "../controllers/ProductController";
import CartController from "../controllers/CartController";
import CartItemController from "../controllers/CartItemController";

const routes = express.Router();

routes.post("/usuario", UserController.guardar);
routes.get("/usuarios", JwtMiddle, UserController.listar);

routes.post("/login", LoginController.loginUser);
routes.put("/login", JwtMiddle, LoginController.atualizar);

routes.post("/pedido", JwtMiddle, OrderController.guardar);
routes.get("/meus_pedidos", JwtMiddle, OrderController.meusPedidos);

routes.get("/clientes", JwtMiddle, CustomerController.listar);

routes.get("/produtos", JwtMiddle, ProductController.listarProdutos);

routes.get('/verificar_carrinho', JwtMiddle, CartController.verificarCarrinho)
routes.post('/adicionar_ao_carrinho', JwtMiddle, CartItemController.adicionarAoCarrinho)
routes.delete('/excluir_do_carrinho', JwtMiddle, CartItemController.excluirItem)
routes.get('/meus_itens_carrinho', JwtMiddle, CartItemController.meusItens)

routes.get("/", function(req, res, next) {
  res.status(200).send({
    title: "Node Express API",
    version: "0.0.1",
  });
});

export default routes;
