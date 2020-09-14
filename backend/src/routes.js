import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

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
import MembroComissaoController from './app/controllers/MembroComissaoController';
import CriaProcessoController from './app/controllers/CriaProcessoController';
import DadosProcessoController from './app/controllers/DadosProcessoController';
import ArquivoController from './app/controllers/ArquivoController';
import TipoManifestacaoController from './app/controllers/TipoManifestacaoController';
import ManifestacaoController from './app/controllers/ManifestacaoController';
import SetorController from './app/controllers/SetorController';
import LotacaoController from './app/controllers/LotacaoController';
import SigiloController from './app/controllers/SigiloController';
import ProximoTramiteController from './app/controllers/ProximoTramiteController';
import TramiteController from './app/controllers/TramiteController';
import TipoDocumentoController from './app/controllers/TipoDocumentoController';
import AuthMiddleware from './app/middlewares/auth';
import * as funcoesArquivo from '../src/config/arquivos';
import CriaPdfController from './app/controllers/CriaPdfController';
import RegraAposentacaoController from './app/controllers/RegraAposentacaoController';

import validatorSessionStore from './app/validators/SessionStore';
import fluxoValidator from './app/validators/fluxoValidator';
import generoValidator from './app/validators/generoValidator';
import lotacaoValidator from './app/validators/lotacaoValidator';
import modeloMenuValidator from './app/validators/modeloMenuValidator';
import areaMenuValidator from './app/validators/areaMenuValidator';
import nodoValidator from './app/validators/nodoValidator';
import menuValidator from './app/validators/menuValidator';
import regraAposentacaoValidator from './app/validators/regraAposentacaoValidator';
import razaoTramiteValidator from './app/validators/razaoTramiteValidator';
import SolicitacaoController from './app/controllers/SolicitacaoController';

import Arquivo from './app/models/Arquivo';
import DataHoraAtual from './app/models/DataHoraAtual';
import { fileHash } from './app/util/hash';

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

const storageDocumento = multer.diskStorage({
    destination: function(req, file, callback) {
        const caminhoProcesso = process.env.CAMINHO_ARQUIVOS_PROCESSO;
        const proId = req.body.pro_id;
        const ano = req.body.ano;
        const caminhoCompleto = caminhoProcesso + proId + ano + '/';
        callback(null, caminhoCompleto);
    },
    filename: (req, file, callback) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err) callback(err);

            const filename = `${hash.toString('hex')}-${file.originalname}`;

            callback(null, filename);
        });
    }
});

const upload = multer({ storage: storage });

const uploadManifestacao = multer({ storage: storageManifestacao });

const uploadDocumento = multer({ storage: storageDocumento });

/**
 * Rotas sem autenticação
 */
routes.post(`${process.env.API_URL}/autorizacao`, validatorSessionStore, LoginController.index);
routes.post(`${process.env.API_URL}/autorizacao-externa`, validatorSessionStore, LoginController.indexExterno);
routes.post(`${process.env.API_URL}/autorizacao-ext-contab`, validatorSessionStore, LoginController.indexExtContab);
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
routes.post(`${process.env.API_URL}/nodos`, nodoValidator, NodoController.store);
routes.put(`${process.env.API_URL}/nodos/:id`, nodoValidator, NodoController.update);
routes.delete(`${process.env.API_URL}/nodos/:id`, NodoController.delete);

// rotas do cadastro de membros de comissão
routes.get(`${process.env.API_URL}/comissoes`, MembroComissaoController.comissao);
routes.get(`${process.env.API_URL}/grid-membros-comissao/:id`, MembroComissaoController.gridMembrosComissao);
routes.get(`${process.env.API_URL}/popup-membros-comissao/:id`, CriaProcessoController.popupMembrosComissao);
routes.post(`${process.env.API_URL}/membros-comissao`, MembroComissaoController.store);
routes.put(`${process.env.API_URL}/membros-comissao/:id`, MembroComissaoController.update);
routes.delete(`${process.env.API_URL}/membros-comissao/:id`, MembroComissaoController.delete);

// rotas do cadastro de sigilo
routes.get(`${process.env.API_URL}/area-sigilo`, SigiloController.area);
routes.get(`${process.env.API_URL}/tipo-processo-sigilo`, SigiloController.tipoProcesso);
routes.get(`${process.env.API_URL}/grid-sigilo`, SigiloController.gridSigilo);
routes.post(`${process.env.API_URL}/sigilos`, SigiloController.store);
routes.put(`${process.env.API_URL}/sigilos/:id`, SigiloController.update);
routes.delete(`${process.env.API_URL}/sigilos/:id`, SigiloController.delete);

