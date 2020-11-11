/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Tramite from '../models/Tramite';
import Manifestacao from '../models/Manifestacao';
import Setor from '../models/Setor';
import VTramite from '../models/VTramite';
import VProcessoEnvia from '../models/VProcessoEnvia';
import ProximoTramite from '../models/ProximoTramite';
import RazaoTramite from '../models/RazaoTramite';
import VProcessoRecebe from '../models/VProcessoRecebe';
import VAreaTramitacaoPessoal from '../models/VAreaTramitacaoPessoal';
import Nodo from '../models/Nodo';
import Area from '../models/Area';
import VSetor from '../models/VSetor';
import Processo from '../models/Processo';
import TipoProcesso from '../models/TipoProcesso';
import DataHoraAtual from '../models/DataHoraAtual';
import VProximoTramiteNormal from '../models/VProximoTramiteNormal';
import Sequelize from 'sequelize';
import * as constantes from '../../app/constants/constantes';
// import { StandardFontValues } from 'pdf-lib';
// import AuditoriaController from './AuditoriaController';

class TramiteController {
    async index(req, res) {
        const tramites = await Tramite.findAll({
            order: ['tra_id'],
            attributes: [
                'pro_id',
                'pro_codigo',
                'area_id',
                'tpr_nome',
                'raz_id',
                'login_envia',
                'area_id_envia',
                'area_id_recebe',
                'nod_id_envia',
                'nod_id_recebe',
                'tra_inicial'
            ],
            logging: false
        });
        return res.json(tramites);
    }

    async gridTramite(req, res) {
        const tramites = await VTramite.findAll({
            attributes: [
                'seq',
                'tra_id',
                'envio',
                'login_envia',
                'setor_envia',
                'setor_recebe'
            ],
            where: {
                pro_id: req.params.id
            },
            logging: false
        });
        return res.json(tramites);
    }

    async processosEnvio(req, res) {
        const processos = await VProcessoEnvia.findAll({
            attributes: ['pro_id', 'pro_codigo', 'area_id', 'tpr_nome'],
            where: {
                area_id: req.params.id
            },
            logging: false
        });
        return res.json(processos);
    }

    async processosRecebimento(req, res) {
        const processos = await VProcessoRecebe.findAll({
            attributes: [
                'pro_id',
                'pro_codigo',
                'tra_envio',
                'login_envia',
                'tpr_nome'
            ],
            where: {
                area_id_pendente: req.params.id
            },
            logging: false
        });
        return res.json(processos);
    }

