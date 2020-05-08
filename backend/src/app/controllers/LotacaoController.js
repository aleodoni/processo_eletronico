/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Lotacao from '../models/Lotacao';
// import AuditoriaController from './AuditoriaController';

class LotacaoController {
    async index(req, res) {
        const lotacoes = await Lotacao.findAll({
            order: ['pes_nome'],
            attributes: ['matricula', 'set_id', 'pes_nome', 'pes_login'],
            logging: false
        });
        return res.json(lotacoes);
    }

    async store(req, res) {
        const { matricula, set_id, pes_nome, pes_login } = await Lotacao.create({
            matricula: req.body.matricula,
            set_id: req.body.set_id,
            pes_nome: req.body.pes_nome,
            pes_login: req.body.pes_login
        }, {
            logging: false
        });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', matricula);
        //
        return res.json({
            matricula, set_id, pes_nome, pes_login
        });
    }

    async update(req, res) {
        const lotacao = await Lotacao.findByPk(req.params.id, { logging: true });
        // auditoria de edição
        // AuditoriaController.audita(
        //    lotacao._previousDataValues,
        //    req,
        //    'U',
        //    req.params.id
        // );
        //
        if (!lotacao) {
            return res.status(400).json({ error: 'Lotação não encontrada' });
        }
        await lotacao.update({
            matricula: req.body.matricula,
            set_id: req.body.set_id,
            pes_nome: req.body.pes_nome,
            pes_login: req.body.pes_login
        }, { logging: false });
        return res.json(lotacao);
    }

    async delete(req, res) {
        const lotacao = await Lotacao.findByPk(req.params.id, { logging: true });
        if (!lotacao) {
            return res.status(400).json({ error: 'Lotação não encontrada' });
        }
        await lotacao
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                // AuditoriaController.audita(
                //    lotacao._previousDataValues,
                //    req,
                //    'D',
                //    req.params.id
                // );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir lotação. A lotação possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new LotacaoController();