// rotas do cadastro de gêneros
routes.get(`${process.env.API_URL}/generos`, GeneroController.index);
routes.get(`${process.env.API_URL}/generos-grid`, GeneroController.grid);
routes.post(`${process.env.API_URL}/generos`, generoValidator, GeneroController.store);
routes.put(`${process.env.API_URL}/generos/:id`, generoValidator, GeneroController.update);
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
routes.post(`${process.env.API_URL}/modelo-menu`, modeloMenuValidator, ModeloMenuController.store);
routes.put(
    `${process.env.API_URL}/modelo-menu/:id`,
    modeloMenuValidator,
    ModeloMenuController.update
);
routes.delete(
    `${process.env.API_URL}/modelo-menu/:id`,
    ModeloMenuController.delete
);

// rotas do cadastro de área de menu
routes.get(`${process.env.API_URL}/area-menu`, AreaMenuController.index);
routes.get(`${process.env.API_URL}/areas-do-menu`, AreaMenuController.areaDoMenu);
routes.post(`${process.env.API_URL}/area-menu`, areaMenuValidator, AreaMenuController.store);
routes.put(`${process.env.API_URL}/area-menu/:id`, areaMenuValidator, AreaMenuController.update);
routes.delete(
    `${process.env.API_URL}/area-menu/:id`,
    AreaMenuController.delete
);

// rotas do cadastro de menu
routes.get(`${process.env.API_URL}/menu`, MenuController.index);
routes.get(`${process.env.API_URL}/tela-menu`, MenuController.telaMenu);
routes.get(`${process.env.API_URL}/menu-pai`, MenuController.telaPai);
routes.post(`${process.env.API_URL}/menu`, menuValidator, MenuController.store);
routes.put(`${process.env.API_URL}/menu/:id`, menuValidator, MenuController.update);
routes.delete(`${process.env.API_URL}/menu/:id`, MenuController.delete);
routes.get(`${process.env.API_URL}/data-hora-atual`, MenuController.dataAtual);

// rotas de criação de processo
routes.get(`${process.env.API_URL}/dados-pessoa/:matricula`, CriaProcessoController.dadosPessoa);
routes.get(`${process.env.API_URL}/dados-pessoa-comissao/:matricula`, CriaProcessoController.dadosPessoaComissao);
routes.get(`${process.env.API_URL}/processo-origem/:id`, CriaProcessoController.processoOrigem);
routes.get(`${process.env.API_URL}/combo-processos-pensao-alimenticia`, CriaProcessoController.processosDescontoFolhaDeterminacaoJudicial);
routes.get(`${process.env.API_URL}/combo-processos-recurso/:usuario`, CriaProcessoController.processosRecurso);
routes.get(`${process.env.API_URL}/combo-processos-recurso-pad/:usuario`, CriaProcessoController.processosRecursoPad);
routes.post(`${process.env.API_URL}/processo`, CriaProcessoController.store);
routes.post(`${process.env.API_URL}/processo-pas-pad`, CriaProcessoController.criaPasPad);

routes.post(`${process.env.API_URL}/processo-pagamento`, CriaProcessoController.criaProcessoPagamento);

// rota de pesquisa de processo
routes.post(`${process.env.API_URL}/pesquisa-processo`, DadosProcessoController.pesquisaProcesso);

// rotas de dados do processo
routes.get(`${process.env.API_URL}/ver-processo/:id`, DadosProcessoController.dadosProcesso);
routes.get(`${process.env.API_URL}/ver-processo-pagamento/:id`, DadosProcessoController.dadosProcessoPagamento);
routes.get(`${process.env.API_URL}/dados-membros-comissao/:id`, DadosProcessoController.membrosComissao);
routes.get(`${process.env.API_URL}/dados-nome-pas-pad/:id`, DadosProcessoController.nomePasPad);
routes.get(`${process.env.API_URL}/ver-processo-pas-pad/:id`, DadosProcessoController.dadosProcessoPasPad);
routes.get(`${process.env.API_URL}/membros-comissao`, CriaProcessoController.comboMembrosComissaoProcessante);
routes.get(`${process.env.API_URL}/processos-pessoa/:areaId/:usuario`, DadosProcessoController.processosPessoais);
routes.get(`${process.env.API_URL}/processos-area/:areaId`, DadosProcessoController.processosArea);
routes.get(`${process.env.API_URL}/processos-sigiloso/:areaId/:login`, DadosProcessoController.processosSigiloso);
routes.post(`${process.env.API_URL}/processo-por-codigo`, DadosProcessoController.processoPorCodigo);

// rotas do cadastro de fluxos
routes.get(`${process.env.API_URL}/fluxos`, FluxoController.index);
routes.post(`${process.env.API_URL}/fluxos`, fluxoValidator, FluxoController.store);
routes.put(`${process.env.API_URL}/fluxos/:id`, fluxoValidator, FluxoController.update);
routes.delete(`${process.env.API_URL}/fluxos/:id`, FluxoController.delete);