    async proximoTramite(req, res) {
        const processo = await Processo.findAll({
            where: {
                pro_id: req.params.id
            },
            attributes: [
                'pro_id',
                'nod_id',
                'tpr_id',
                'area_id_iniciativa',
                'usu_autuador',
                'pro_nome'
            ],
            logging: false,
            plain: true
        });
        const areaProcesso = processo.dataValues.area_id_iniciativa;
        const tprId = processo.dataValues.tpr_id;
        const proNome = processo.dataValues.pro_nome;
        // 05/05/2020 - tenho que pegar o próximo
        const tipoProcesso = await TipoProcesso.findAll({
            where: {
                tpr_id: tprId
            },
            attributes: ['tpr_id', 'tpr_pessoal'],
            logging: true,
            plain: true
        });

        const proximo = await VProximoTramiteNormal.findAll({
            attributes: [
                'pro_id',
                'prx_id',
                'nod_id',
                'nod_id_proximo',
                'raz_id',
                'raz_nome',
                'set_id',
                'set_nome',
                'set_sigla'
            ],
            where: {
                pro_id: req.params.id
            },
            logging: true
        });
        // console.log(JSON.stringify(proximo, null, 4));
        const Op = Sequelize.Op;
        const areas = await Area.findAll({
            order: ['set_nome'],
            attributes: ['set_id', 'set_nome'],
            where: {
                set_id: {
                    [Op.notIn]: [
                        constantes.TODA_AREA,
                        constantes.TODO_GABINETE
                    ]
                }
            },
            logging: false
        });
        const combo = [];
        let contador = 1;
        for (const p in proximo) {
            if (proximo[p].set_id !== constantes.TODA_AREA) {
                combo.push({
                    id: contador,
                    prx_id: proximo[p].prx_id,
                    set_id: proximo[p].set_id,
                    set_nome: proximo[p].set_nome,
                    raz_nome: proximo[p].raz_nome
                });
                contador = contador + 1;
            } else {
                // aqui vai verificar se é ultimo nó e o tipo de processo é pessoal,
                // se for vai tramitar para o setor de quem abriu o processo
                const nodoProximo = await Nodo.findAll({
                    where: {
                        nod_id: proximo[p].nod_id_proximo
                    },
                    attributes: ['nod_id', 'nod_fim', 'nod_interessado'],
                    logging: false,
                    plain: true
                });
                console.log(JSON.stringify(nodoProximo, null, 4));

                // aqui verifica se o nó próximo é um nó interessado, se for vai tramitar somente para esse nó
                if (
                    tipoProcesso.dataValues.tpr_pessoal &&
                    nodoProximo.dataValues.nod_interessado &&
                    !nodoProximo.dataValues.nod_fim
                ) {
                    // carrega a área do usuário
                    const areaTramitacaoPessoal = await VAreaTramitacaoPessoal.findAll(
                        {
                            attributes: ['area_id', 'set_nome', 'pes_login'],
                            where: {
                                // pes_login: usuAutuador
                                area_id: areaProcesso
                            },
                            logging: false,
                            plain: true
                        }
                    );

                    combo.push({
                        id: contador,
                        prx_id: proximo[p].prx_id,
                        set_id: areaTramitacaoPessoal.dataValues.area_id,
                        set_nome: areaTramitacaoPessoal.dataValues.set_nome,
                        raz_nome: proximo[p].raz_nome,
                        pro_nome: proNome
                    });
                    return res.json(combo);
                }

                if (
                    nodoProximo.dataValues.nod_fim &&
                    tipoProcesso.dataValues.tpr_pessoal
                ) {
                    // carrega a área do usuário
                    const areaTramitacaoPessoal = await VAreaTramitacaoPessoal.findAll(
                        {
                            attributes: ['area_id', 'set_nome', 'pes_login'],
                            where: {
                                // pes_login: usuAutuador
                                area_id: areaProcesso
                            },
                            logging: false,
                            plain: true
                        }
                    );
                    combo.push({
                        id: contador,
                        prx_id: proximo[p].prx_id,
                        set_id: areaTramitacaoPessoal.dataValues.area_id,
                        set_nome: areaTramitacaoPessoal.dataValues.set_nome,
                        raz_nome: proximo[p].raz_nome,
                        pro_nome: proNome
                    });
                    // return res.json(combo);
                } else {
                    // aqui vai verificar se o tipo de processo é de HORARIO ESPECIAL
                    // e também se é pessoal, e NÃO é um nó fim
                    if (
                        tipoProcesso.dataValues.tpr_pessoal &&
                        tipoProcesso.dataValues.tpr_id ===
                            constantes.TPR_HORARIO_ESPECIAL_ESTUDANTE &&
                        nodoProximo.dataValues.nod_fim === false
                    ) {
                        // carrega a área do usuário
                        const areaTramitacaoPessoal = await VAreaTramitacaoPessoal.findAll(
                            {
                                attributes: [
                                    'area_id',
                                    'set_nome',
                                    'pes_login'
                                ],
                                where: {
                                    // pes_login: usuAutuador
                                    area_id: areaProcesso
                                },
                                logging: false,
                                plain: true
                            }
                        );
                        combo.push({
                            id: contador,
                            prx_id: proximo[p].prx_id,
                            set_id: areaTramitacaoPessoal.dataValues.area_id,
                            set_nome: areaTramitacaoPessoal.dataValues.set_nome,
                            raz_nome: proximo[p].raz_nome,
                            pro_nome: proNome
                        });
                    } else {
                        for (const t in areas) {
                            combo.push({
                                id: contador,
                                prx_id: proximo[p].prx_id,
                                set_id: areas[t].set_id,
                                set_nome: areas[t].set_nome,
                                raz_nome: proximo[p].raz_nome
                            });
                            contador = contador + 1;
                        }
                    }
                    //
                }
            }
        }
        return res.json(combo);
    }

    async proximoTramiteRecurso(req, res) {
        const processo = await Processo.findAll({
            where: {
                pro_id: req.params.id
            },
            attributes: [
                'pro_id',
                'nod_id',
                'tpr_id',
                'area_id_iniciativa',
                'usu_autuador',
                'pro_nome'
            ],
            logging: false,
            plain: true
        });
        const areaProcesso = processo.dataValues.area_id_iniciativa;
        const proximo = await VProximoTramiteNormal.findAll({
            attributes: [
                'pro_id',
                'prx_id',
                'nod_id',
                'nod_id_proximo',
                'raz_id',
                'raz_nome',
                'set_id',
                'set_nome',
                'set_sigla'
            ],
            where: {
                pro_id: req.params.id
            },
            logging: true
        });
        const combo = [];
        let contador = 1;
        for (const p in proximo) {
            // carrega a área do usuário
            const areaTramitacaoPessoal = await VAreaTramitacaoPessoal.findAll({
                attributes: ['area_id', 'set_nome', 'pes_login'],
                where: {
                    // pes_login: usuAutuador
                    area_id: areaProcesso
                },
                logging: false,
                plain: true
            });
            combo.push({
                id: contador,
                prx_id: proximo[p].prx_id,
                set_id: areaTramitacaoPessoal.dataValues.area_id,
                set_nome: areaTramitacaoPessoal.dataValues.set_nome,
                raz_nome: proximo[p].raz_nome,
                tpr_id: constantes.TPR_RECURSO
            });
            contador = contador + 1;
        }
        return res.json(combo);
    }

