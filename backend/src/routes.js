import { Router } from 'express';

import LoginController from './app/controllers/LoginController';
import Spa2Controller from './app/controllers/Spa2Controller';
import AuthMiddleware from './app/middlewares/auth';
require('dotenv/config');

const routes = new Router();

/**
 * Rotas sem autenticação
 */
routes.post(process.env.API_URL + '/autorizacao', LoginController.index);
routes.get(process.env.API_URL + '/', Spa2Controller.index);

/**
 * Rotas com autenticação
 */
routes.use(AuthMiddleware);



export default routes;
