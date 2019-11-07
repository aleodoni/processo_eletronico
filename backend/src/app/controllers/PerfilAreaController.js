/* eslint-disable consistent-return */
/* eslint-disable func-names */
import PerfilArea from '../models/PerfilArea';
import PerfilAreaValidator from '../validators/PerfilAreaValidator';

class PerfilAreaController {
  async index(req, res) {
    const perfilAreas = await PerfilArea.findAll({
      order: ['pea_nome'],
      attributes: ['pea_id', 'pea_nome', 'pea_descricao'],
      logging: false,
    });
    return res.json(perfilAreas);
  }

  async store(req, res) {
    const validator = new PerfilAreaValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const { pea_id, pea_nome, pea_descricao } = await PerfilArea.create(
      req.body,
      {
        logging: false,
      }
    );
    return res.json({
      pea_id,
      pea_nome,
      pea_descricao,
    });
  }

  async update(req, res) {
    const validator = new PerfilAreaValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const perfilArea = await PerfilArea.findByPk(req.params.id, {
      logging: false,
    });
    if (!perfilArea) {
      return res.status(400).json({ error: 'Perfil de área não encontrado' });
    }
    await perfilArea.update(req.body, { logging: false });
    return res.json(perfilArea);
  }

  async delete(req, res) {
    const perfilArea = await PerfilArea.findByPk(req.params.id, {
      logging: false,
    });
    if (!perfilArea) {
      return res.status(400).json({ error: 'Perfil de área não encontrado' });
    }
    await perfilArea
      .destroy({ logging: false })
      .then(() => {})
      .catch(function(err) {
        if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
          return res.status(400).json({
            error:
              'Erro ao excluir perfil de área. O perfil de área possui uma ou mais ligações.',
          });
        }
      });
    return res.send();
  }
}
export default new PerfilAreaController();