    async proximoTramiteAposentadoriaCalculo(req, res) {
        const processo = await Processo.findAll({
            where: {
                pro_id: req.params.id
            },
            attributes: [
                'pro_id',
                'nod_id',
                'tpr_id',
                'area_id_iniciativa',
                'usu_autuador',
                'pro_nome'
            ],
            logging: false,
            plain: true
        });
        const areaProcesso = processo.dataValues.area_id_iniciativa;
        const proNome = processo.dataValues.pro_nome;
        const proximo = await VProximoTramiteNormal.findAll({
            attributes: [
                'pro_id',
                'prx_id',
                'nod_id',
                'nod_id_proximo',
                'raz_id',
                'raz_nome',
                'set_id',
                'set_nome',
                'set_sigla'
            ],
            where: {
                pro_id: req.params.id
            },
            logging: false
        });
        const combo = [];
        const contador = 1;
        for (const p in proximo) {
            const areaTramitacaoPessoal = await VAreaTramitacaoPessoal.findAll({
                attributes: ['area_id', 'set_nome', 'pes_login'],
                where: {
                    area_id: areaProcesso
                },
                logging: false,
                plain: true
            });
            if (req.params.decisao === 'S' && proximo[p].prx_id === 90) {
                combo.push({
                    id: contador,
                    prx_id: proximo[p].prx_id,
                    set_id: areaTramitacaoPessoal.dataValues.area_id,
                    set_nome: areaTramitacaoPessoal.dataValues.set_nome,
                    raz_nome: proximo[p].raz_nome,
                    pro_nome: proNome
                });
            }
            if (req.params.decisao === 'I' && proximo[p].prx_id === 89) {
                combo.push({
                    id: contador,
                    prx_id: proximo[p].prx_id,
                    set_id: areaTramitacaoPessoal.dataValues.area_id,
                    set_nome: areaTramitacaoPessoal.dataValues.set_nome,
                    raz_nome: proximo[p].raz_nome,
                    pro_nome: proNome
                });
            }
        }
        return res.json(combo);
    }

    async proximoTramiteAposentadoriaDecisao(req, res) {
        const processo = await Processo.findAll({
            where: {
                pro_id: req.params.id
            },
            attributes: [
                'pro_id',
                'nod_id',
                'tpr_id',
                'area_id_iniciativa',
                'usu_autuador',
                'pro_nome'
            ],
            logging: false,
            plain: true
        });
        const areaProcesso = processo.dataValues.area_id_iniciativa;
        const proNome = processo.dataValues.pro_nome;
        const tprId = processo.dataValues.tpr_id;

        const manifestacao = await Manifestacao.findAll({
            where: {
                pro_id: req.params.id,
                man_id_area: constantes.AREA_COMISSAO_EXECUTIVA
            },
            attributes: ['man_visto_executiva'],
            logging: false,
            plain: true
        });
        let prxId;
        if (
            manifestacao.dataValues.man_visto_executiva === 'Concedido' &&
            tprId === constantes.TPR_APOSENTADORIA
        ) {
            prxId = 112;
        }
        if (
            manifestacao.dataValues.man_visto_executiva === 'Negado' &&
            tprId === constantes.TPR_APOSENTADORIA
        ) {
            prxId = 111;
        }
        if (
            manifestacao.dataValues.man_visto_executiva === 'Concedido' &&
            tprId === constantes.TPR_APOSENTADORIA_INICIATIVA_ADM
        ) {
            prxId = 142;
        }
        if (
            manifestacao.dataValues.man_visto_executiva === 'Negado' &&
            tprId === constantes.TPR_APOSENTADORIA_INICIATIVA_ADM
        ) {
            prxId = 141;
        }
        console.log('próximo:' + prxId);

        const proximoTramite = await ProximoTramite.findByPk(prxId, {
            logging: false,
            plain: true
        });

        const razaoTramite = await RazaoTramite.findByPk(
            proximoTramite.raz_id,
            { logging: false, plain: true }
        );

        const area = await Setor.findAll({
            where: {
                set_id: areaProcesso
            },
            attributes: ['set_id', 'set_nome'],
            logging: false,
            plain: true
        });

        const combo = [];
        combo.push({
            id: 1,
            prx_id: proximoTramite.prx_id,
            set_id: area.dataValues.set_id,
            tpr_id: tprId,
            pro_nome: proNome,
            set_nome: area.dataValues.set_nome,
            raz_nome: razaoTramite.raz_nome
        });
        return res.json(combo);
    }

