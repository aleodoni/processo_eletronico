import Setor from '../models/Setor';
import AreaCombo from '../models/AreaCombo';
import Sequelize from 'sequelize';

class AreaController {
    async index(req, res) {
        const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
            host: process.env.DB_HOST,
            dialect: 'postgres',
            define: {
                timestamps: false,
                underscoredAll: true
            },
            pool: {
                max: 7,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        const areas = await Setor.findAll({
            where: sequelize.where(
                sequelize.col('set_id'),
                sequelize.col('set_id_area')
            ),

            order: ['set_nome'],
            attributes: ['set_id', 'set_nome'],
            logging: true
        });
        return res.json(areas);
    }

    async areaNormal(req, res) {
        const areas = await AreaCombo.findAll({
            where: { set_tipo: 'N' },
            order: ['set_nome'],
            attributes: ['set_id', 'set_nome'],
            logging: true
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
