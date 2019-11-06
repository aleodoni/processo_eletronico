/* eslint-disable consistent-return */
/* eslint-disable func-names */
import PerfilTela from '../models/PerfilTela';
import PerfilTelaValidator from '../validators/PerfilTelaValidator';

class PerfilTelaController {
  async index(req, res) {
    const perfilTelas = await PerfilTela.findAll({
      order: ['pet_nome'],
      attributes: ['pet_id', 'pet_nome', 'pet_descricao'],
      logging: false,
    });
    return res.json(perfilTelas);
  }

  async store(req, res) {
    const validator = new PerfilTelaValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const { pet_id, pet_nome, pet_descricao } = await PerfilTela.create(req.body, {
      logging: false,
    });
    return res.json({
      pet_id,
      pet_nome,
      pet_descricao,
    });
  }

  async update(req, res) {
    const validator = new PerfilTelaValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const perfilTela = await PerfilTela.findByPk(req.params.id, {
      logging: false,
    });
    if (!perfilTela) {
      return res.status(400).json({ error: 'Perfil de tela não encontrado' });
    }
    await perfilTela.update(req.body, { logging: false });
    return res.json(perfilTela);
  }

  async delete(req, res) {
    const perfilTela = await PerfilTela.findByPk(req.params.id, {
      logging: false,
    });
    if (!perfilTela) {
      return res.status(400).json({ error: 'Perfil de tela não encontrado' });
    }
    await perfilTela
      .destroy({ logging: false })
      .then(() => {})
      .catch(function(err) {
        if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
          return res.status(400).json({
            error: 'Erro ao excluir perfil de tela. O perfil de tela possui uma ou mais ligações.',
          });
        }
      });
    return res.send();
  }
}
export default new PerfilTelaController();
