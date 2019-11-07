/* eslint-disable consistent-return */
/* eslint-disable func-names */
import UniaoPerfis from '../models/UniaoPerfis';

class UniaoPerfisController {
  async index(req, res) {
    const unioesPerfis = await UniaoPerfis.findAll({
      attributes: ['pet_id', 'pea_id'],
      logging: false,
    });
    return res.json(unioesPerfis);
  }

  async store(req, res) {
    const { pet_id, pea_id } = await UniaoPerfis.create(req.body, {
      logging: false,
    });
    return res.json({
      pet_id,
      pea_id,
    });
  }

  async delete(req, res) {
    const uniaoPerfis = await UniaoPerfis.findOne({
      where: { pet_id: req.params.pet_id, pea_id: req.params.pea_id },
      logging: false,
    });
    if (!uniaoPerfis) {
      return res.status(400).json({ error: 'Unão dos perfis não encontrado.' });
    }
    await uniaoPerfis
      .destroy({ logging: false })
      .then(() => {})
      .catch(function(err) {
        if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
          return res.status(400).json({
            error:
              'Erro ao excluir união dos perfis. A união dos perfis possui uma ou mais ligações.',
          });
        }
      });
    return res.send();
  }
}
export default new UniaoPerfisController();
