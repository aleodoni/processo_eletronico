import Setor from '../models/Setor';
import AreaCombo from '../models/AreaCombo';
// import ConnectionHelper from '../helpers/ConnectionHelper';
// import Sequelize from 'sequelize';
import ListAllAreaService from '../services/area/ListAllAreaService';
import ListAllAreaNormalService from '../services/area/ListAllAreaNormalService';
import FindAreaPorCodigoService from '../services/area/FindAreaPorCodigoService';
import FindSetorPorCodigoService from '../services/area/FindSetorPorCodigoService';

class AreaController {
    async index(req, res) {
        const listAllArea = new ListAllAreaService(Setor);

        const areas = await listAllArea.execute();
        return res.json(areas);
    }

    async areaNormal(req, res) {
        const listAllAreaNormal = new ListAllAreaNormalService(AreaCombo);

        const areas = await listAllAreaNormal.execute();
        // const areas = await AreaCombo.findAll({
        //     where: { set_tipo: 'N' },
        //     order: ['set_nome'],
        //     attributes: ['set_id', 'set_nome'],
        //     logging: false
        // });
        return res.json(areas);
    }

    async areaPorCodigo(req, res) {
        const findAreaPorCodigo = new FindAreaPorCodigoService(Setor);

        const { id } = req.params;

        const area = await findAreaPorCodigo.execute({ id });

        // const area = await Setor.findByPk(req.params.id, { logging: false });
        // if (!area) {
        //     return res.status(400).json({ error: 'Área não encontrada' });
        // }
        return res.json(area);
    }

    async setorPorCodigo(req, res) {
        const findSetorPorCodigo = new FindSetorPorCodigoService(Setor);

        const { id } = req.params;

        const setor = await findSetorPorCodigo.execute({ id });

        // const setor = await Setor.findByPk(req.params.id, { logging: false });
        // if (!setor) {
        //     return res.status(400).json({ error: 'Setor não encontrado' });
        // }

        return res.json(setor);
    }
}

export default new AreaController();
