import express from 'express';
import JwtMiddle from '../middlewares/Jwt';
import LoginController from '../controllers/LoginController';
import UsuariosController from '../controllers/UsuariosController';

const routes = express.Router();

routes.post('/usuario', UsuariosController.guardar);
routes.post('/login', LoginController.login);
routes.put('/login', JwtMiddle, LoginController.atualizar);

export default routes;
