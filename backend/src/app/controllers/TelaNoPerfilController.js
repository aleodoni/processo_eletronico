/* eslint-disable consistent-return */
/* eslint-disable func-names */
import TelaNoPerfil from '../models/TelaNoPerfil';

class TelaNoPerfilController {
  async index(req, res) {
    const telasNoPerfil = await TelaNoPerfil.findAll({
      attributes: ['tel_id', 'pet_id'],
      logging: false,
    });
    return res.json(telasNoPerfil);
  }

  async store(req, res) {
    const { tel_id, pet_id } = await TelaNoPerfil.create(req.body, {
      logging: true,
    });
    return res.json({
      tel_id,
      pet_id,
    });
  }

  async delete(req, res) {
    const telaNoPerfil = await TelaNoPerfil.findOne(
      { where: { tel_id: req.params.tel_id, pet_id: req.params.pet_id } },
      {
        logging: true,
      }
    );
    if (!telaNoPerfil) {
      return res.status(400).json({ error: 'Tela no perfil não encontrada' });
    }
    await telaNoPerfil
      .destroy({ logging: true })
      .then(() => {})
      .catch(function(err) {
        if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
          return res.status(400).json({
            error:
              'Erro ao excluir tela no perfil. A tela no perfil possui uma ou mais ligações.',
          });
        }
      });
    return res.send();
  }
}
export default new TelaNoPerfilController();
