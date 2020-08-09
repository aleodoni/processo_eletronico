import Setor from '../models/Setor';
import AreaCombo from '../models/AreaCombo';
import ConnectionHelper from '../helpers/ConnectionHelper';

class AreaController {
    async index(req, res) {
        const connection = ConnectionHelper.getConnection();
        const areas = await Setor.findAll({
            where: connection.where(
                connection.col('set_id'),
                connection.col('set_id_area')
            ),

            order: ['set_nome'],
            attributes: ['set_id', 'set_nome'],
            logging: false
        });
        return res.json(areas);
    }

    async areaNormal(req, res) {
        const areas = await AreaCombo.findAll({
            where: { set_tipo: 'N' },
            order: ['set_nome'],
            attributes: ['set_id', 'set_nome'],
            logging: false
        });
        return res.json(areas);
    }

    async areaPorCodigo(req, res) {
        const area = await Setor.findByPk(req.params.id, { logging: false });
        if (!area) {
            return res.status(400).json({ error: 'Área não encontrada' });
        }
        return res.json(area);
    }

    async setorPorCodigo(req, res) {
        const setor = await Setor.findByPk(req.params.id, { logging: false });
        if (!setor) {
            return res.status(400).json({ error: 'Setor não encontrado' });
        }
        return res.json(setor);
    }
}

export default new AreaController();
