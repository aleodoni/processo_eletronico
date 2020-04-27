/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import VDadosPessoa from '../models/VDadosPessoa';
import Processo from '../models/Processo';
import TipoProcesso from '../models/TipoProcesso';
import Nodo from '../models/Nodo';
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
        if (req.body.usu_alteracao === '') {
            req.body.usu_alteracao = null;
        }
        if (req.body.area_id_iniciativa === '') {
            req.body.area_id_iniciativa = null;
        }

        // com o tpr_id verifico qual é o nó de início do fluxo
        const tipoProcesso = await TipoProcesso.findAll({
            attributes: ['tpr_id', 'flu_id'],
            logging: false,
            plain: true,
            where: {
                tpr_id: req.body.tpr_id
            }
        });
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
        }

        const { pro_id, tpr_id, pro_iniciativa, pro_nome, pro_matricula, pro_cpf, pro_cnpj, pro_contato_pj, pro_fone, pro_celular, pro_email, pro_encerramento, pro_assunto, usu_autuador, set_id_autuador, area_id, pro_ultimo_tramite, usu_finalizador, set_id_finalizador, usu_alteracao, usu_data_hora_alteracao, nod_id, pro_tipo_iniciativa, area_id_iniciativa } = await Processo.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', pro_id);
        //
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
            usu_alteracao,
            usu_data_hora_alteracao,
            nod_id,
            pro_tipo_iniciativa,
            area_id_iniciativa
        });
    }
}
export default new CriaProcessoController();
