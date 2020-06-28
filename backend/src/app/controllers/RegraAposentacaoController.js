/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import RegraAposentacao from '../models/RegraAposentacao';
// import AuditoriaController from './AuditoriaController';

class RegraAposentacaoController {
    async index(req, res) {
        const regras = await RegraAposentacao.findAll({
            order: ['reg_nome'],
            attributes: ['reg_id', 'reg_nome'],
            logging: false
        });
        return res.json(regras);
    }

    async store(req, res) {
        const { reg_id, reg_nome } = await RegraAposentacao.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', flu_id);
        //
        return res.json({
            reg_id,
            reg_nome
        });
    }

    async update(req, res) {
        const regra = await RegraAposentacao.findByPk(req.params.id, { logging: false });

        // auditoria de edição
        // AuditoriaController.audita(
        //    fluxo._previousDataValues,
        //    req,
        //    'U',
        //    req.params.id
        // );
        //
        if (!regra) {
            return res.status(400).json({ error: 'Regra não encontrada' });
        }
        console.log(req.body);
        await RegraAposentacao.update(req.body, { logging: true });
        return res.json(regra);
    }

    async delete(req, res) {
        const regra = await RegraAposentacao.findByPk(req.params.id, { logging: false });
        if (!regra) {
            return res.status(400).json({ error: 'Regra não encontrada' });
        }
        await regra
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                // AuditoriaController.audita(
                //    fluxo._previousDataValues,
                //    req,
                //    'D',
                //    req.params.id
                // );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error: 'Erro ao excluir regea de aposentação. A regra possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new RegraAposentacaoController();
