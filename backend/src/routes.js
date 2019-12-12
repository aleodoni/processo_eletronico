import { Router } from 'express';

import LoginController from './app/controllers/LoginController';
import Spa2Controller from './app/controllers/Spa2Controller';
import AreaController from './app/controllers/AreaController';
import TelaController from './app/controllers/TelaController';
import FluxoController from './app/controllers/FluxoController';
import RazaoTramiteController from './app/controllers/RazaoTramiteController';
import GeneroController from './app/controllers/GeneroController';
import TipoProcessoController from './app/controllers/TipoProcessoController';
import MenuController from './app/controllers/MenuController';
import ModeloMenuController from './app/controllers/ModeloMenuController';
import AreaMenuController from './app/controllers/AreaMenuController';
import AreaTelaController from './app/controllers/AreaTelaController';
import NodoController from './app/controllers/NodoController';
import CriaProcessoController from './app/controllers/CriaProcessoController';
import DadosProcessoController from './app/controllers/DadosProcessoController';
import ArquivoController from './app/controllers/ArquivoController';
import AuthMiddleware from './app/middlewares/auth';
import path from 'path';
import multer from 'multer';
import * as funcoesArquivo from '../src/config/arquivos';
import fs from 'fs';

require('dotenv/config');

const routes = new Router();
const storage = multer.diskStorage({
    // destination: funcoesArquivo.destino,
    destination: function(req, file, callback) {
        const novoCaminho = funcoesArquivo.destino + funcoesArquivo.finalDoCaminho(req.params.id);
        if (!fs.existsSync(novoCaminho)) {
            fs.mkdirSync(novoCaminho);
        }
        callback(null, novoCaminho);
    },
    filename: function(req, file, callback) {
        console.log('Id do arquivo: ' + req.params.id);
        callback(null, funcoesArquivo.nomeFisico(req.params.id) + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

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

// rota que retorna as telas da área
routes.get(`${process.env.API_URL}/telas-por-area/:setId`, AreaTelaController.telasPorArea);

// rotas do cadastro de telas
routes.get(`${process.env.API_URL}/telas`, TelaController.index);
routes.post(`${process.env.API_URL}/telas`, TelaController.store);
routes.put(`${process.env.API_URL}/telas/:id`, TelaController.update);
routes.delete(`${process.env.API_URL}/telas/:id`, TelaController.delete);

// rotas do cadastro de nós
routes.get(`${process.env.API_URL}/nos`, NodoController.index);
routes.get(`${process.env.API_URL}/grid-nos/:fluId`, NodoController.gridNodo);
routes.post(`${process.env.API_URL}/nos`, NodoController.store);
routes.put(`${process.env.API_URL}/nos/:id`, NodoController.update);
routes.delete(`${process.env.API_URL}/nos/:id`, NodoController.delete);

// rotas do cadastro de gêneros
routes.get(`${process.env.API_URL}/generos`, GeneroController.index);
routes.post(`${process.env.API_URL}/generos`, GeneroController.store);
routes.put(`${process.env.API_URL}/generos/:id`, GeneroController.update);
routes.delete(`${process.env.API_URL}/generos/:id`, GeneroController.delete);

// rotas do cadastro de tipos de processo
routes.get(`${process.env.API_URL}/tipos-processo`, TipoProcessoController.index);
routes.get(`${process.env.API_URL}/tipos-de-processo`, TipoProcessoController.listaTiposProcesso);
routes.get(`${process.env.API_URL}/tipos-de-processo/:genId`, TipoProcessoController.carregaPorGenero);
routes.post(`${process.env.API_URL}/tipos-processo`, TipoProcessoController.store);
routes.put(`${process.env.API_URL}/tipos-processo/:id`, TipoProcessoController.update);
routes.delete(`${process.env.API_URL}/tipos-processo/:id`, TipoProcessoController.delete);

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
routes.get(`${process.env.API_URL}/areas-do-menu`, AreaMenuController.areaDoMenu);
routes.post(`${process.env.API_URL}/area-menu`, AreaMenuController.store);
routes.put(`${process.env.API_URL}/area-menu/:id`, AreaMenuController.update);
routes.delete(
    `${process.env.API_URL}/area-menu/:id`,
    AreaMenuController.delete
);

// rotas do cadastro de menu
routes.get(`${process.env.API_URL}/menu`, MenuController.index);
routes.get(`${process.env.API_URL}/tela-menu`, MenuController.telaMenu);
routes.get(`${process.env.API_URL}/menu-pai`, MenuController.telaPai);
routes.post(`${process.env.API_URL}/menu`, MenuController.store);
routes.put(`${process.env.API_URL}/menu/:id`, MenuController.update);
routes.delete(`${process.env.API_URL}/menu/:id`, MenuController.delete);
routes.get(`${process.env.API_URL}/data-hora-atual`, MenuController.dataAtual);

// rotas de criação de processo
routes.get(`${process.env.API_URL}/dados-pessoa/:matricula`, CriaProcessoController.dadosPessoa);
routes.post(`${process.env.API_URL}/processo`, CriaProcessoController.store);

// rotas de dados do processo
routes.get(`${process.env.API_URL}/ver-processo/:id`, DadosProcessoController.dadosProcesso);
routes.post(`${process.env.API_URL}/processo-por-codigo`, DadosProcessoController.processoPorCodigo);

// rotas do cadastro de fluxos
routes.get(`${process.env.API_URL}/fluxos`, FluxoController.index);
routes.post(`${process.env.API_URL}/fluxos`, FluxoController.store);
routes.put(`${process.env.API_URL}/fluxos/:id`, FluxoController.update);
routes.delete(`${process.env.API_URL}/fluxos/:id`, FluxoController.delete);

// rotas do cadastro de razoes de trâmite
routes.get(`${process.env.API_URL}/razao-tramite`, RazaoTramiteController.index);
routes.post(`${process.env.API_URL}/razao-tramite`, RazaoTramiteController.store);
routes.put(`${process.env.API_URL}/razao-tramite/:id`, RazaoTramiteController.update);
routes.delete(`${process.env.API_URL}/razao-tramite/:id`, RazaoTramiteController.delete);

// rotas de arquivos
routes.post(`${process.env.API_URL}/arquivos`, ArquivoController.store);
routes.put(`${process.env.API_URL}/arquivos/:id`, ArquivoController.update);
routes.delete(`${process.env.API_URL}/arquivos/:id`, ArquivoController.delete);
routes.get(`${process.env.API_URL}/arquivos-processo/:proId`, ArquivoController.index);
routes.get(`${process.env.API_URL}/download-processo/:proId/:arqId`, ArquivoController.download);

// rota de inserção de anexo em processo
routes.post(`${process.env.API_URL}/anexo-processo/:id`, upload.single('file'), function(req, res) {
    res.status(204).end();
});

export default routes;
