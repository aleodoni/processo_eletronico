import Area from '../models/Area';
import Setor from '../models/Setor';

class AreaController {
    async index(req, res) {
        const areas = await Area.findAll({
            logging: false
        });
        return res.json(areas);
    }

    async areaPorCodigo(req, res) {
        const area = await Area.findByPk(req.params.id, { logging: false });
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