    async proximoTramiteDirecionado(req, res) {
        const processo = await Processo.findAll({
            where: {
                pro_id: req.params.proId
            },
            attributes: [
                'pro_id',
                'nod_id',
                'tpr_id',
                'area_id_iniciativa',
                'usu_autuador',
                'pro_nome'
            ],
            logging: false,
            plain: true
        });
        let proNome = '';
        if (processo.dataValues.tpr_id === constantes.TPR_PAD) {
            proNome = 'Sigiloso';
        } else {
            proNome = processo.dataValues.pro_nome;
        }
        const proximo = await VProximoTramiteNormal.findAll({
            attributes: [
                'pro_id',
                'prx_id',
                'nod_id',
                'nod_id_proximo',
                'raz_id',
                'raz_nome',
                'set_id',
                'set_nome',
                'set_sigla'
            ],
            where: {
                pro_id: req.params.proId,
                prx_id: req.params.prxId
            },
            logging: true
        });
        const combo = [];
        // se for toda área é o setor do usuário
        if (proximo[0].dataValues.set_id === constantes.TODA_AREA) {
            const area = await Setor.findByPk(
                processo.dataValues.area_id_iniciativa,
                { logging: false }
            );
            if (!area) {
                return res.status(400).json({ error: 'Área não encontrada' });
            }
            combo.push({
                id: 0,
                prx_id: proximo[0].prx_id,
                set_id: area.set_id,
                set_nome: area.set_nome,
                raz_nome: proximo[0].raz_nome,
                pro_nome: proNome
            });
        } else {
            combo.push({
                id: 0,
                prx_id: proximo[0].prx_id,
                set_id: proximo[0].dataValues.set_id,
                set_nome: proximo[0].dataValues.set_nome,
                raz_nome: proximo[0].raz_nome,
                pro_nome: proNome
            });
        }

        // console.log(combo);
        return res.json(combo);
    }