// rotas do cadastro de razoes de trâmite
routes.get(`${process.env.API_URL}/razao-tramite`, RazaoTramiteController.index);
routes.post(`${process.env.API_URL}/razao-tramite`, razaoTramiteValidator, RazaoTramiteController.store);
routes.put(`${process.env.API_URL}/razao-tramite/:id`, razaoTramiteValidator, RazaoTramiteController.update);
routes.delete(`${process.env.API_URL}/razao-tramite/:id`, RazaoTramiteController.delete);

// rotas de arquivos
routes.post(`${process.env.API_URL}/arquivos`, ArquivoController.store);
routes.put(`${process.env.API_URL}/arquivos/:id`, ArquivoController.update);
routes.delete(`${process.env.API_URL}/arquivos/:id`, ArquivoController.delete);
routes.get(`${process.env.API_URL}/arquivos-processo/:proId`, ArquivoController.index);
routes.get(`${process.env.API_URL}/download-processo/:proId/:arqId`, ArquivoController.download);
routes.get(`${process.env.API_URL}/arquivos-manifestacao/:manId`, ArquivoController.indexManifestacao);
routes.get(`${process.env.API_URL}/download-manifestacao/:manId/:arqId`, ArquivoController.downloadManifestacao);

// rota de inserção de anexo em processo
routes.post(`${process.env.API_URL}/anexo-processo/:id`, upload.single('file'), function(req, res) {
    res.status(204).end();
});

// rota de inserção de anexo em manifestação
routes.post(`${process.env.API_URL}/anexo-manifestacao/:id`, uploadManifestacao.single('file'), function(req, res) {
    res.status(204).end();
});

// rota de inserção de arquivos de fornecedores
routes.post(`${process.env.API_URL}/anexo-documentos`, uploadDocumento.single('file'), async function(req, res) {
    const nomeArquivo = req.file.filename;
    const destinoArquivo = req.file.destination;
    const caminhoArquivo = destinoArquivo + nomeArquivo;
    const tipoArquivo = req.file.mimetype;
    const proId = req.body.pro_id;
    const tpdId = req.body.tpd_id;

    try {
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });

        const { arq_id, arq_nome, pro_id, man_id, arq_tipo, arq_doc_id, arq_doc_tipo, tpd_id, arq_data, arq_login } = await Arquivo.create({
            arq_id: null,
            arq_nome: nomeArquivo,
            pro_id: proId,
            man_id: null,
            arq_tipo: tipoArquivo,
            arq_doc_id: proId,
            arq_doc_tipo: 'pgto',
            tpd_id: tpdId,
            arq_data: dataHoraAtual.dataValues.data_hora_atual,
            arq_login: 'externo'
        }, {
            logging: false
        });

        // obtem o hash do arquivo
        const hashArquivo = await fileHash(caminhoArquivo);
        // atualiza a tabela de arquivo com o hash do arquivo
        await Arquivo.update(
            { arq_hash: hashArquivo },
            { where: { arq_id: arq_id }, logging: false }
        );
        res.status(204).json({ arq_id, arq_nome, pro_id, man_id, arq_tipo, arq_doc_id, arq_doc_tipo, tpd_id, arq_data, arq_login });
    } catch (erroArquivo) {
        console.log(erroArquivo);
        res.status(400).end();
    }
});

// rotas do cadastro de tipos de manifestacao
routes.get(`${process.env.API_URL}/tipos-manifestacao`, TipoManifestacaoController.index);
routes.get(`${process.env.API_URL}/tipos-manifestacao-combo`, TipoManifestacaoController.combo);
routes.post(`${process.env.API_URL}/tipos-manifestacao`, TipoManifestacaoController.store);
routes.put(`${process.env.API_URL}/tipos-manifestacao/:id`, TipoManifestacaoController.update);
routes.delete(`${process.env.API_URL}/tipos-manifestacao/:id`, TipoManifestacaoController.delete);

// rubrica
routes.post(`${process.env.API_URL}/cria-rubrica`, ManifestacaoController.rubrica);

// rotas do cadastro de setores
routes.get(`${process.env.API_URL}/setores`, SetorController.index);
routes.post(`${process.env.API_URL}/setores`, SetorController.store);
routes.put(`${process.env.API_URL}/setores/:id`, SetorController.update);
routes.delete(`${process.env.API_URL}/setores/:id`, SetorController.delete);

