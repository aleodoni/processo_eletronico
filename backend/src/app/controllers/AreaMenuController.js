/* eslint-disable consistent-return */
/* eslint-disable func-names */
import AreaMenu from '../models/AreaMenu';
import VAreaMenu from '../models/VAreaMenu';
import AuditoriaController from './AuditoriaController';

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
        const { amuId, setId, mmuId } = await AreaMenu.create(req.body, {
            logging: false
        });
        // auditoria de inserção
        AuditoriaController.audita(req.body, req, 'I', amuId);
        //
        return res.json({
            amuId,
            setId,
            mmuId
        });
    }

    async update(req, res) {
        const areaMenu = await AreaMenu.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        AuditoriaController.audita(
            areaMenu._previousDataValues,
            req,
            'U',
            req.params.id
        );
        //
        if (!areaMenu) {
            return res.status(400).json({ error: 'Área de menu não encontrado' });
        }
        await areaMenu.update(req.body, { logging: false });
        return res.json(areaMenu);
    }

    async delete(req, res) {
        const areaMenu = await AreaMenu.findByPk(req.params.id, { logging: false });
        // auditoria de edição
        AuditoriaController.audita(
            areaMenu._previousDataValues,
            req,
            'U',
            req.params.id
        );
        //
        if (!areaMenu) {
            return res.status(400).json({ error: 'Área de menu não encontrado' });
        }
        await areaMenu
            .destroy({ logging: false })
            .then(auditoria => {
                // auditoria de deleção
                AuditoriaController.audita(
                    areaMenu._previousDataValues,
                    req,
                    'D',
                    req.params.id
                );
                //
            })
            .catch(function(err) {
                if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
                    return res.status(400).json({
                        error:
              'Erro ao excluir a área de menu. A área de menu possui uma ou mais ligações.'
                    });
                }
            });
        return res.send();
    }
}
export default new AreaMenuController();
