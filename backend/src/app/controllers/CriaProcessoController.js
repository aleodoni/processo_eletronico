/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import VDadosPessoa from '../models/VDadosPessoa';
import VFornecedores from '../models/VFornecedores';
import Processo from '../models/Processo';
import ProcessoEmpenho from '../models/ProcessoEmpenho';
import ProcessoNotaFiscal from '../models/ProcessoNotaFiscal';
import ComissaoProcessante from '../models/ComissaoProcessante';
import NomePasPad from '../models/NomePasPad';
import Lotacao from '../models/Lotacao';
import Setor from '../models/Setor';
import Area from '../models/Area';
import ProcessoOrigem from '../models/ProcessoOrigem';
import MembroComissao from '../models/MembroComissao';
import VProcessoOrigem from '../models/VProcessoOrigem';
import VDadosProcesso from '../models/VDadosProcesso';
import VDadosProcessoPasPad from '../models/VDadosProcessoPasPad';
import VMembrosComissao from '../models/VMembrosComissao';
import VDadosMembrosComissao from '../models/VDadosMembrosComissao';
import VDadosLogin from '../models/VDadosLogin';
import TipoProcesso from '../models/TipoProcesso';
import Nodo from '../models/Nodo';
import Arquivo from '../models/Arquivo';
import Autorizacao from '../models/Autorizacao';
import VAutorizacaoArquivo from '../models/VAutorizacaoArquivo';
import DataHoraAtual from '../models/DataHoraAtual';
import CriaCapaService from '../services/pdf/CriaCapaService';
import CriaAutorizacaoService from '../services/pdf/CriaAutorizacaoService';
import Sequelize from 'sequelize';
import ConnectionHelper from '../helpers/ConnectionHelper';
import * as constantes from '../../app/constants/constantes';
import AutorizacaoFornecimento from '../models/AutorizacaoFornecimento';
import { fileHash } from '../util/hash';
import crypto from 'crypto';
const fs = require('fs');

// import AuditoriaController from './AuditoriaController';

class CriaProcessoController {
    async dadosPessoa(req, res) {
        const dadosPessoas = await VDadosPessoa.findAll({
            attributes: [
                'pes_id',
                'pes_celular',
                'pes_cpf',
                'pes_email',
                'fone',
                'pes_matricula',
                'pes_nome'
            ],
            logging: false,
            plain: true,
            where: {
                pes_matricula: req.params.matricula
            }
        });
        return res.json(dadosPessoas);
    }