// rotas do cadastro de lotações
routes.get(`${process.env.API_URL}/lotacoes`, LotacaoController.index);
routes.post(`${process.env.API_URL}/lotacoes`, lotacaoValidator, LotacaoController.store);
routes.put(`${process.env.API_URL}/lotacoes/:id`, lotacaoValidator, LotacaoController.update);
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
routes.get(`${process.env.API_URL}/cria-grafo/:id`, ProximoTramiteController.criaGrafo);
routes.get(`${process.env.API_URL}/seleciona-proximo-tramite/:id`, ProximoTramiteController.selecionaProximoTramite);
routes.post(`${process.env.API_URL}/proximos-tramites`, ProximoTramiteController.store);
routes.put(`${process.env.API_URL}/proximos-tramites/:id`, ProximoTramiteController.update);
routes.delete(`${process.env.API_URL}/proximos-tramites/:id`, ProximoTramiteController.delete);

// rotas do cadastro de  trâmites
routes.get(`${process.env.API_URL}/tramites`, TramiteController.index);
routes.get(`${process.env.API_URL}/grid-tramites/:id`, TramiteController.gridTramite);
routes.post(`${process.env.API_URL}/tramites`, TramiteController.store);
routes.post(`${process.env.API_URL}/tramites-averbacao`, TramiteController.criaTramiteAverbacao);
routes.post(`${process.env.API_URL}/tramites-direcionado`, TramiteController.criaTramiteDirecionado);
// rota de envio de processo
routes.get(`${process.env.API_URL}/processo-envia/:id`, TramiteController.processosEnvio);
// rotas de recebimento de processo
routes.get(`${process.env.API_URL}/processo-recebe/:id`, TramiteController.processosRecebimento);
routes.post(`${process.env.API_URL}/tramite-recebe-ou-nega`, TramiteController.recebeOuNega);
// rota de retorno de próximo trâmite
routes.get(`${process.env.API_URL}/proximo-tramite/:id`, TramiteController.proximoTramite);
// rota de retorno de próximo trâmite de decisão de aposentadoria
routes.get(`${process.env.API_URL}/proximo-tramite-decisao-aposentadoria/:id`, TramiteController.proximoTramiteAposentadoriaDecisao);

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

// rotas de criação de pdf
routes.post(`${process.env.API_URL}/arquivo-visto-executiva`, CriaPdfController.criaPdfVistoExecutiva);
routes.post(`${process.env.API_URL}/arquivo-ciencia`, CriaPdfController.criaPdfCiencia);
routes.post(`${process.env.API_URL}/arquivo-ciencia-averbacao`, CriaPdfController.criaPdfCienciaAverbacao);
routes.post(`${process.env.API_URL}/arquivo-ciencia-calculo`, CriaPdfController.criaPdfCienciaCalculo);

// rotas do cadastro de regras de aposentação
routes.get(`${process.env.API_URL}/regras-aposentacao`, RegraAposentacaoController.index);
routes.post(`${process.env.API_URL}/regras-aposentacao`, regraAposentacaoValidator, RegraAposentacaoController.store);
routes.put(`${process.env.API_URL}/regras-aposentacao/:id`, regraAposentacaoValidator, RegraAposentacaoController.update);
routes.delete(`${process.env.API_URL}/regras-aposentacao/:id`, RegraAposentacaoController.delete);

routes.post(`${process.env.API_URL}/tramites-calculo-aposentadoria`, TramiteController.criaTramiteCalculoAposentadoria);

routes.get(`${process.env.API_URL}/proximo-tramite-aposentadoria-calculo/:id/:decisao`, TramiteController.proximoTramiteAposentadoriaCalculo);
routes.get(`${process.env.API_URL}/proximo-tramite-direcionado/:proId/:prxId`, TramiteController.proximoTramiteDirecionado);
routes.get(`${process.env.API_URL}/gera-juntada/:id`, DadosProcessoController.geraJuntada);

// solicitações de fornecedor
routes.get(`${process.env.API_URL}/solicitacoes/:cnpj`, SolicitacaoController.gridSolicitacao);
routes.get(`${process.env.API_URL}/empenhos/:cnpj`, SolicitacaoController.gridEmpenhoFornecedor);
routes.get(`${process.env.API_URL}/lista-documentos`, SolicitacaoController.listaTipoDocumentos);
routes.post(`${process.env.API_URL}/altera-senha`, LoginController.alteraSenha);
routes.get(`${process.env.API_URL}/verifica-fornecedor/:cnpj`, SolicitacaoController.verificaFornecedor);
routes.get(`${process.env.API_URL}/bancos`, SolicitacaoController.listaBancos);
routes.get(`${process.env.API_URL}/fornecedores/:cnpj`, SolicitacaoController.dadosFornecedor);

routes.get(`${process.env.API_URL}/processos-fornecedores/`, DadosProcessoController.processosPagamento);

export default routes;
