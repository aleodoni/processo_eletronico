/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import RegraAposentacao from '../models/RegraAposentacao';
// import AuditoriaController from './AuditoriaController';
import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';
import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';

import CreateRegraAposentacaoService from '../services/regra_aposentacao/CreateRegraAposentacaoService';
import DeleteRegraAposentacaoService from '../services/regra_aposentacao/DeleteRegraAposentacaoService';
import UpdateRegraAposentacaoService from '../services/regra_aposentacao/UpdateRegraAposentacaoService';

import AppError from '../error/AppError';

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
        const createRegraAposentacao = new CreateRegraAposentacaoService(RegraAposentacao);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const regraAposencatao = await createRegraAposentacao.execute(req.body);

        // auditoria de inserção
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', regraAposencatao.reg_id);
        //

        return res.json(regraAposencatao);

        // const { reg_id, reg_nome } = await RegraAposentacao.create(req.body, {
        //     logging: false
        // });
        // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', flu_id);
        //
        // return res.json({
        //     reg_id,
        //     reg_nome
        // });
    }

    async update(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const updateRegraAposentacao = new UpdateRegraAposentacaoService(RegraAposentacao);

        const { id } = req.params;
        const { reg_nome } = req.body;

        const updatedRegraAposentacao = await updateRegraAposentacao.execute({ id, reg_nome });

        // auditoria de edição
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        await createAuditoria.execute(updatedRegraAposentacao._previousDataValues, url, usuario, clientIP, 'U', id);
        //

        return res.json(updatedRegraAposentacao);
        // const regra = await RegraAposentacao.findByPk(req.params.id, { logging: false });

        // auditoria de edição
        // AuditoriaController.audita(
        //    fluxo._previousDataValues,
        //    req,
        //    'U',
        //    req.params.id
        // );
        //
    }

    async delete(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteRegraAposentacao = new DeleteRegraAposentacaoService(RegraAposentacao);

        const { id } = req.params;

        try {
            const regraAposentacao = await deleteRegraAposentacao.execute({ id });

            // auditoria de deleção
            const { url, headers } = req;
            const { usuario } = headers;
            const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            await createAuditoria.execute(regraAposentacao._previousDataValues, url, usuario, clientIP, 'D', id);
            //
        } catch (err) {
            throw new AppError('Erro ao excluir modelo menu. O modelo menu possui uma ou mais ligações.');
        }

        return res.send();

        // const regra = await RegraAposentacao.findByPk(req.params.id, { logging: false });
        // if (!regra) {
        //     return res.status(400).json({ error: 'Regra não encontrada' });
        // }
        // await regra
        //     .destroy({ logging: false })
        //     .then(auditoria => {
        //         // auditoria de deleção
        //         // AuditoriaController.audita(
        //         //    fluxo._previousDataValues,
        //         //    req,
        //         //    'D',
        //         //    req.params.id
        //         // );
        //         //
        //     })
        //     .catch(function(err) {
        //         if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
        //             return res.status(400).json({
        //                 error: 'Erro ao excluir regea de aposentação. A regra possui uma ou mais ligações.'
        //             });
        //         }
        //     });
        // return res.send();
    }
}
export default new RegraAposentacaoController();