    async dadosPessoaComissao(req, res) {
        try {
            const dadosPessoasComissao = await VDadosPessoa.findAll({
                attributes: ['pes_matricula', 'pes_nome'],
                logging: false,
                plain: true,
                where: {
                    pes_matricula: req.params.matricula
                }
            });

            if (dadosPessoasComissao !== null) {
                const setorPessoaComissao = await Lotacao.findByPk(
                    dadosPessoasComissao.dataValues.pes_matricula.toString(),
                    { logging: false }
                );
                if (!setorPessoaComissao) {
                    return res
                        .status(400)
                        .json({
                            error: 'Id da pessoa da comissão não encontrada'
                        });
                }

                const loginMembro = setorPessoaComissao.pes_login;
                const idSetor = setorPessoaComissao.set_id;
                const setor = await Setor.findByPk(idSetor, { logging: false });
                if (!setor) {
                    return res
                        .status(400)
                        .json({
                            error: 'Setor da pessoa da comissão não encontrada'
                        });
                }

                const areaId = setor.set_id_area;

                const area = await Area.findByPk(areaId, { logging: false });
                if (!area) {
                    return res
                        .status(400)
                        .json({
                            error: 'Área da pessoa da comissão não encontrada'
                        });
                }

                const areaNome = area.set_nome;

                return res.json({
                    matricula: dadosPessoasComissao.dataValues.pes_matricula,
                    nome: dadosPessoasComissao.dataValues.pes_nome,
                    areaId: areaId,
                    areaNome: areaNome,
                    login: loginMembro
                });
            } else {
                return res.send(null);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async processosDescontoFolhaDeterminacaoJudicial(req, res) {
        const processos = await VDadosProcesso.findAll({
            attributes: [
                'pro_id',
                'pro_codigo',
                'pro_matricula',
                'pro_nome',
                'cpf',
                'tpr_id'
            ],
            logging: false,
            where: {
                tpr_id: constantes.TPR_DESCONTO_PENSAO_ALIMENTICIA
            }
        });
        return res.json(processos);
    }

    async processosRecurso(req, res) {
        const Op = Sequelize.Op;
        const processos = await VDadosProcesso.findAll({
            attributes: [
                'pro_id',
                'pro_codigo',
                'pro_matricula',
                'pro_nome',
                'cpf',
                'tpr_id',
                'tpr_nome'
            ],
            logging: true,
            where: {
                usu_autuador: req.params.usuario,
                tpr_id: {
                    [Op.notIn]: [
                        constantes.TPR_BAIXA_BENS,
                        constantes.TPR_PAD,
                        constantes.TPR_PAS,
                        constantes.TPR_EXECUCAO_DESPESAS,
                        constantes.TPR_RECURSO
                    ]
                },
                usu_finalizador: { [Op.ne]: null }
            },
            order: ['pro_codigo']
        });
        return res.json(processos);
    }

    async processosRecursoPad(req, res) {
        const connection = ConnectionHelper.getConnection();
        const { QueryTypes } = require('sequelize');

        const sql = `select a.pro_id, a.pro_codigo, a.tpr_nome, b.nom_login from spa2.v_dados_processo_pas_pad a, spa2.nome_pas_pad b where a.tpr_id = 15 and a.pro_id = b.pro_id and b.nom_login = '${req.params.usuario}'`;

        const processoRecursoPad = await connection.query(sql, {
            type: QueryTypes.SELECT,
            logging: false
        });
        return res.json(processoRecursoPad);
    }

    async processoOrigem(req, res) {
        const processoOrigem = await VProcessoOrigem.findAll({
            attributes: [
                'pro_id_origem',
                'pro_id_atual',
                'processo_origem',
                'tpr_id',
                'tpr_nome'
            ],
            logging: false,
            where: {
                pro_id_atual: req.params.id
            }
        });
        return res.json(processoOrigem);
    }

    async comboMembrosComissaoProcessante(req, res) {
        const membrosComissaoProcessante = await VMembrosComissao.findAll({
            where: {
                area_id: constantes.COMISSAO_PROCESSANTE,
                mco_ativo: true
            },
            attributes: [
                'mco_id',
                'area_id',
                'mco_matricula',
                'mco_nome',
                'mco_login',
                'set_nome'
            ],
            logging: false
        });
        return res.json(membrosComissaoProcessante);
    }

    async popupMembrosComissao(req, res) {
        const membrosDadosMembrosComissao = await VDadosMembrosComissao.findAll(
            {
                where: {
                    pro_id: req.params.id
                },
                attributes: [
                    'cop_id',
                    'pro_id',
                    'area',
                    'matricula',
                    'nome',
                    'login',
                    'cargo'
                ],
                logging: false
            }
        );
        return res.json(membrosDadosMembrosComissao);
    }

    async store(req, res) {
        try {
            if (req.body.pro_nome === '') {
                req.body.pro_nome = null;
            }
            if (req.body.pro_matricula === '') {
                req.body.pro_matricula = null;
            }
            if (req.body.pro_cpf === '') {
                req.body.pro_cpf = null;
            }
            if (req.body.pro_cnpj === '') {
                req.body.pro_cnpj = null;
            }
            if (req.body.pro_contato_pj === '') {
                req.body.pro_contato_pj = null;
            }
            if (req.body.pro_fone === '') {
                req.body.pro_fone = null;
            }
            if (req.body.pro_celular === '') {
                req.body.pro_celular = null;
            }
            if (req.body.pro_email === '') {
                req.body.pro_email = null;
            }
            if (req.body.pro_assunto === '') {
                req.body.pro_assunto = null;
            }
            if (req.body.usu_finalizador === '') {
                req.body.usu_finalizador = null;
            }
            if (req.body.set_id_finalizador === '') {
                req.body.set_id_finalizador = null;
            }
            if (req.body.area_id_iniciativa === '') {
                req.body.area_id_iniciativa = null;
            }
            if (req.body.pro_com_abono === null) {
                req.body.pro_com_abono = false;
            }

            const dataHoraAtual = await DataHoraAtual.findAll({
                attributes: ['data_hora_atual'],
                logging: false,
                plain: true
            });
            req.body.pro_autuacao = dataHoraAtual.dataValues.data_hora_atual;

            const anoAtual = dataHoraAtual.dataValues.data_hora_atual.substring(
                6,
                10
            );

            // com o tpr_id verifico qual é o nó de início do fluxo e se
            // o processo é pessoal ou não
            const tipoProcesso = await TipoProcesso.findAll({
                attributes: ['tpr_id', 'flu_id', 'tpr_pessoal', 'tpr_nome'],
                logging: false,
                plain: true,
                where: {
                    tpr_id: req.body.tpr_id
                }
            });

            const tipoPessoal = tipoProcesso.dataValues.tpr_pessoal;
            let areaPessoa;
            // se for do tipo pessoal vou procurar pela matrícula ou pelo cpf
            // na view da elotech e na tabela de lotação
            if (tipoPessoal) {
                if (
                    req.body.pro_matricula !== null &&
                    req.body.pro_matricula !== undefined
                ) {
                    // procura na tabela de lotação a área
                    const lotacao = await VDadosLogin.findAll({
                        attributes: ['matricula', 'set_id_area'],
                        logging: false,
                        plain: true,
                        where: {
                            matricula: req.body.pro_matricula.trim()
                        }
                    });
                    areaPessoa = lotacao.dataValues.set_id_area;
                } else if (
                    req.body.pro_cpf !== null &&
                    req.body.pro_cpf !== undefined
                ) {
                    const dadosPessoa = await VDadosPessoa.findAll({
                        attributes: ['pes_matricula', 'pes_cpf'],
                        logging: false,
                        plain: true,
                        where: {
                            pes_cpf: req.body.pro_cpf
                        }
                    });
                    const lotacao = await VDadosLogin.findAll({
                        attributes: ['matricula', 'set_id_area'],
                        logging: false,
                        plain: true,
                        where: {
                            matricula: dadosPessoa.dataValues.pes_matricula.toString()
                        }
                    });
                    areaPessoa = lotacao.dataValues.set_id_area;
                } else {
                    return res
                        .status(400)
                        .json({
                            error: 'Erro ao retornar dados de área de pessoa.'
                        });
                }
                req.body.area_id_iniciativa = areaPessoa;
            }
            const fluId = tipoProcesso.dataValues.flu_id;
            const nodo = await Nodo.findAll({
                attributes: ['nod_id', 'flu_id', 'nod_inicio'],
                logging: false,
                plain: true,
                where: {
                    flu_id: fluId,
                    nod_inicio: true
                }
            });
            if (nodo !== null) {
                req.body.nod_id = nodo.dataValues.nod_id;
            } else {
                return res
                    .status(400)
                    .json({
                        error: 'Processo sem fluxo. Cadastre um fluxo primeiro.'
                    });
            }
            console.log(JSON.stringify(req.body, null, 4));
            const {
                pro_id,
                tpr_id,
                pro_iniciativa,
                pro_nome,
                pro_matricula,
                pro_cpf,
                pro_cnpj,
                pro_contato_pj,
                pro_fone,
                pro_celular,
                pro_email,
                pro_encerramento,
                pro_assunto,
                usu_autuador,
                set_id_autuador,
                area_id,
                pro_ultimo_tramite,
                usu_finalizador,
                set_id_finalizador,
                nod_id,
                pro_tipo_iniciativa,
                area_id_iniciativa,
                pro_autuacao,
                pro_recurso,
                pro_com_abono,
                pro_num_com_abono
            } = await Processo.create(req.body, {
                logging: false
            });

            // cria a pasta com o id do processo(id+ano)
            fs.mkdirSync(process.env.CAMINHO_ARQUIVOS_PROCESSO + pro_id + anoAtual);
            const caminhoProcesso =
                process.env.CAMINHO_ARQUIVOS_PROCESSO + pro_id + anoAtual;
            // auditoria de inserção
            // AuditoriaController.audita(req.body, req, 'I', pro_id);
            //
            // se tiver revisão de desconto de pensão alimentícia grava na tabela
            // de processo_origem
            if (req.body.pro_pensao !== null && req.body.pro_pensao !== undefined) {
                const processoOrigem = await ProcessoOrigem.create(
                    { pro_id_pai: req.body.pro_pensao, pro_id_atual: pro_id },
                    {
                        logging: false
                    }
                );
                console.log(JSON.stringify(processoOrigem, null, 4));
            }
            // se for um recurso de processo grava na tabela de processo_origem
            if (req.body.pro_recurso === true) {
                const processoOrigem = await ProcessoOrigem.create(
                    {
                        pro_id_pai: req.body.pro_codigo_recurso,
                        pro_id_atual: pro_id
                    },
                    {
                        logging: false
                    }
                );
                console.log(JSON.stringify(processoOrigem, null, 4));
            }
            // grava na tabela arquivo a capa do processo
            const strHexa = crypto.randomBytes(16).toString('hex');
            const nomeArquivo = strHexa + '-capa-' + pro_id + anoAtual + '.pdf';

            const arquivo = await Arquivo.create(
                {
                    arq_id: null,
                    arq_nome: nomeArquivo,
                    pro_id: pro_id,
                    man_id: null,
                    arq_tipo: 'application/pdf',
                    arq_doc_id: pro_id,
                    arq_doc_tipo: 'capa-processo',
                    tpd_id: constantes.TPD_CAPA_PROCESSO,
                    arq_data: dataHoraAtual.dataValues.data_hora_atual,
                    arq_login: usu_autuador
                },
                {
                    logging: false
                }
            );

            // cria o arquivo pdf da capa
            const criaCapa = new CriaCapaService(Processo);
            const caminhoArquivoCapa = await criaCapa.capaProcesso(
                arquivo.arq_id,
                pro_id,
                anoAtual,
                tipoProcesso.dataValues.tpr_nome,
                caminhoProcesso,
                nomeArquivo
            );
            // obtem o hash do arquivo
            const hashCapa = await fileHash(caminhoArquivoCapa);
            // atualiza a tabela de arquivo com o hash do arquivo
            await Arquivo.update(
                { arq_hash: hashCapa },
                { where: { arq_id: arquivo.arq_id }, logging: false }
            );

            return res.json({
                pro_id,
                tpr_id,
                pro_iniciativa,
                pro_nome,
                pro_matricula,
                pro_cpf,
                pro_cnpj,
                pro_contato_pj,
                pro_fone,
                pro_celular,
                pro_email,
                pro_encerramento,
                pro_assunto,
                usu_autuador,
                set_id_autuador,
                area_id,
                pro_ultimo_tramite,
                usu_finalizador,
                set_id_finalizador,
                nod_id,
                pro_tipo_iniciativa,
                area_id_iniciativa,
                pro_autuacao,
                pro_recurso,
                pro_com_abono,
                pro_num_com_abono
            });
        } catch (erroProcesso) {
            console.log(erroProcesso);
            return null;
        }
    }

    async criaPasPad(req, res) {
        if (req.body.pro_assunto === '') {
            req.body.pro_assunto = null;
        }
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });
        req.body.pro_autuacao = dataHoraAtual.dataValues.data_hora_atual;

        const anoAtual = dataHoraAtual.dataValues.data_hora_atual.substring(
            6,
            10
        );

        // com o tpr_id verifico qual é o nó de início do fluxo
        const tipoProcesso = await TipoProcesso.findAll({
            attributes: ['tpr_id', 'flu_id', 'tpr_nome'],
            logging: false,
            plain: true,
            where: {
                tpr_id: req.body.tpr_id
            }
        });
        const nodo = await Nodo.findAll({
            attributes: ['nod_id', 'flu_id', 'nod_inicio'],
            logging: false,
            plain: true,
            where: {
                flu_id: tipoProcesso.dataValues.flu_id,
                nod_inicio: true
            }
        });

        if (nodo !== null) {
            req.body.nod_id = nodo.dataValues.nod_id;
        } else {
            return res
                .status(400)
                .json({
                    error: 'Processo sem fluxo. Cadastre um fluxo primeiro.'
                });
        }
        const {
            pro_id,
            tpr_id,
            pro_iniciativa,
            pro_nome,
            pro_matricula,
            pro_cpf,
            pro_fone,
            pro_celular,
            pro_email,
            pro_assunto,
            usu_autuador,
            set_id_autuador,
            area_id,
            nod_id,
            pro_tipo_iniciativa,
            area_id_iniciativa,
            pro_autuacao,
            pro_recurso
        } = await Processo.create(req.body, {
            logging: false
        });

        // cria a pasta com o id do processo(id+ano)
        fs.mkdirSync(process.env.CAMINHO_ARQUIVOS_PROCESSO + pro_id + anoAtual);
        const caminhoProcesso =
                process.env.CAMINHO_ARQUIVOS_PROCESSO + pro_id + anoAtual;
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', pro_id);
        //
        // se for PAD e tiver processo PAD grava na tabela de processo_origem
        if (tipoProcesso.dataValues.tpr_id === constantes.TPR_PAD) {
            if (req.body.pro_codigo_origem !== '') {
                const localizaProcessoOrigem = await VDadosProcessoPasPad.findAll(
                    {
                        attributes: ['pro_id', 'pro_codigo'],
                        logging: false,
                        plain: true,
                        where: {
                            pro_codigo: req.body.pro_codigo_origem,
                            tpr_id: 16
                        }
                    }
                );

                if (localizaProcessoOrigem !== null) {
                    const processoOrigem = await ProcessoOrigem.create(
                        {
                            pro_id_pai:
                                localizaProcessoOrigem.dataValues.pro_id,
                            pro_id_atual: pro_id
                        },
                        {
                            logging: false
                        }
                    );
                    console.log(JSON.stringify(processoOrigem, null, 4));
                } else {
                    return res
                        .status(400)
                        .json({
                            error:
                                'Processo de origem inexistente. Insira um código de processo válido.'
                        });
                }
            }
        }

        // grava na tabela spa2.nome_pas_pad
        const arrayNomes = req.body.nomes_processo;
        if (arrayNomes.length > 0) {
            for (const key in arrayNomes) {
                try {
                    await NomePasPad.create(
                        {
                            nom_id: null,
                            nom_matricula: arrayNomes[key].matricula,
                            nom_nome: arrayNomes[key].nome,
                            nom_area_id: arrayNomes[key].areaId,
                            nom_area_nome: arrayNomes[key].areaNome,
                            pro_id: pro_id,
                            nom_login: arrayNomes[key].login
                        },
                        {
                            logging: false
                        }
                    );
                } catch (e) {
                    console.log(e);
                }
            }
        }
        // grava na tabela spa2.comissao_processante
        const arrayMembros = req.body.membros_comissao;
        for (const key in arrayMembros) {
            try {
                // localiza o membro
                const membroComissao = await MembroComissao.findAll({
                    attributes: ['mco_id', 'mco_matricula'],
                    logging: false,
                    plain: true,
                    where: {
                        mco_matricula: arrayMembros[key].matricula.toString()
                    }
                });
                let cargo = false;
                if (arrayMembros[key].bCargo) {
                    cargo = true;
                }
                await ComissaoProcessante.create(
                    {
                        cop_id: null,
                        mco_id: membroComissao.dataValues.mco_id,
                        pro_id: pro_id,
                        cop_presidente: cargo
                    },
                    {
                        logging: false
                    }
                );
            } catch (e) {
                console.log(e);
            }
        }
        // grava na tabela arquivo a capa do processo
        const strHexa = crypto.randomBytes(16).toString('hex');
        const nomeArquivo = strHexa + '-capa-' + pro_id + anoAtual + '.pdf';

        const arquivo = await Arquivo.create(
            {
                arq_id: null,
                arq_nome: nomeArquivo,
                pro_id: pro_id,
                man_id: null,
                arq_tipo: 'application/pdf',
                arq_doc_id: pro_id,
                arq_doc_tipo: 'capa-processo',
                tpd_id: constantes.TPD_CAPA_PROCESSO,
                arq_data: dataHoraAtual.dataValues.data_hora_atual,
                arq_login: usu_autuador
            },
            {
                logging: false
            }
        );

        // cria o arquivo pdf da capa
        const criaCapa = new CriaCapaService(Processo);
        const caminhoArquivoCapa = await criaCapa.capaProcesso(
            arquivo.arq_id,
            pro_id,
            anoAtual,
            tipoProcesso.dataValues.tpr_nome,
            caminhoProcesso,
            nomeArquivo
        );
        // obtem o hash do arquivo
        const hashCapa = await fileHash(caminhoArquivoCapa);
        // atualiza a tabela de arquivo com o hash do arquivo
        await Arquivo.update(
            { arq_hash: hashCapa },
            { where: { arq_id: arquivo.arq_id }, logging: false }
        );

        return res.json({
            pro_id,
            tpr_id,
            pro_iniciativa,
            pro_nome,
            pro_matricula,
            pro_cpf,
            pro_fone,
            pro_celular,
            pro_email,
            pro_assunto,
            usu_autuador,
            set_id_autuador,
            area_id,
            nod_id,
            pro_tipo_iniciativa,
            area_id_iniciativa,
            pro_autuacao,
            pro_recurso
        });
    }

    async encerra(req, res) {
        const processo = await Processo.findByPk(req.params.id, {
            logging: false
        });
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });

