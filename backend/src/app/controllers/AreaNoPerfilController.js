/* eslint-disable consistent-return */
/* eslint-disable func-names */
import AreaNoPerfil from '../models/AreaNoPerfil';

class AreaNoPerfilController {
  async index(req, res) {
    const areasNoPerfil = await AreaNoPerfil.findAll({
      attributes: ['set_id', 'pea_id'],
      logging: false,
    });
    return res.json(areasNoPerfil);
  }

  async store(req, res) {
    const { set_id, pea_id } = await AreaNoPerfil.create(req.body, {
      logging: false,
    });
    return res.json({
      set_id,
      pea_id,
    });
  }

  async delete(req, res) {
    const areaNoPerfil = await AreaNoPerfil.findOne({
      where: { set_id: req.params.set_id, pea_id: req.params.pea_id },
      logging: false,
    });
    if (!areaNoPerfil) {
      return res.status(400).json({ error: 'Área no perfil não encontrada.' });
    }
    await areaNoPerfil
      .destroy({ logging: false })
      .then(() => {})
      .catch(function(err) {
        if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
          return res.status(400).json({
            error:
              'Erro ao excluir área no perfil. A área no perfil possui uma ou mais ligações.',
          });
        }
      });
    return res.send();
  }
}
export default new AreaNoPerfilController();
