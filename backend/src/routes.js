import { Router } from 'express';

import LoginController from './app/controllers/LoginController';
import Spa2Controller from './app/controllers/Spa2Controller';
import AreaController from './app/controllers/AreaController';
import TelaController from './app/controllers/TelaController';
import PerfilTelaController from './app/controllers/PerfilTelaController';
import PerfilAreaController from './app/controllers/PerfilAreaController';
import AuthMiddleware from './app/middlewares/auth';

require('dotenv/config');

const routes = new Router();

/**
 * Rotas sem autenticação
 */
routes.post(`${process.env.API_URL}/autorizacao`, LoginController.index);
routes.get(`${process.env.API_URL}/`, Spa2Controller.index);

/**
 * Rotas com autenticação
 */
routes.use(AuthMiddleware);

// rota que retorna as áreas
routes.get(`${process.env.API_URL}/area`, AreaController.index);

// rotas do cadastro de telas
routes.get(`${process.env.API_URL}/telas`, TelaController.index);
routes.post(`${process.env.API_URL}/telas`, TelaController.store);
routes.put(`${process.env.API_URL}/telas/:id`, TelaController.update);
routes.delete(`${process.env.API_URL}/telas/:id`, TelaController.delete);

// rotas do cadastro de perfil de tela
routes.get(`${process.env.API_URL}/perfil-tela`, PerfilTelaController.index);
routes.post(`${process.env.API_URL}/perfil-tela`, PerfilTelaController.store);
routes.put(
  `${process.env.API_URL}/perfil-tela/:id`,
  PerfilTelaController.update
);
routes.delete(
  `${process.env.API_URL}/perfil-tela/:id`,
  PerfilTelaController.delete
);

// rotas do cadastro de perfil de área
routes.get(`${process.env.API_URL}/perfil-area`, PerfilAreaController.index);
routes.post(`${process.env.API_URL}/perfil-area`, PerfilAreaController.store);
routes.put(
  `${process.env.API_URL}/perfil-area/:id`,
  PerfilAreaController.update
);
routes.delete(
  `${process.env.API_URL}/perfil-area/:id`,
  PerfilAreaController.delete
);

export default routes;
