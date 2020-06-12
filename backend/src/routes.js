import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

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
import TipoManifestacaoController from './app/controllers/TipoManifestacaoController';
import ManifestacaoController from './app/controllers/ManifestacaoController';
import SetorController from './app/controllers/SetorController';
import LotacaoController from './app/controllers/LotacaoController';
import ProximoTramiteController from './app/controllers/ProximoTramiteController';
import TramiteController from './app/controllers/TramiteController';
import TipoDocumentoController from './app/controllers/TipoDocumentoController';
import AuthMiddleware from './app/middlewares/auth';
import * as funcoesArquivo from '../src/config/arquivos';

import validatorSessionStore from './app/validators/SessionStore';

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

const storageManifestacao = multer.diskStorage({
    destination: function(req, file, callback) {
        const novoCaminho = funcoesArquivo.destino + funcoesArquivo.finalDoCaminho(req.params.id);
        if (!fs.existsSync(novoCaminho)) {
            fs.mkdirSync(novoCaminho);
        }
        callback(null, novoCaminho);
    },
    filename: function(req, file, callback) {
        console.log('Id do arquivo: ' + req.params.id);
        callback(null, funcoesArquivo.nomeFisico(req.params.id) + 'M' + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const uploadManifestacao = multer({ storage: storageManifestacao });

/**
 * Rotas sem autenticação
 */
routes.post(`${process.env.API_URL}/autorizacao`, validatorSessionStore, LoginController.index);
routes.get(`${process.env.API_URL}/bd`, LoginController.getBd);
routes.get(`${process.env.API_URL}/`, Spa2Controller.index);

/**
 * Rotas com autenticação
 */
routes.use(AuthMiddleware);

// rota que retorna as áreas
routes.get(`${process.env.API_URL}/area`, AreaController.index);
routes.get(`${process.env.API_URL}/area-combo`, AreaController.areaNormal);

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

// rotas do cadastro de nodos
routes.get(`${process.env.API_URL}/nodos`, NodoController.index);
routes.get(`${process.env.API_URL}/grid-nodos/:fluId`, NodoController.gridNodo);
routes.get(`${process.env.API_URL}/seleciona-nodo/:id`, NodoController.findOne);
routes.post(`${process.env.API_URL}/nodos`, NodoController.store);
routes.put(`${process.env.API_URL}/nodos/:id`, NodoController.update);
routes.delete(`${process.env.API_URL}/nodos/:id`, NodoController.delete);

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

// rota de pesquisa de processo
routes.post(`${process.env.API_URL}/pesquisa-processo`, DadosProcessoController.pesquisaProcesso);

// rotas de dados do processo
routes.get(`${process.env.API_URL}/ver-processo/:id`, DadosProcessoController.dadosProcesso);
routes.get(`${process.env.API_URL}/processos-pessoa/:areaId/:usuario`, DadosProcessoController.processosPessoais);
routes.get(`${process.env.API_URL}/processos-area/:areaId`, DadosProcessoController.processosArea);
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
routes.get(`${process.env.API_URL}/arquivos-manifestacao/:manId`, ArquivoController.indexManifestacao);
routes.get(`${process.env.API_URL}/download-manifestacao/:manId/:arqId`, ArquivoController.downloadManifestacao);
routes.post(`${process.env.API_URL}/arquivo-visto-executiva`, ManifestacaoController.criaPdfVistoExecutiva);
routes.post(`${process.env.API_URL}/arquivo-ciencia`, ManifestacaoController.criaPdfCiencia);

// rota de inserção de anexo em processo
routes.post(`${process.env.API_URL}/anexo-processo/:id`, upload.single('file'), function(req, res) {
    res.status(204).end();
});

// rota de inserção de anexo em manifestação
routes.post(`${process.env.API_URL}/anexo-manifestacao/:id`, uploadManifestacao.single('file'), function(req, res) {
    res.status(204).end();
});

// rotas do cadastro de tipos de manifestacao
routes.get(`${process.env.API_URL}/tipos-manifestacao`, TipoManifestacaoController.index);
routes.get(`${process.env.API_URL}/tipos-manifestacao-combo`, TipoManifestacaoController.combo);
routes.post(`${process.env.API_URL}/tipos-manifestacao`, TipoManifestacaoController.store);
routes.put(`${process.env.API_URL}/tipos-manifestacao/:id`, TipoManifestacaoController.update);
routes.delete(`${process.env.API_URL}/tipos-manifestacao/:id`, TipoManifestacaoController.delete);

// rotas do cadastro de setores
routes.get(`${process.env.API_URL}/setores`, SetorController.index);
routes.post(`${process.env.API_URL}/setores`, SetorController.store);
routes.put(`${process.env.API_URL}/setores/:id`, SetorController.update);
routes.delete(`${process.env.API_URL}/setores/:id`, SetorController.delete);

// rotas do cadastro de lotações
routes.get(`${process.env.API_URL}/lotacoes`, LotacaoController.index);
routes.post(`${process.env.API_URL}/lotacoes`, LotacaoController.store);
routes.put(`${process.env.API_URL}/lotacoes/:id`, LotacaoController.update);
routes.delete(`${process.env.API_URL}/lotacoes/:id`, LotacaoController.delete);

// rotas do cadastro de manifestacao
routes.get(`${process.env.API_URL}/manifestacoes/:id`, ManifestacaoController.index);
routes.get(`${process.env.API_URL}/manifestacao-processo/:id`, ManifestacaoController.manifestacaoProcesso);
routes.get(`${process.env.API_URL}/manifestacao-processo-dados/:id`, ManifestacaoController.manifestacaoProcessoDados);
routes.post(`${process.env.API_URL}/manifestacoes`, ManifestacaoController.store);
routes.put(`${process.env.API_URL}/manifestacoes/:id`, ManifestacaoController.update);
routes.delete(`${process.env.API_URL}/manifestacoes/:id`, ManifestacaoController.delete);

// rotas do cadastro de próximos trâmites
routes.get(`${process.env.API_URL}/proximos-tramites`, ProximoTramiteController.index);
routes.get(`${process.env.API_URL}/combo-nodo/:id`, ProximoTramiteController.comboNodo);
routes.get(`${process.env.API_URL}/grid-proximo-tramite/:id`, ProximoTramiteController.gridProximoTramite);
routes.get(`${process.env.API_URL}/gera-grafo/:id`, ProximoTramiteController.geraGrafo);
routes.get(`${process.env.API_URL}/seleciona-proximo-tramite/:id`, ProximoTramiteController.selecionaProximoTramite);
routes.post(`${process.env.API_URL}/proximos-tramites`, ProximoTramiteController.store);
routes.put(`${process.env.API_URL}/proximos-tramites/:id`, ProximoTramiteController.update);
routes.delete(`${process.env.API_URL}/proximos-tramites/:id`, ProximoTramiteController.delete);

// rotas do cadastro de  trâmites
routes.get(`${process.env.API_URL}/tramites`, TramiteController.index);
routes.get(`${process.env.API_URL}/grid-tramites/:id`, TramiteController.gridTramite);
routes.post(`${process.env.API_URL}/tramites`, TramiteController.store);
// rota de envio de processo
routes.get(`${process.env.API_URL}/processo-envia/:id`, TramiteController.processosEnvio);
// rotas de recebimento de processo
routes.get(`${process.env.API_URL}/processo-recebe/:id`, TramiteController.processosRecebimento);
routes.post(`${process.env.API_URL}/tramite-recebe-ou-nega`, TramiteController.recebeOuNega);
// rota de retorno de próximo trâmite
routes.get(`${process.env.API_URL}/proximo-tramite/:id`, TramiteController.proximoTramite);

// rota de encerramento de processo
routes.put(`${process.env.API_URL}/encerra/:id`, CriaProcessoController.encerra);

// rota de ciência de processo
routes.put(`${process.env.API_URL}/ciencia/:id`, CriaProcessoController.ciencia);

// rota de decisao de processo
routes.get(`${process.env.API_URL}/decisao/:id`, DadosProcessoController.decisaoPessoal);

// rotas do cadastro de tipos de documento
routes.get(`${process.env.API_URL}/tipos-documento`, TipoDocumentoController.index);
routes.get(`${process.env.API_URL}/tipos-documento-combo`, TipoDocumentoController.combo);
routes.post(`${process.env.API_URL}/tipos-documento`, TipoDocumentoController.store);
routes.put(`${process.env.API_URL}/tipos-documento/:id`, TipoDocumentoController.update);
routes.delete(`${process.env.API_URL}/tipos-documento/:id`, TipoDocumentoController.delete);

export default routes;
