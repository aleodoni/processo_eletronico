/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Tramite from '../models/Tramite';
import VTramite from '../models/VTramite';
import VProcessoEnvia from '../models/VProcessoEnvia';
import VProcessoRecebe from '../models/VProcessoRecebe';
import VAreaTramitacaoPessoal from '../models/VAreaTramitacaoPessoal';
import Nodo from '../models/Nodo';
import Area from '../models/Area';
import Processo from '../models/Processo';
import TipoProcesso from '../models/TipoProcesso';
import DataHoraAtual from '../models/DataHoraAtual';
import VProximoTramiteNormal from '../models/VProximoTramiteNormal';
import Sequelize from 'sequelize';
// import AuditoriaController from './AuditoriaController';

class TramiteController {
    async index(req, res) {
        const tramites = await Tramite.findAll({
            order: ['tra_id'],
            attributes: ['pro_id',
                'pro_codigo',
                'area_id',
                'tpr_nome',
                'raz_id',
                'login_envia',
                'area_id_envia',
                'area_id_recebe',
                'nod_id_envia',
                'nod_id_recebe',
                'tra_inicial'],
            logging: false
        });
        return res.json(tramites);
    }

    async gridTramite(req, res) {
        const tramites = await VTramite.findAll({
            attributes: ['tra_id',
                'envio',
                'login_envia',
                'setor_envia',
                'setor_recebe'],
            where: {
                pro_id: req.params.id
            },
            logging: true
        });
        return res.json(tramites);
    }

    async processosEnvio(req, res) {
        const processos = await VProcessoEnvia.findAll({
            attributes: ['pro_id',
                'pro_codigo',
                'area_id',
                'tpr_nome'],
            where: {
                area_id: req.params.id
            },
            logging: true
        });
        return res.json(processos);
    }

    async processosRecebimento(req, res) {
        const processos = await VProcessoRecebe.findAll({
            attributes: ['pro_id',
                'pro_codigo',
                'tra_envio',
                'login_envia',
                'tpr_nome'],
            where: {
                area_id_pendente: req.params.id
            },
            logging: true
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
                'usu_autuador'
            ],
            logging: true,
            plain: true
        });
        const usuAutuador = processo.dataValues.usu_autuador;
        const tprId = processo.dataValues.tpr_id;
        const idNodoAtual = processo.dataValues.nod_id;
        // 05/05/2020 - tenho que pegar o próximo
        const tipoProcesso = await TipoProcesso.findAll({
            where: {
                tpr_id: tprId
            },
            attributes: [
                'tpr_id',
                'tpr_pessoal'
            ],
            logging: true,
            plain: true
        });
        /*
        const nodo = await Nodo.findAll({
            where: {
                nod_id: idNodoAtual
            },
            attributes: [
                'nod_id',
                'nod_fim'
            ],
            logging: true,
            plain: true
        });
        */

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
                'set_sigla'],
            where: {
                pro_id: req.params.id
            },
            logging: true
        });
        const Op = Sequelize.Op;
        const areas = await Area.findAll({
            order: ['set_nome'],
            attributes: ['set_id',
                'set_nome'
            ],
            where: {
                set_id: { [Op.notIn]: [556, 557] }
            },
            logging: false
        });
        const combo = [];
        let contador = 1;
        for (const p in proximo) {
            if (proximo[p].set_id !== 556) {
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
                    attributes: [
                        'nod_id',
                        'nod_fim'
                    ],
                    logging: true,
                    plain: true
                });
                // if (nodo.dataValues.nod_fim && tipoProcesso.dataValues.tpr_pessoal) {
                if (nodoProximo.dataValues.nod_fim && tipoProcesso.dataValues.tpr_pessoal) {
                    // carrega a área do usuário
                    const areaTramitacaoPessoal = await VAreaTramitacaoPessoal.findAll({
                        attributes: [
                            'area_id',
                            'set_nome',
                            'pes_login'
                        ],
                        where: {
                            pes_login: usuAutuador
                        },
                        logging: true,
                        plain: true
                    });
                    combo.push({
                        id: contador,
                        prx_id: proximo[p].prx_id,
                        set_id: areaTramitacaoPessoal.dataValues.area_id,
                        set_nome: areaTramitacaoPessoal.dataValues.set_nome,
                        raz_nome: proximo[p].raz_nome
                    });
                    return res.json(combo);
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
            }
        }
        return res.json(combo);
    }

    async store(req, res) {
        let traInicial = false;
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: true,
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
                'set_sigla'],
            where: {
                pro_id: req.body.pro_id
            },
            logging: true,
            plain: true
        });

        const nodo = await Nodo.findByPk(proximoTramite.dataValues.nod_id, { logging: true, plain: true });

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
        } = await Tramite.create({
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
        }, {
            logging: true
        });
            // auditoria de inserção
            // AuditoriaController.audita(req.body, req, 'I', tra_id);
            //

        // agora pega e atualiza a tabela "processo" o campo "area_id_pendente"
        const processo = await Processo.findByPk(proId, { logging: true });
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
        // }, { logging: true });

        // verifica se é o último nó, se for já encerra o processo
        if (nodo.dataValues.nod_fim) {
            await processo.update({
                area_id: areaIdRecebe,
                nod_id: nodIdRecebe,
                pro_ultimo_tramite: dataHoraAtual.dataValues.data_hora_atual,
                pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                usu_finalizador: req.body.login_recebe,
                set_id_finalizador: req.body.set_id_recebe
            }, { logging: false });
        } else {
            await processo.update({
                area_id: areaIdRecebe,
                nod_id: nodIdRecebe,
                pro_ultimo_tramite: dataHoraAtual.dataValues.data_hora_atual
            }, { logging: false });
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

    async update(req, res) {
        const tramite = await Tramite.findByPk(req.params.id, { logging: false });
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
            logging: true,
            plain: true
        });
        const localizaTramite = await Tramite.findAll({
            attributes: [
                'pro_id',
                'tra_id'],
            where: {
                pro_id: req.body.pro_id,
                login_recebe: null,
                tra_recebimento: null,
                area_id_recebe: req.body.area_id_recebe
            },
            logging: true,
            plain: true
        });

        const tramite = await Tramite.findByPk(localizaTramite.dataValues.tra_id, { logging: true, plain: true });
        const processo = await Processo.findByPk(localizaTramite.dataValues.pro_id, { logging: true, plain: true });

        if (req.body.tipo === 'recebe') {
            await tramite.update({
                login_recebe: req.body.login_recebe,
                tra_recebimento: dataHoraAtual.dataValues.data_hora_atual
            }, { logging: false });
            // verifica se é o último nó, se for já encerra o processo
            const nodo = await Nodo.findByPk(tramite.dataValues.nod_id_recebe, { logging: true, plain: true });
            if (nodo.dataValues.nod_fim) {
                await processo.update({
                    nod_id: tramite.dataValues.nod_id_recebe,
                    pro_ultimo_tramite: dataHoraAtual.dataValues.data_hora_atual,
                    pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                    usu_finalizador: req.body.login_recebe,
                    set_id_finalizador: req.body.set_id_recebe
                }, { logging: false });
            } else {
                await processo.update({
                    nod_id: tramite.dataValues.nod_id_recebe,
                    pro_ultimo_tramite: dataHoraAtual.dataValues.data_hora_atual
                }, { logging: false });
            }
        }

        return res.json(tramite);
    }
}
export default new TramiteController();