    async store(req, res) {
        let traInicial = false;
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });
        const proximoTramite = await VProximoTramiteNormal.findAll({
            attributes: [
                'pro_id',
                'prx_id',
                'nod_id',
                'nod_id_proximo',
                'raz_id',
                'set_id',
                'set_nome',
                'set_sigla'
            ],
            where: {
                pro_id: req.body.pro_id
            },
            logging: false,
            plain: true
        });

        const nodo = await Nodo.findByPk(proximoTramite.dataValues.nod_id, {
            logging: false,
            plain: true
        });

        const nodoInicio = nodo.dataValues.nod_inicio;

        if (nodoInicio) {
            traInicial = true;
        }

        const traId = null;
        const traEnvio = dataHoraAtual.dataValues.data_hora_atual;
        const nodIdEnvia = proximoTramite.dataValues.nod_id;
        const nodIdRecebe = proximoTramite.dataValues.nod_id_proximo;
        const proId = req.body.pro_id;
        const razId = proximoTramite.dataValues.raz_id;
        const loginEnvia = req.body.login_envia;
        const areaIdEnvia = req.body.area_id_envia;
        const areaIdRecebe = req.body.area_id_recebe;

        const {
            tra_id,
            tra_envio,
            pro_id,
            raz_id,
            login_envia,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_inicial
        } = await Tramite.create(
            {
                tra_id: traId,
                tra_envio: traEnvio,
                pro_id: proId,
                raz_id: razId,
                login_envia: loginEnvia,
                area_id_envia: areaIdEnvia,
                area_id_recebe: areaIdRecebe,
                nod_id_envia: nodIdEnvia,
                nod_id_recebe: nodIdRecebe,
                tra_inicial: traInicial
            },
            {
                logging: false
            }
        );

        // agora pega e atualiza a tabela "manifestacao" o campo "man_tramitada"
        const manifestacao = await Manifestacao.findByPk(req.body.man_id, {
            logging: false
        });
        if (!manifestacao) {
            return res
                .status(400)
                .json({ error: 'Manifestação não encontrada' });
        }
        await manifestacao.update(
            {
                man_tramitada: true
            },
            { logging: false }
        );

        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', tra_id);
        //

        // agora pega e atualiza a tabela "processo" o campo "area_id_pendente"
        const processo = await Processo.findByPk(proId, { logging: false });
        // auditoria de edição
        // AuditoriaController.audita(
        //    processo._previousDataValues,
        //    req,
        //    'U',
        //    proId
        // );
        //
        if (!processo) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }

        // await processo.update({
        //    area_id: areaIdRecebe
        // }, { logging: false });

        // verifica se é o último nó, se for já encerra o processo
        if (nodo.dataValues.nod_fim) {
            await processo.update(
                {
                    area_id: areaIdRecebe,
                    nod_id: nodIdRecebe,
                    pro_ultimo_tramite:
                        dataHoraAtual.dataValues.data_hora_atual,
                    pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                    usu_finalizador: req.body.login_recebe,
                    set_id_finalizador: req.body.set_id_recebe
                },
                { logging: false }
            );
        } else {
            await processo.update(
                {
                    area_id: areaIdRecebe,
                    nod_id: nodIdRecebe,
                    pro_ultimo_tramite:
                        dataHoraAtual.dataValues.data_hora_atual
                },
                { logging: false }
            );
        }

        return res.json({
            tra_id,
            tra_envio,
            pro_id,
            raz_id,
            login_envia,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_inicial
        });
    }

    async criaTramiteAverbacao(req, res) {
        let traInicial = false;
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });
        const proximoTramite = await VProximoTramiteNormal.findAll({
            attributes: [
                'pro_id',
                'prx_id',
                'nod_id',
                'nod_id_proximo',
                'raz_id',
                'raz_nome',
                'set_id',
                'set_nome',
                'set_sigla'
            ],
            where: {
                prx_id: req.body.prx_id,
                pro_id: req.body.pro_id
            },
            logging: false,
            plain: true
        });

        const nodo = await Nodo.findByPk(proximoTramite.dataValues.nod_id, {
            logging: false,
            plain: true
        });

        const nodoInicio = nodo.dataValues.nod_inicio;

        if (nodoInicio) {
            traInicial = true;
        }

        const traId = null;
        const traEnvio = dataHoraAtual.dataValues.data_hora_atual;
        const nodIdEnvia = proximoTramite.dataValues.nod_id;
        const nodIdRecebe = proximoTramite.dataValues.nod_id_proximo;
        const proId = req.body.pro_id;
        const razId = proximoTramite.dataValues.raz_id;
        const loginEnvia = req.body.login_envia;
        const areaIdEnvia = req.body.area_id_envia;
        const areaIdRecebe = req.body.area_id_recebe;
        const {
            tra_id,
            tra_envio,
            pro_id,
            raz_id,
            login_envia,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_inicial
        } = await Tramite.create(
            {
                tra_id: traId,
                tra_envio: traEnvio,
                pro_id: proId,
                raz_id: razId,
                login_envia: loginEnvia,
                area_id_envia: areaIdEnvia,
                area_id_recebe: areaIdRecebe,
                nod_id_envia: nodIdEnvia,
                nod_id_recebe: nodIdRecebe,
                tra_inicial: traInicial
            },
            {
                logging: false
            }
        );
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', tra_id);
        //

        // agora pega e atualiza a tabela "manifestacao" o campo "man_tramitada"
        const manifestacao = await Manifestacao.findByPk(req.body.man_id, {
            logging: false
        });
        if (!manifestacao) {
            return res
                .status(400)
                .json({ error: 'Manifestação não encontrada' });
        }
        await manifestacao.update(
            {
                man_tramitada: true
            },
            { logging: false }
        );

        // agora pega e atualiza a tabela "processo" o campo "area_id_pendente"
        const processo = await Processo.findByPk(proId, { logging: false });
        // auditoria de edição
        // AuditoriaController.audita(
        //    processo._previousDataValues,
        //    req,
        //    'U',
        //    proId
        // );
        //
        if (!processo) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }

        // await processo.update({
        //    area_id: areaIdRecebe
        // }, { logging: false });

        // verifica se é o último nó, se for já encerra o processo
        if (nodo.dataValues.nod_fim) {
            await processo.update(
                {
                    area_id: areaIdRecebe,
                    nod_id: nodIdRecebe,
                    pro_ultimo_tramite:
                        dataHoraAtual.dataValues.data_hora_atual,
                    pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                    usu_finalizador: req.body.login_recebe,
                    set_id_finalizador: req.body.set_id_recebe
                },
                { logging: false }
            );
        } else {
            await processo.update(
                {
                    area_id: areaIdRecebe,
                    nod_id: nodIdRecebe,
                    pro_ultimo_tramite:
                        dataHoraAtual.dataValues.data_hora_atual
                },
                { logging: false }
            );
        }

        return res.json({
            tra_id,
            tra_envio,
            pro_id,
            raz_id,
            login_envia,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_inicial
        });
    }

    async criaTramiteCalculoAposentadoria(req, res) {
        let traInicial = false;
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });
        const proximoTramite = await VProximoTramiteNormal.findAll({
            attributes: [
                'pro_id',
                'prx_id',
                'nod_id',
                'nod_id_proximo',
                'raz_id',
                'raz_nome',
                'set_id',
                'set_nome',
                'set_sigla'
            ],
            where: {
                prx_id: req.body.prx_id,
                pro_id: req.body.pro_id
            },
            logging: false,
            plain: true
        });

        const nodo = await Nodo.findByPk(proximoTramite.dataValues.nod_id, {
            logging: false,
            plain: true
        });

        const nodoInicio = nodo.dataValues.nod_inicio;

        if (nodoInicio) {
            traInicial = true;
        }

        const traId = null;
        const traEnvio = dataHoraAtual.dataValues.data_hora_atual;
        const nodIdEnvia = proximoTramite.dataValues.nod_id;
        const nodIdRecebe = proximoTramite.dataValues.nod_id_proximo;
        const proId = req.body.pro_id;
        const razId = proximoTramite.dataValues.raz_id;
        const loginEnvia = req.body.login_envia;
        const areaIdEnvia = req.body.area_id_envia;
        const areaIdRecebe = req.body.area_id_recebe;
        const {
            tra_id,
            tra_envio,
            pro_id,
            raz_id,
            login_envia,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_inicial
        } = await Tramite.create(
            {
                tra_id: traId,
                tra_envio: traEnvio,
                pro_id: proId,
                raz_id: razId,
                login_envia: loginEnvia,
                area_id_envia: areaIdEnvia,
                area_id_recebe: areaIdRecebe,
                nod_id_envia: nodIdEnvia,
                nod_id_recebe: nodIdRecebe,
                tra_inicial: traInicial
            },
            {
                logging: false
            }
        );
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', tra_id);
        //

        // agora pega e atualiza a tabela "manifestacao" o campo "man_tramitada"
        const manifestacao = await Manifestacao.findByPk(req.body.man_id, {
            logging: false
        });
        if (!manifestacao) {
            return res
                .status(400)
                .json({ error: 'Manifestação não encontrada' });
        }
        await manifestacao.update(
            {
                man_tramitada: true
            },
            { logging: false }
        );

        // agora pega e atualiza a tabela "processo" o campo "area_id_pendente"
        const processo = await Processo.findByPk(proId, { logging: false });
        // auditoria de edição
        // AuditoriaController.audita(
        //    processo._previousDataValues,
        //    req,
        //    'U',
        //    proId
        // );
        //
        if (!processo) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }

        // await processo.update({
        //    area_id: areaIdRecebe
        // }, { logging: false });

        // verifica se é o último nó, se for já encerra o processo
        if (nodo.dataValues.nod_fim) {
            await processo.update(
                {
                    area_id: areaIdRecebe,
                    nod_id: nodIdRecebe,
                    pro_ultimo_tramite:
                        dataHoraAtual.dataValues.data_hora_atual,
                    pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                    usu_finalizador: req.body.login_recebe,
                    set_id_finalizador: req.body.set_id_recebe
                },
                { logging: false }
            );
        } else {
            await processo.update(
                {
                    area_id: areaIdRecebe,
                    nod_id: nodIdRecebe,
                    pro_ultimo_tramite:
                        dataHoraAtual.dataValues.data_hora_atual
                },
                { logging: false }
            );
        }

        return res.json({
            tra_id,
            tra_envio,
            pro_id,
            raz_id,
            login_envia,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_inicial
        });
    }

    async criaTramiteDirecionado(req, res) {
        let traInicial = false;
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });
        const proximoTramite = await VProximoTramiteNormal.findAll({
            attributes: [
                'pro_id',
                'prx_id',
                'nod_id',
                'nod_id_proximo',
                'raz_id',
                'raz_nome',
                'set_id',
                'set_nome',
                'set_sigla'
            ],
            where: {
                prx_id: req.body.prx_id,
                pro_id: req.body.pro_id
            },
            logging: false,
            plain: true
        });

        const nodo = await Nodo.findByPk(proximoTramite.dataValues.nod_id, {
            logging: false,
            plain: true
        });

        const nodoInicio = nodo.dataValues.nod_inicio;

        if (nodoInicio) {
            traInicial = true;
        }

        const traId = null;
        const traEnvio = dataHoraAtual.dataValues.data_hora_atual;
        const nodIdEnvia = proximoTramite.dataValues.nod_id;
        const nodIdRecebe = proximoTramite.dataValues.nod_id_proximo;
        const proId = req.body.pro_id;
        const razId = proximoTramite.dataValues.raz_id;
        const loginEnvia = req.body.login_envia;
        const areaIdEnvia = req.body.area_id_envia;
        const areaIdRecebe = req.body.area_id_recebe;
        const {
            tra_id,
            tra_envio,
            pro_id,
            raz_id,
            login_envia,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_inicial
        } = await Tramite.create(
            {
                tra_id: traId,
                tra_envio: traEnvio,
                pro_id: proId,
                raz_id: razId,
                login_envia: loginEnvia,
                area_id_envia: areaIdEnvia,
                area_id_recebe: areaIdRecebe,
                nod_id_envia: nodIdEnvia,
                nod_id_recebe: nodIdRecebe,
                tra_inicial: traInicial
            },
            {
                logging: false
            }
        );
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', tra_id);
        //

        // agora pega e atualiza a tabela "manifestacao" o campo "man_tramitada"
        const manifestacao = await Manifestacao.findByPk(req.body.man_id, {
            logging: false
        });
        if (!manifestacao) {
            return res
                .status(400)
                .json({ error: 'Manifestação não encontrada' });
        }
        await manifestacao.update(
            {
                man_tramitada: true
            },
            { logging: false }
        );

        // agora pega e atualiza a tabela "processo" o campo "area_id_pendente"
        const processo = await Processo.findByPk(proId, { logging: false });
        // auditoria de edição
        // AuditoriaController.audita(
        //    processo._previousDataValues,
        //    req,
        //    'U',
        //    proId
        // );
        //
        if (!processo) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }

        // await processo.update({
        //    area_id: areaIdRecebe
        // }, { logging: false });

        // verifica se é o último nó, se for já encerra o processo
        if (nodo.dataValues.nod_fim) {
            await processo.update(
                {
                    area_id: areaIdRecebe,
                    nod_id: nodIdRecebe,
                    pro_ultimo_tramite:
                        dataHoraAtual.dataValues.data_hora_atual,
                    pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                    usu_finalizador: req.body.login_recebe,
                    set_id_finalizador: req.body.set_id_recebe
                },
                { logging: false }
            );
        } else {
            await processo.update(
                {
                    area_id: areaIdRecebe,
                    nod_id: nodIdRecebe,
                    pro_ultimo_tramite:
                        dataHoraAtual.dataValues.data_hora_atual
                },
                { logging: false }
            );
        }

        return res.json({
            tra_id,
            tra_envio,
            pro_id,
            raz_id,
            login_envia,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_inicial
        });
    }

    async criaTramiteLivre(req, res) {
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });

        const processo = await Processo.findByPk(req.body.pro_id, {
            logging: false,
            plain: true
        });
        if (!processo) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }

        const traId = null;
        const traEnvio = dataHoraAtual.dataValues.data_hora_atual;
        const nodIdEnvia = processo.dataValues.nod_id;
        const nodIdRecebe = processo.dataValues.nod_id;
        const proId = req.body.pro_id;
        const razId = req.body.raz_id;
        const loginEnvia = req.body.login_envia;
        const areaIdEnvia = req.body.area_id_envia;
        const areaIdRecebe = req.body.area_id_recebe;
        const traObservacao = req.body.tra_observacao;
        const {
            tra_id,
            tra_envio,
            pro_id,
            raz_id,
            login_envia,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_observacao
        } = await Tramite.create(
            {
                tra_id: traId,
                tra_envio: traEnvio,
                pro_id: proId,
                raz_id: razId,
                login_envia: loginEnvia,
                area_id_envia: areaIdEnvia,
                area_id_recebe: areaIdRecebe,
                nod_id_envia: nodIdEnvia,
                nod_id_recebe: nodIdRecebe,
                tra_observacao: traObservacao
            },
            {
                logging: false
            }
        );
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', tra_id);
        //

        // agora pega e atualiza a tabela "manifestacao" o campo "man_tramitada"
        const manifestacao = await Manifestacao.findByPk(req.body.man_id, {
            logging: false
        });
        if (!manifestacao) {
            return res
                .status(400)
                .json({ error: 'Manifestação não encontrada' });
        }
        await manifestacao.update(
            {
                man_tramitada: true
            },
            { logging: false }
        );

        // agora pega e atualiza a tabela "processo" o campo "area_id_pendente"
        const processoAtualiza = await Processo.findByPk(proId, {
            logging: false
        });
        // auditoria de edição
        // AuditoriaController.audita(
        //    processo._previousDataValues,
        //    req,
        //    'U',
        //    proId
        // );
        //
        if (!processoAtualiza) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }

        await processo.update(
            {
                area_id: areaIdRecebe,
                nod_id: nodIdRecebe,
                pro_ultimo_tramite: dataHoraAtual.dataValues.data_hora_atual
            },
            { logging: false }
        );

        return res.json({
            tra_id,
            tra_envio,
            pro_id,
            raz_id,
            login_envia,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_observacao
        });
    }

    async update(req, res) {
        const tramite = await Tramite.findByPk(req.params.id, {
            logging: false
        });
        // auditoria de edição
        // AuditoriaController.audita(
        //    tramite._previousDataValues,
        //    req,
        //    'U',
        //    req.params.id
        // );
        //
        if (!tramite) {
            return res.status(400).json({ error: 'Trâmite não encontrado' });
        }
        await tramite.update(req.body, { logging: false });
        return res.json(tramite);
    }

    async recebeOuNega(req, res) {
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });
        const localizaTramite = await Tramite.findAll({
            attributes: ['pro_id', 'tra_id'],
            where: {
                pro_id: req.body.pro_id,
                login_recebe: null,
                tra_recebimento: null,
                area_id_recebe: req.body.area_id_recebe
            },
            logging: false,
            plain: true
        });

        const tramite = await Tramite.findByPk(
            localizaTramite.dataValues.tra_id,
            { logging: false, plain: true }
        );
        const processo = await Processo.findByPk(
            localizaTramite.dataValues.pro_id,
            { logging: false, plain: true }
        );

        if (req.body.tipo === 'recebe') {
            await tramite.update(
                {
                    login_recebe: req.body.login_recebe,
                    tra_recebimento: dataHoraAtual.dataValues.data_hora_atual
                },
                { logging: false }
            );
            // verifica se é o último nó, se for já encerra o processo
            const nodo = await Nodo.findByPk(tramite.dataValues.nod_id_recebe, {
                logging: false,
                plain: true
            });
            if (nodo.dataValues.nod_fim) {
                await processo.update(
                    {
                        nod_id: tramite.dataValues.nod_id_recebe,
                        pro_ultimo_tramite:
                            dataHoraAtual.dataValues.data_hora_atual,
                        pro_encerramento:
                            dataHoraAtual.dataValues.data_hora_atual,
                        usu_finalizador: req.body.login_recebe,
                        set_id_finalizador: req.body.set_id_recebe
                    },
                    { logging: false }
                );
            } else {
                await processo.update(
                    {
                        nod_id: tramite.dataValues.nod_id_recebe,
                        pro_ultimo_tramite:
                            dataHoraAtual.dataValues.data_hora_atual
                    },
                    { logging: false }
                );
            }
        }

        return res.json(tramite);
    }

    async proximoTramiteFiscal(req, res) {
        const proximo = await VProximoTramiteNormal.findAll({
            attributes: [
                'pro_id',
                'prx_id',
                'nod_id',
                'nod_id_proximo',
                'raz_id',
                'raz_nome',
                'set_id',
                'set_nome',
                'set_sigla'
            ],
            where: {
                pro_id: req.params.id
            },
            logging: false
        });

        const Op = Sequelize.Op;
        const areas = await VSetor.findAll({
            order: ['set_nome'],
            attributes: ['set_id', 'set_nome'],
            where: {
                set_id: {
                    [Op.notIn]: [
                        constantes.TODA_AREA,
                        constantes.TODO_GABINETE
                    ]
                }
            },
            logging: false
        });
        const combo = [];
        let razao = '';
        let contador = 1;
        for (const p in proximo) {
            const razaoTramite = await RazaoTramite.findAll({
                where: {
                    raz_id: proximo[p].raz_id
                },
                attributes: ['raz_id', 'raz_nome'],
                logging: false,
                plain: true
            });
            razao = razaoTramite.dataValues.raz_nome;
            const nodoProximo = await Nodo.findAll({
                where: {
                    nod_id: proximo[p].nod_id_proximo
                },
                attributes: ['nod_id', 'nod_fim', 'nod_interessado'],
                logging: false,
                plain: true
            });
            console.log(JSON.stringify(nodoProximo, null, 4));
            for (const t in areas) {
                combo.push({
                    id: contador,
                    prx_id: proximo[p].prx_id,
                    set_id: areas[t].set_id,
                    set_nome: areas[t].set_nome,
                    raz_nome: proximo[p].raz_nome
                });
                contador = contador + 1;
            }
        }
        return res.json({ combo: combo, razao: razao });
    }

    async criaTramiteFiscal(req, res) {
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: false,
            plain: true
        });
        console.log(req.body);

        const proximoTramite = await ProximoTramite.findAll({
            attributes: [
                'prx_id',
                'prx_prioridade',
                'nod_id',
                'nod_id_proximo',
                'raz_id',
                'flu_id'
            ],
            where: {
                prx_id: Number(req.body.prx_id)
            },
            logging: true,
            plain: true
        });

        const traId = null;
        const traEnvio = dataHoraAtual.dataValues.data_hora_atual;
        const nodIdEnvia = proximoTramite.dataValues.nod_id;
        const nodIdRecebe = proximoTramite.dataValues.nod_id_proximo;
        const proId = req.body.pro_id;
        const razId = proximoTramite.dataValues.raz_id;
        const loginEnvia = req.body.login_envia;
        const areaIdEnvia = Number(req.body.area_id_envia);
        const areaIdRecebe = Number(req.body.area_id_recebe);
        const traObservacao = req.body.tra_observacao;

        const {
            tra_id,
            tra_envio,
            pro_id,
            raz_id,
            login_envia,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_inicial
        } = await Tramite.create(
            {
                tra_id: traId,
                tra_envio: traEnvio,
                pro_id: proId,
                raz_id: razId,
                login_envia: loginEnvia,
                area_id_envia: areaIdEnvia,
                area_id_recebe: areaIdRecebe,
                nod_id_envia: nodIdEnvia,
                nod_id_recebe: nodIdRecebe,
                tra_inicial: false,
                tra_observacao: traObservacao
            },
            {
                logging: false
            }
        );
        // cria a manifestação
        await Manifestacao.create(
            {
                man_id: null,
                pro_id: req.body.pro_id,
                tmn_id: constantes.TMN_DESPACHO,
                man_login: req.body.login_envia,
                man_id_area: Number(req.body.area_id_envia),
                man_data: dataHoraAtual.dataValues.data_hora_atual,
                nod_id: proximoTramite.dataValues.nod_id,
                man_tramitada: true
            },
            {
                logging: false
            }
        );

        const processo = await Processo.findByPk(proId, { logging: false });
        if (!processo) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }

        await processo.update(
            {
                area_id: areaIdRecebe,
                nod_id: nodIdRecebe,
                pro_ultimo_tramite: dataHoraAtual.dataValues.data_hora_atual
            },
            { logging: false }
        );

        return res.json({
            tra_id,
            tra_envio,
            pro_id,
            raz_id,
            login_envia,
            area_id_envia,
            area_id_recebe,
            nod_id_envia,
            nod_id_recebe,
            tra_inicial
        });
    }
}
export default new TramiteController();
