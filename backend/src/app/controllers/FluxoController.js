/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import Fluxo from '../models/Fluxo';
import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';

import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';

import CreateFluxoService from '../services/fluxo/CreateFluxoService';
import DeleteFluxoService from '../services/fluxo/DeleteFluxoService';
import UpdateFluxoService from '../services/fluxo/UpdateFluxoService';

import AppError from '../error/AppError';

class FluxoController {
    async index(req, res) {
        const fluxos = await Fluxo.findAll({
            order: ['flu_nome'],
            attributes: ['flu_id', 'flu_nome'],
            logging: false
        });
        return res.json(fluxos);
    }

    async store(req, res) {
        const createFluxo = new CreateFluxoService(Fluxo);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const { flu_id, flu_nome } = await createFluxo.execute(req.body);

        // auditoria de inserção
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', flu_id);
        //

        return res.json({
            flu_id,
            flu_nome
        });
    }

    async update(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const updateFluxo = new UpdateFluxoService(Fluxo);

        const { id } = req.params;
        const { flu_nome } = req.body;

        const updatedFluxo = await updateFluxo.execute({ id, flu_nome });

        // auditoria de edição
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        await createAuditoria.execute(updatedFluxo._previousDataValues, url, usuario, clientIP, 'U', id);
        //

        return res.json(updatedFluxo);
    }

    async delete(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteFluxo = new DeleteFluxoService(Fluxo);

        const { id } = req.params;

        try {
            const fluxo = await deleteFluxo.execute({ id });

            // auditoria de deleção
            const { url, headers } = req;
            const { usuario } = headers;
            const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            await createAuditoria.execute(fluxo._previousDataValues, url, usuario, clientIP, 'D', id);
            //
        } catch (err) {
            throw new AppError('Erro ao excluir fluxo. O fluxo possui uma ou mais ligações.');
        }

        return res.send();
    }
}
export default new FluxoController();
