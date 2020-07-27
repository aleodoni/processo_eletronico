/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import RazaoTramite from '../models/RazaoTramite';
// import AuditoriaController from './AuditoriaController';

import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';
import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';

import CreateRazaoTramiteService from '../services/razao_tramite/CreateRazaoTramiteService';
import DeleteRazaoTramiteService from '../services/razao_tramite/DeleteRazaoTramiteService';
import UpdateRazaoTramiteService from '../services/razao_tramite/UpdateRazaoTramiteService';

import AppError from '../error/AppError';

class RazaoTramiteController {
    async index(req, res) {
        const razoes = await RazaoTramite.findAll({
            order: ['raz_nome'],
            attributes: ['raz_id', 'raz_nome'],
            logging: false
        });
        return res.json(razoes);
    }

    async store(req, res) {
        const createRazaoTramite = new CreateRazaoTramiteService(RazaoTramite);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const razaoTramite = await createRazaoTramite.execute(req.body);

        // auditoria de inserção
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', razaoTramite.raz_id);
        //

        return res.json(razaoTramite);
        // const { raz_id, raz_nome } = await RazaoTramite.create(req.body, {
        //     logging: false
        // });
        // // auditoria de inserção
        // AuditoriaController.audita(req.body, req, 'I', raz_id);
        // //
        // return res.json({
        //     raz_id,
        //     raz_nome
        // });
    }

    async update(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const updateRazaoTramite = new UpdateRazaoTramiteService(RazaoTramite);

        const { id } = req.params;
        const { raz_nome } = req.body;

        const updatedRazaoTramite = await updateRazaoTramite.execute({ id, raz_nome });

        // auditoria de edição
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        await createAuditoria.execute(updatedRazaoTramite._previousDataValues, url, usuario, clientIP, 'U', id);
        //

        return res.json(updatedRazaoTramite);

        // const razao = await RazaoTramite.findByPk(req.params.id, { logging: false });
        // // auditoria de edição
        // AuditoriaController.audita(
        //     razao._previousDataValues,
        //     req,
        //     'U',
        //     req.params.id
        // );
        // //
        // if (!razao) {
        //     return res.status(400).json({ error: 'Razão de trâmite não encontrado' });
        // }
        // await razao.update(req.body, { logging: false });
        // return res.json(razao);
    }

    async delete(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteRazaoTramite = new DeleteRazaoTramiteService(RazaoTramite);

        const { id } = req.params;

        try {
            const razaoTramite = await deleteRazaoTramite.execute({ id });

            // auditoria de deleção
            const { url, headers } = req;
            const { usuario } = headers;
            const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            await createAuditoria.execute(razaoTramite._previousDataValues, url, usuario, clientIP, 'D', id);
            //
        } catch (err) {
            throw new AppError('Erro ao excluir razão trâmite. A razão trâmite possui uma ou mais ligações.');
        }

        return res.send();
        // const razao = await RazaoTramite.findByPk(req.params.id, { logging: false });
        // if (!razao) {
        //     return res.status(400).json({ error: 'Razão de trâmite não encontrado' });
        // }
        // await razao
        //     .destroy({ logging: false })
        //     .then(auditoria => {
        //         // auditoria de deleção
        //         AuditoriaController.audita(
        //             razao._previousDataValues,
        //             req,
        //             'D',
        //             req.params.id
        //         );
        //         //
        //     })
        //     .catch(function(err) {
        //         if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
        //             return res.status(400).json({
        //                 error: 'Erro ao excluir razão de trâmite. A razão de trâmite possui uma ou mais ligações.'
        //             });
        //         }
        //     });
        // return res.send();
    }
}
export default new RazaoTramiteController();
