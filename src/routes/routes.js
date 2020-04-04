import express from 'express';
import JwtMiddle from '../middlewares/Jwt';
import LoginController from '../controllers/LoginController';
import UsuariosController from '../controllers/UsuariosController';
import TipoDeEntregaController from '../controllers/TipoDeEntregaController';
import ClienteController from '../controllers/ClienteController';

const routes = express.Router();

routes.post('/usuario', UsuariosController.guardar);
routes.post('/login', LoginController.login);
routes.put('/login', JwtMiddle, LoginController.atualizar);
routes.post('/tipo_entrega', TipoDeEntregaController.guardar);

routes.post('/cliente', ClienteController.guardar);

export default routes;