        if (!processo) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }

        const tipoProcesso = await TipoProcesso.findByPk(processo.tpr_id, {
            logging: false
        });

        if (!tipoProcesso) {
            return res
                .status(400)
                .json({ error: 'Tipo de processo não encontrado' });
        }

        const prazo = tipoProcesso.tpr_prazo_recurso;
        await processo.update(
            {
                pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                usu_finalizador: req.body.usuario,
                set_id_finalizador: req.body.areaId
            },
            { logging: false }
        );

        return res.json(prazo);
    }

    async ciencia(req, res) {
        const processo = await Processo.findByPk(req.params.id, {
            logging: false
        });
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });

        if (!processo) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }

        if (req.body.decisao === 'Concedido') {
            await processo.update(
                {
                    pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                    usu_finalizador: req.body.usuario,
                    set_id_finalizador: req.body.areaId
                },
                { logging: false }
            );
        }

        if (req.body.decisao === 'Negado') {
            await processo.update(
                {
                    pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                    usu_finalizador: req.body.usuario,
                    set_id_finalizador: req.body.areaId,
                    pro_recurso: true
                },
                { logging: false }
            );
        }
        return res.json(processo);
    }

    async criaProcessoPagamento(req, res) {
        const dia = req.body.aut_data_expedicao_nf.split('/')[0];
        const mes = req.body.aut_data_expedicao_nf.split('/')[1];
        const ano = req.body.aut_data_expedicao_nf.split('/')[2];
        const dataNF =
            ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2);

        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });

        const anoAtual = dataHoraAtual.dataValues.data_hora_atual.substring(
            6,
            10
        );

        const fornecedor = await VFornecedores.findAll({
            where: {
                for_cnpj_cpf: req.body.pro_cnpj
            },
            logging: false,
            plain: true
        });

        if (fornecedor === null) {
            return res.status(400).json({ erro: 'Fornecedor não encontrado' });
        }

        req.body.pro_autuacao = dataHoraAtual.dataValues.data_hora_atual;

        const nodo = await Nodo.findAll({
            attributes: ['nod_id', 'flu_id', 'nod_inicio'],
            logging: false,
            plain: true,
            where: {
                flu_id: constantes.FLU_EXECUCAO_DESPESAS,
                nod_inicio: true
            }
        });

        if (nodo !== null) {
            req.body.nod_id = nodo.dataValues.nod_id;
        } else {
            return res
                .status(400)
                .json({
                    error: 'Processo sem fluxo. Cadastre um fluxo primeiro.'
                });
        }
        try {
            const {
                pro_id,
                tpr_id,
                pro_iniciativa,
                pro_nome,
                pro_matricula,
                pro_cnpj,
                pro_fone,
                pro_celular,
                pro_email,
                pro_assunto,
                usu_autuador,
                set_id_autuador,
                area_id,
                nod_id,
                pro_tipo_iniciativa,
                area_id_iniciativa,
                pro_autuacao,
                pro_recurso,
                pro_enviado_externo,
                pro_ip_externo
            } = await Processo.create(req.body, {
                logging: false
            });
            // auditoria de inserção
            // AuditoriaController.audita(req.body, req, 'I', pro_id);
            //

            // cria a pasta com o id do processo(id+ano)
            fs.mkdirSync(
                process.env.CAMINHO_ARQUIVOS_PROCESSO + pro_id + anoAtual
            );
            const caminhoProcesso =
                process.env.CAMINHO_ARQUIVOS_PROCESSO + pro_id + anoAtual;

            // grava na tabela arquivo a capa do processo
            const arquivoCapa = await Arquivo.create(
                {
                    arq_id: null,
                    arq_nome: 'capa-' + pro_id + '.pdf',
                    pro_id: pro_id,
                    man_id: null,
                    arq_tipo: 'application/pdf',
                    arq_doc_id: pro_id,
                    arq_doc_tipo: 'capa-processo',
                    tpd_id: constantes.TPD_CAPA_PROCESSO,
                    arq_data: dataHoraAtual.dataValues.data_hora_atual,
                    arq_login: usu_autuador
                },
                {
                    logging: false
                }
            );

            // cria o arquivo pdf da capa
            const criaCapa = new CriaCapaService(Processo);
            const caminhoArquivoCapa = await criaCapa.capaProcesso(
                arquivoCapa.arq_id,
                pro_id,
                'Execução de despesas',
                caminhoProcesso
            );
            // obtem o hash do arquivo
            const hashCapa = await fileHash(caminhoArquivoCapa);
            // atualiza a tabela de arquivo com o hash do arquivo
            await Arquivo.update(
                { arq_hash: hashCapa },
                { where: { arq_id: arquivoCapa.arq_id }, logging: false }
            );

            // cria a autorização
            const autorizacao = await AutorizacaoFornecimento.create(
                {
                    aut_id: null,
                    for_id: fornecedor.dataValues.for_id,
                    aut_referencia: req.body.aut_referencia,
                    aut_nf: req.body.aut_nf,
                    aut_data_expedicao_nf: dataNF,
                    aut_valor: req.body.aut_valor,
                    ban_id: req.body.ban_id,
                    aut_ban_agencia: req.body.aut_ban_agencia,
                    aut_ban_conta_corrente: req.body.aut_ban_conta_corrente,
                    aut_data_cadastro: dataHoraAtual.dataValues.data_hora_atual,
                    pro_id: pro_id
                },
                {
                    logging: false
                }
            );

            if (autorizacao === null) {
                return res
                    .status(400)
                    .json({ erro: 'Não foi possível criar a autorização' });
            }
            req.body.aut_id = autorizacao.aut_id;
            // grava na tabela arquivo a autorização
            const arquivoAutorizacao = await Arquivo.create(
                {
                    arq_id: null,
                    arq_nome: 'autorizacao-' + autorizacao.aut_id + '.pdf',
                    pro_id: pro_id,
                    man_id: null,
                    arq_tipo: 'application/pdf',
                    arq_doc_id: autorizacao.aut_id,
                    arq_doc_tipo: 'aut-pgto',
                    tpd_id: constantes.TPD_AUTORIZACAO_PAGAMENTO,
                    arq_data: dataHoraAtual.dataValues.data_hora_atual,
                    arq_login: 'externo'
                },
                {
                    logging: false
                }
            );

            // cria o arquivo pdf da autorização
            const criaAutorizacao = new CriaAutorizacaoService(
                Autorizacao,
                Arquivo,
                VAutorizacaoArquivo
            );
            const caminhoArquivoAutorizacao = await criaAutorizacao.criaAutorizacao(
                req.body.aut_id,
                arquivoAutorizacao.arq_id,
                caminhoProcesso,
                req.body.documentos
            );

            // obtem o hash do arquivo
            const hashAutorizacao = await fileHash(caminhoArquivoAutorizacao);
            await Arquivo.update(
                { arq_hash: hashAutorizacao },
                { where: { arq_id: arquivoAutorizacao.arq_id }, logging: false }
            );

            // insere o empenho e o processo na tabela processo_empenho
            ProcessoEmpenho.create(
                {
                    pen_id: null,
                    pro_id_pai: pro_id,
                    pen_empenho: req.body.empenho
                },
                {
                    logging: false
                }
            );
            //

            // insere a nota fiscal e o processo na tabela processo_nota_fiscal
            ProcessoNotaFiscal.create(
                {
                    pnf_id: null,
                    pro_id_pai: pro_id,
                    pnf_nota_fiscal: req.body.aut_nf
                },
                {
                    logging: false
                }
            );
            //

            return res.json({
                pro_id,
                tpr_id,
                pro_iniciativa,
                pro_nome,
                pro_matricula,
                pro_cnpj,
                pro_fone,
                pro_celular,
                pro_email,
                pro_assunto,
                usu_autuador,
                set_id_autuador,
                area_id,
                nod_id,
                pro_tipo_iniciativa,
                area_id_iniciativa,
                pro_autuacao,
                pro_recurso,
                pro_enviado_externo,
                pro_ip_externo,
                ano: anoAtual
            });
        } catch (erroProcesso) {
            console.log(erroProcesso);
            return res.status(400).json({ error: 'Erro ao criar processo.' });
        }
    }

    async criaProcessoPagamentoInterno(req, res) {
        const dia = req.body.aut_data_expedicao_nf.split('/')[0];
        const mes = req.body.aut_data_expedicao_nf.split('/')[1];
        const ano = req.body.aut_data_expedicao_nf.split('/')[2];
        const dataNF =
            ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2);

        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });

        const anoAtual = dataHoraAtual.dataValues.data_hora_atual.substring(
            6,
            10
        );

        const fornecedor = await VFornecedores.findAll({
            where: {
                for_id: req.body.for_id
            },
            logging: false,
            plain: true
        });

        if (fornecedor === null) {
            return res.status(400).json({ erro: 'Fornecedor não encontrado' });
        }

        req.body.pro_autuacao = dataHoraAtual.dataValues.data_hora_atual;
        req.body.pro_nome = fornecedor.dataValues.for_nome;
        req.body.pro_cnpj = fornecedor.dataValues.for_cnpj_cpf;

        const nodo = await Nodo.findAll({
            attributes: ['nod_id', 'flu_id', 'nod_inicio'],
            logging: false,
            plain: true,
            where: {
                flu_id: constantes.FLU_EXECUCAO_DESPESAS,
                nod_inicio: true
            }
        });

        if (nodo !== null) {
            req.body.nod_id = nodo.dataValues.nod_id;
        } else {
            return res
                .status(400)
                .json({
                    error: 'Processo sem fluxo. Cadastre um fluxo primeiro.'
                });
        }
        try {
            const {
                pro_id,
                pro_codigo,
                tpr_id,
                pro_iniciativa,
                pro_nome,
                pro_matricula,
                pro_cnpj,
                pro_fone,
                pro_celular,
                pro_email,
                pro_assunto,
                usu_autuador,
                set_id_autuador,
                area_id,
                nod_id,
                pro_tipo_iniciativa,
                area_id_iniciativa,
                pro_autuacao,
                pro_recurso,
                pro_enviado_externo,
                pro_ip_externo,
                pro_processo_pai
            } = await Processo.create(req.body, {
                logging: false
            });
            // auditoria de inserção
            // AuditoriaController.audita(req.body, req, 'I', pro_id);
            //

            // cria a pasta com o id do processo(id+ano)
            fs.mkdirSync(
                process.env.CAMINHO_ARQUIVOS_PROCESSO + pro_id + anoAtual
            );
            const caminhoProcesso =
                process.env.CAMINHO_ARQUIVOS_PROCESSO + pro_id + anoAtual;

            // grava na tabela arquivo a capa do processo
            const arquivoCapa = await Arquivo.create(
                {
                    arq_id: null,
                    arq_nome: 'capa-' + pro_id + '.pdf',
                    pro_id: pro_id,
                    man_id: null,
                    arq_tipo: 'application/pdf',
                    arq_doc_id: pro_id,
                    arq_doc_tipo: 'capa-processo',
                    tpd_id: constantes.TPD_CAPA_PROCESSO,
                    arq_data: dataHoraAtual.dataValues.data_hora_atual,
                    arq_login: usu_autuador
                },
                {
                    logging: false
                }
            );

            // cria o arquivo pdf da capa
            const criaCapa = new CriaCapaService(Processo);
            const caminhoArquivoCapa = await criaCapa.capaProcesso(
                arquivoCapa.arq_id,
                pro_id,
                'Execução de despesas',
                caminhoProcesso
            );
            // obtem o hash do arquivo
            const hashCapa = await fileHash(caminhoArquivoCapa);
            // atualiza a tabela de arquivo com o hash do arquivo
            await Arquivo.update(
                { arq_hash: hashCapa },
                { where: { arq_id: arquivoCapa.arq_id }, logging: false }
            );

            if (req.body.aut_fatura_boleto === 'true') {
                req.body.ban_id = null;
                req.body.aut_ban_agencia = null;
                req.body.aut_ban_conta_corrente = null;
            }

            // cria a autorização
            const autorizacao = await AutorizacaoFornecimento.create(
                {
                    aut_id: null,
                    for_id: req.body.for_id,
                    aut_referencia: req.body.aut_referencia,
                    aut_nf: req.body.aut_nf,
                    aut_data_expedicao_nf: dataNF,
                    aut_valor: req.body.aut_valor,
                    ban_id: req.body.ban_id,
                    aut_ban_agencia: req.body.aut_ban_agencia,
                    aut_ban_conta_corrente: req.body.aut_ban_conta_corrente,
                    aut_data_cadastro: dataHoraAtual.dataValues.data_hora_atual,
                    pro_id: pro_id,
                    aut_fatura_boleto: req.body.aut_fatura_boleto
                },
                {
                    logging: false
                }
            );

            if (autorizacao === null) {
                return res
                    .status(400)
                    .json({ erro: 'Não foi possível criar a autorização' });
            }
            req.body.aut_id = autorizacao.aut_id;
            // grava na tabela arquivo a autorização
            const arquivoAutorizacao = await Arquivo.create(
                {
                    arq_id: null,
                    arq_nome: 'requerimento-' + autorizacao.aut_id + '.pdf',
                    pro_id: pro_id,
                    man_id: null,
                    arq_tipo: 'application/pdf',
                    arq_doc_id: autorizacao.aut_id,
                    arq_doc_tipo: 'aut-pgto',
                    tpd_id: constantes.TPD_AUTORIZACAO_PAGAMENTO,
                    arq_data: dataHoraAtual.dataValues.data_hora_atual,
                    arq_login: usu_autuador
                },
                {
                    logging: false
                }
            );

            // cria o arquivo pdf da autorização
            const criaAutorizacao = new CriaAutorizacaoService(
                Autorizacao,
                Arquivo,
                VAutorizacaoArquivo
            );
            const caminhoArquivoAutorizacao = await criaAutorizacao.criaAutorizacao(
                req.body.aut_id,
                arquivoAutorizacao.arq_id,
                caminhoProcesso,
                req.body.documentos
            );

            // obtem o hash do arquivo
            const hashAutorizacao = await fileHash(caminhoArquivoAutorizacao);
            await Arquivo.update(
                { arq_hash: hashAutorizacao },
                { where: { arq_id: arquivoAutorizacao.arq_id }, logging: false }
            );

            // insere o empenho e o processo na tabela processo_empenho
            /*
            ProcessoEmpenho.create({
                pen_id: null,
                pro_id_pai: pro_id,
                pen_empenho: req.body.empenho
            }, {
                logging: false
            });
            */
            //

            // insere a nota fiscal e o processo na tabela processo_nota_fiscal
            /*
            ProcessoNotaFiscal.create({
                pnf_id: null,
                pro_id_pai: pro_id,
                pnf_nota_fiscal: req.body.aut_nf
            }, {
                logging: false
            });
            */
            //

            return res.json({
                pro_id,
                pro_codigo,
                tpr_id,
                pro_iniciativa,
                pro_nome,
                pro_matricula,
                pro_cnpj,
                pro_fone,
                pro_celular,
                pro_email,
                pro_assunto,
                usu_autuador,
                set_id_autuador,
                area_id,
                nod_id,
                pro_tipo_iniciativa,
                area_id_iniciativa,
                pro_autuacao,
                pro_recurso,
                pro_enviado_externo,
                pro_ip_externo,
                pro_processo_pai,
                ano: anoAtual,
                aut_id: req.body.aut_id
            });
        } catch (erroProcesso) {
            console.log(erroProcesso);
            return res.status(400).json({ error: 'Erro ao criar processo.' });
        }
    }

    async editaProcessoPagamentoInterno(req, res) {
        const transaction = await ConnectionHelper.getTransaction();
        try {
            const processo = await Processo.findAll({
                attributes: ['pro_id', 'pro_ano'],
                logging: false,
                plain: true,
                where: {
                    pro_id: req.params.id
                }
            });
            if (!processo) {
                return res
                    .status(400)
                    .json({ error: 'Processo não encontrado' });
            }

            const caminhoProcesso =
                process.env.CAMINHO_ARQUIVOS_PROCESSO +
                processo.dataValues.pro_id +
                processo.dataValues.pro_ano;

            await processo.update(
                {
                    pro_processo_pai: req.body.pro_processo_pai
                },
                { logging: false },
                { transaction: transaction }
            );

            const autorizacao = await AutorizacaoFornecimento.findByPk(
                req.body.aut_id,
                { logging: false }
            );
            if (!autorizacao) {
                return res
                    .status(400)
                    .json({ error: 'Autorizacao não encontrada' });
            }

            const dia = req.body.aut_data_expedicao_nf.split('/')[0];
            const mes = req.body.aut_data_expedicao_nf.split('/')[1];
            const ano = req.body.aut_data_expedicao_nf.split('/')[2];
            const dataNF =
                ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2);

            await autorizacao.update(
                {
                    aut_referencia: req.body.aut_referencia,
                    aut_nf: req.body.aut_nf,
                    aut_data_expedicao_nf: dataNF,
                    aut_valor: req.body.aut_valor,
                    ban_id: req.body.ban_id,
                    aut_ban_agencia: req.body.aut_ban_agencia,
                    aut_ban_conta_corrente: req.body.aut_ban_conta_corrente,
                    aut_fatura_boleto: req.body.aut_fatura_boleto
                },
                { logging: false },
                { transaction: transaction }
            );

            // seleciona o arquivo da autorização(bd)
            const arquivoAutorizacao = await Arquivo.findAll({
                attributes: ['arq_id', 'pro_id', 'tpd_id'],
                logging: false,
                plain: true,
                where: {
                    tpd_id: constantes.TPD_AUTORIZACAO_PAGAMENTO,
                    pro_id: req.params.id
                }
            });
            // atualiza o arquivo pdf da autorização
            const criaAutorizacao = new CriaAutorizacaoService(
                Autorizacao,
                Arquivo,
                VAutorizacaoArquivo
            );
            const caminhoArquivoAutorizacao = await criaAutorizacao.criaAutorizacao(
                req.body.aut_id,
                arquivoAutorizacao.dataValues.arq_id,
                caminhoProcesso,
                req.body.documentos
            );

            // obtem o hash do arquivo
            const hashAutorizacao = await fileHash(caminhoArquivoAutorizacao);
            await Arquivo.update(
                { arq_hash: hashAutorizacao },
                {
                    where: { arq_id: arquivoAutorizacao.dataValues.arq_id },
                    logging: false
                }
            );

            await transaction.commit();
            return res.json(processo);
        } catch (error) {
            await transaction.rollback();
            console.log(error);
        }
    }

    async criaProcessoLicitacao(req, res) {
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });

        const anoAtual = dataHoraAtual.dataValues.data_hora_atual.substring(
            6,
            10
        );

        req.body.pro_autuacao = dataHoraAtual.dataValues.data_hora_atual;
        const nodo = await Nodo.findAll({
            attributes: ['nod_id', 'flu_id', 'nod_inicio'],
            logging: false,
            plain: true,
            where: {
                flu_id: constantes.FLU_AQUISICAO_BENS,
                nod_inicio: true
            }
        });

        if (nodo !== null) {
            req.body.nod_id = nodo.dataValues.nod_id;
        } else {
            return res
                .status(400)
                .json({
                    error: 'Processo sem fluxo. Cadastre um fluxo primeiro.'
                });
        }
        try {
            const {
                pro_id,
                pro_codigo,
                tpr_id,
                pro_iniciativa,
                pro_nome,
                pro_assunto,
                usu_autuador,
                set_id_autuador,
                area_id,
                nod_id,
                pro_tipo_iniciativa,
                area_id_iniciativa,
                pro_autuacao
            } = await Processo.create(req.body, {
                logging: false
            });

            // cria a pasta com o id do processo(id+ano)
            fs.mkdirSync(
                process.env.CAMINHO_ARQUIVOS_PROCESSO + pro_id + anoAtual
            );
            const caminhoProcesso =
                process.env.CAMINHO_ARQUIVOS_PROCESSO + pro_id + anoAtual;

            // grava na tabela arquivo a capa do processo
            const arquivoCapa = await Arquivo.create(
                {
                    arq_id: null,
                    arq_nome: 'capa-' + pro_id + '.pdf',
                    pro_id: pro_id,
                    man_id: null,
                    arq_tipo: 'application/pdf',
                    arq_doc_id: pro_id,
                    arq_doc_tipo: 'capa-processo',
                    tpd_id: constantes.TPD_CAPA_PROCESSO,
                    arq_data: dataHoraAtual.dataValues.data_hora_atual,
                    arq_login: usu_autuador
                },
                {
                    logging: false
                }
            );

            // cria o arquivo pdf da capa
            const criaCapa = new CriaCapaService(Processo);
            const caminhoArquivoCapa = await criaCapa.capaProcesso(
                arquivoCapa.arq_id,
                pro_id,
                'Aquisição de Bens e/ou Contratação de Serviços',
                caminhoProcesso
            );
            // obtem o hash do arquivo
            const hashCapa = await fileHash(caminhoArquivoCapa);
            // atualiza a tabela de arquivo com o hash do arquivo
            await Arquivo.update(
                { arq_hash: hashCapa },
                { where: { arq_id: arquivoCapa.arq_id }, logging: false }
            );

            return res.json({
                pro_id,
                pro_codigo,
                tpr_id,
                pro_iniciativa,
                pro_nome,
                pro_assunto,
                usu_autuador,
                set_id_autuador,
                area_id,
                nod_id,
                pro_tipo_iniciativa,
                area_id_iniciativa,
                pro_autuacao,
                ano: anoAtual,
                aut_id: req.body.aut_id
            });
        } catch (erroProcesso) {
            console.log(erroProcesso);
            return res.status(400).json({ error: 'Erro ao criar processo de licitação.' });
        }
    }
}

export default new CriaProcessoController();
