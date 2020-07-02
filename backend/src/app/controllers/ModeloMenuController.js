/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import ModeloMenu from '../models/ModeloMenu';
import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';
import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';

import CreateModeloMenuService from '../services/modelo_menu/CreateModeloMenuService';
import DeleteModeloMenuService from '../services/modelo_menu/DeleteModeloMenuService';
import UpdateModeloMenuService from '../services/modelo_menu/UpdateModeloMenuService';

import AppError from '../error/AppError';

class ModeloMenuController {
    async index(req, res) {
        const modeloMenus = await ModeloMenu.findAll({
            order: ['mmu_nome'],
            attributes: ['mmu_id', 'mmu_nome'],
            logging: false
        });
        return res.json(modeloMenus);
    }

    async store(req, res) {
        const createModeloMenu = new CreateModeloMenuService(ModeloMenu);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const modeloMenu = await createModeloMenu.execute(req.body);

        // auditoria de inserção
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', modeloMenu.mmu_id);
        //

        return res.json(modeloMenu);
    }

    async update(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const updateModeloMenu = new UpdateModeloMenuService(ModeloMenu);

        const { id } = req.params;
        const { mmu_nome } = req.body;

        const updatedModeloMenu = await updateModeloMenu.execute({ id, mmu_nome });

        // auditoria de edição
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        await createAuditoria.execute(updatedModeloMenu._previousDataValues, url, usuario, clientIP, 'U', id);
        //

        return res.json(updatedModeloMenu);
    }

    async delete(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteModeloMenu = new DeleteModeloMenuService(ModeloMenu);

        const { id } = req.params;

        try {
            const modeloMenu = await deleteModeloMenu.execute({ id });

            // auditoria de deleção
            const { url, headers } = req;
            const { usuario } = headers;
            const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            await createAuditoria.execute(modeloMenu._previousDataValues, url, usuario, clientIP, 'D', id);
            //
        } catch (err) {
            throw new AppError('Erro ao excluir modelo menu. O modelo menu possui uma ou mais ligações.');
        }

        return res.send();
    }
}
export default new ModeloMenuController();
