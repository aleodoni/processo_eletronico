/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import AreaMenu from '../models/AreaMenu';
import VAreaMenu from '../models/VAreaMenu';
import Setor from '../models/Setor';
import ModeloMenu from '../models/ModeloMenu';

import CreateAuditoriaService from '../services/auditoria/CreateAuditoriaService';
import Auditoria from '../models/Auditoria';
import DataHoraAtual from '../models/DataHoraAtual';

import CreateAreaMenuService from '../services/area_menu/CreateAreaMenuService';
import DeleteAreaMenuService from '../services/area_menu/DeleteAreaMenuService';
import UpdateAreaMenuService from '../services/area_menu/UpdateAreaMenuService';

import AppError from '../error/AppError';
// import AuditoriaController from './AuditoriaController';

class AreaMenuController {
    async index(req, res) {
        const areaMenus = await AreaMenu.findAll({
            attributes: ['amu_id', 'set_id', 'mmu_id'],
            logging: false
        });
        return res.json(areaMenus);
    }

    async areaDoMenu(req, res) {
        const areaDoMenu = await VAreaMenu.findAll({
            attributes: ['amu_id', 'set_id', 'mmu_id', 'mmu_nome', 'set_nome'],
            logging: false
        });
        return res.json(areaDoMenu);
    }

    async store(req, res) {
        const createAreamenu = new CreateAreaMenuService(AreaMenu, Setor, ModeloMenu);
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const areaMenu = await createAreamenu.execute(req.body);

        // auditoria de inserção
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await createAuditoria.execute(req.body, url, usuario, clientIP, 'I', areaMenu.amu_id);
        //

        return res.json(areaMenu);
    }

    async update(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);

        const updateAreaMenu = new UpdateAreaMenuService(AreaMenu, Setor, ModeloMenu);

        const { id } = req.params;
        const { set_id, mmu_id } = req.body;

        const updatedAreamenu = await updateAreaMenu.execute({ id, set_id, mmu_id });

        // auditoria de edição
        const { url, headers } = req;
        const { usuario } = headers;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        await createAuditoria.execute(updatedAreamenu._previousDataValues, url, usuario, clientIP, 'U', id);
        //

        return res.json(updatedAreamenu);
    }

    async delete(req, res) {
        const createAuditoria = new CreateAuditoriaService(Auditoria, DataHoraAtual);
        const deleteAreaMenu = new DeleteAreaMenuService(AreaMenu);

        const { id } = req.params;

        try {
            const areamenu = await deleteAreaMenu.execute({ id });

            // auditoria de deleção
            const { url, headers } = req;
            const { usuario } = headers;
            const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            await createAuditoria.execute(areamenu._previousDataValues, url, usuario, clientIP, 'D', id);
            //
        } catch (err) {
            throw new AppError('Erro ao excluir área menu. A área menu possui uma ou mais ligações.');
        }

        return res.send();
    }
}
export default new AreaMenuController();
