/* eslint-disable consistent-return */
/* eslint-disable func-names */
import Genero from '../models/Genero';
import GeneroValidator from '../validators/GeneroValidator';

class GeneroController {
  async index(req, res) {
    const generos = await Genero.findAll({
      order: ['gen_nome'],
      attributes: ['gen_id', 'gen_nome'],
      logging: false,
    });
    return res.json(generos);
  }

  async store(req, res) {
    const validator = new GeneroValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const { gen_id, gen_nome } = await Genero.create(req.body, {
      logging: false,
    });
    return res.json({
      gen_id,
      gen_nome,
    });
  }

  async update(req, res) {
    const validator = new GeneroValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const genero = await Genero.findByPk(req.params.id, { logging: false });
    if (!genero) {
      return res.status(400).json({ error: 'Gênero não encontrado' });
    }
    await genero.update(req.body, { logging: false });
    return res.json(genero);
  }

  async delete(req, res) {
    const genero = await Genero.findByPk(req.params.id, { logging: false });
    if (!genero) {
      return res.status(400).json({ error: 'Gênero não encontrado' });
    }
    await genero
      .destroy({ logging: false })
      .then(() => {})
      .catch(function(err) {
        if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
          return res.status(400).json({
            error: 'Erro ao excluir gênero. O gênero possui uma ou mais ligações.',
          });
        }
      });
    return res.send();
  }
}
export default new GeneroController();
