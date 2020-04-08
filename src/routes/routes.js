import express from 'express';
import JwtMiddle from '../middlewares/Jwt';
import LoginController from '../controllers/LoginController';
import UsuariosController from '../controllers/UsuariosController';
import TipoDeEntregaController from '../controllers/TipoDeEntregaController';
import ClienteController from '../controllers/ClienteController';
import ClienteController from '../controllers/ClienteController';
import PedidosController from '../controllers/PedidosController';

const routes = express.Router();

routes.post('/usuario', UsuariosController.guardar);
routes.post('/login', LoginController.login);
routes.put('/login', JwtMiddle, LoginController.atualizar);
routes.post('/tipo_entrega', TipoDeEntregaController.guardar);

routes.post('/cliente', ClienteController.guardar);
routes.post('/pedido', PedidosController.guardar);

routes.get('/', function (req, res, next) {
    res.status(200).send({
        title: "Node Express API",
        version: "0.0.1"
    });
});

export default routes;
