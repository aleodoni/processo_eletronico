/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import VDadosPessoa from '../models/VDadosPessoa';
import Processo from '../models/Processo';
import ProcessoOrigem from '../models/ProcessoOrigem';
import VProcessoOrigem from '../models/VProcessoOrigem';
import VDadosProcesso from '../models/VDadosProcesso';
import VDadosLogin from '../models/VDadosLogin';
import TipoProcesso from '../models/TipoProcesso';
import Nodo from '../models/Nodo';
import DataHoraAtual from '../models/DataHoraAtual';
// import AuditoriaController from './AuditoriaController';

class CriaProcessoController {
    async dadosPessoa(req, res) {
        const dadosPessoas = await VDadosPessoa.findAll({
            attributes: ['pes_id', 'pes_celular', 'pes_cpf', 'pes_email', 'fone', 'pes_matricula', 'pes_nome'],
            logging: false,
            plain: true,
            where: {
                pes_matricula: req.params.matricula
            }
        });
        return res.json(dadosPessoas);
    }

    async processosDescontoFolhaDeterminacaoJudicial(req, res) {
        const TIPO_PENSAO_ALIMENTICIA = 25;
        const processos = await VDadosProcesso.findAll({
            attributes: ['pro_id', 'pro_codigo', 'pro_matricula', 'pro_nome', 'cpf', 'tpr_id'],
            logging: true,
            where: {
                tpr_id: TIPO_PENSAO_ALIMENTICIA
            }
        });
        return res.json(processos);
    }

    async processoOrigem(req, res) {
        const processoOrigem = await VProcessoOrigem.findAll({
            attributes: ['pro_id_origem', 'pro_id_atual', 'processo_origem'],
            logging: true,
            where: {
                pro_id_atual: req.params.id
            }
        });
        return res.json(processoOrigem);
    }

    async store(req, res) {
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
            logging: true,
            plain: true
        });
        req.body.pro_autuacao = dataHoraAtual.dataValues.data_hora_atual;

        // com o tpr_id verifico qual é o nó de início do fluxo e se
        // o processo é pessoal ou não
        const tipoProcesso = await TipoProcesso.findAll({
            attributes: ['tpr_id', 'flu_id', 'tpr_pessoal'],
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
            if (req.body.pro_matricula !== null && req.body.pro_matricula !== undefined) {
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
            } else if (req.body.pro_cpf !== null && req.body.pro_cpf !== undefined) {
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
                        matricula: dadosPessoa.dataValues.pes_matricula
                    }
                });
                areaPessoa = lotacao.dataValues.set_id_area;
            } else {
                return res.status(400).json({ error: 'Erro ao retornar dados de área de pessoa.' });
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
            return res.status(400).json({ error: 'Processo sem fluxo. Cadastre um fluxo primeiro.' });
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
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', pro_id);
        //

        // se tiver revisão de desconto de pensão alimentícia grava na tabela
        // de processo_origem
        if (req.body.pro_pensao !== null && req.body.pro_pensao !== undefined) {
            const processoOrigem = await ProcessoOrigem.create({ pro_id_pai: req.body.pro_pensao, pro_id_atual: pro_id }, {
                logging: true
            });
            console.log(JSON.stringify(processoOrigem, null, 4));
        }

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
    }

    async encerra(req, res) {
        const processo = await Processo.findByPk(req.params.id, { logging: false });
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: true,
            plain: true
        });
        if (!processo) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }
        const tipoProcesso = await TipoProcesso.findByPk(processo.tpr_id, { logging: false });
        if (!tipoProcesso) {
            return res.status(400).json({ error: 'Tipo de processo não encontrado' });
        }

        const prazo = tipoProcesso.tpr_prazo_recurso;
        await processo.update({
            pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
            usu_finalizador: req.body.usuario,
            set_id_finalizador: req.body.areaId
        }, { logging: false });
        return res.json(prazo);
    }

    async ciencia(req, res) {
        const processo = await Processo.findByPk(req.params.id, { logging: false });
        const dataHoraAtual = await DataHoraAtual.findAll({
            attributes: ['data_hora_atual'],
            logging: true,
            plain: true
        });
        if (!processo) {
            return res.status(400).json({ error: 'Processo não encontrado' });
        }
        if (req.body.decisao === 'Concedido') {
            await processo.update({
                pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                usu_finalizador: req.body.usuario,
                set_id_finalizador: req.body.areaId
            }, { logging: false });
        }
        if (req.body.decisao === 'Negado') {
            await processo.update({
                pro_encerramento: dataHoraAtual.dataValues.data_hora_atual,
                usu_finalizador: req.body.usuario,
                set_id_finalizador: req.body.areaId,
                pro_recurso: true
            }, { logging: false });
        }

        return res.json(processo);
    }
}
export default new CriaProcessoController();
