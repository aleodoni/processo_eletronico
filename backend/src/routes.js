import { Router } from 'express';

import LoginController from './app/controllers/LoginController';
import Spa2Controller from './app/controllers/Spa2Controller';
import AreaController from './app/controllers/AreaController';
import TelaController from './app/controllers/TelaController';
import MenuController from './app/controllers/MenuController';
import ModeloMenuController from './app/controllers/ModeloMenuController';
import AreaMenuController from './app/controllers/AreaMenuController';
import AreaTelaController from './app/controllers/AreaTelaController';
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

// rota que retorna a área por código
routes.get(
  `${process.env.API_URL}/area-por-codigo/:id`,
  AreaController.areaPorCodigo
);

// rota que retorna o setor por código
routes.get(
  `${process.env.API_URL}/setor-por-codigo/:id`,
  AreaController.setorPorCodigo
);

// rota que retorna o menu
routes.get(`${process.env.API_URL}/geraMenu/:area`, MenuController.montaMenu);

//rota que retorna as telas da área
routes.get(`${process.env.API_URL}/telas-por-area/:setId`, AreaTelaController.telasPorArea);

// rotas do cadastro de telas
routes.get(`${process.env.API_URL}/telas`, TelaController.index);
routes.post(`${process.env.API_URL}/telas`, TelaController.store);
routes.put(`${process.env.API_URL}/telas/:id`, TelaController.update);
routes.delete(`${process.env.API_URL}/telas/:id`, TelaController.delete);

// rotas do cadastro de modelo de menu
routes.get(`${process.env.API_URL}/modelo-menu`, ModeloMenuController.index);
routes.post(`${process.env.API_URL}/modelo-menu`, ModeloMenuController.store);
routes.put(
  `${process.env.API_URL}/modelo-menu/:id`,
  ModeloMenuController.update
);
routes.delete(
  `${process.env.API_URL}/modelo-menu/:id`,
  ModeloMenuController.delete
);

// rotas do cadastro de área de menu
routes.get(`${process.env.API_URL}/area-menu`, AreaMenuController.index);
routes.post(`${process.env.API_URL}/area-menu`, AreaMenuController.store);
routes.put(`${process.env.API_URL}/area-menu/:id`, AreaMenuController.update);
routes.delete(
  `${process.env.API_URL}/area-menu/:id`,
  AreaMenuController.delete
);

// rotas do cadastro de menu
routes.get(`${process.env.API_URL}/menu`, MenuController.index);
routes.post(`${process.env.API_URL}/menu`, MenuController.store);
routes.put(`${process.env.API_URL}/menu/:id`, MenuController.update);
routes.delete(`${process.env.API_URL}/menu/:id`, MenuController.delete);
routes.get(`${process.env.API_URL}/data-hora-atual`, MenuController.dataAtual);

export default routes;
