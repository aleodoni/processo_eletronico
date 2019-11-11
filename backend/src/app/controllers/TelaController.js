/* eslint-disable consistent-return */
/* eslint-disable func-names */
import Tela from '../models/Tela';
import TelaValidator from '../validators/TelaValidator';

class TelaController {
  async index(req, res) {
    const telas = await Tela.findAll({
      order: ['tel_nome'],
      attributes: ['tel_id', 'tel_nome'],
      logging: false,
    });
    return res.json(telas);
  }

  async store(req, res) {
    const validator = new TelaValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const { tel_id, tel_nome } = await Tela.create(req.body, {
      logging: false,
    });
    return res.json({
      tel_id,
      tel_nome,
    });
  }

  async update(req, res) {
    const validator = new TelaValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const tela = await Tela.findByPk(req.params.id, { logging: false });
    if (!tela) {
      return res.status(400).json({ error: 'Tela não encontrada' });
    }
    await tela.update(req.body, { logging: false });
    return res.json(tela);
  }

  async delete(req, res) {
    const tela = await Tela.findByPk(req.params.id, { logging: false });
    if (!tela) {
      return res.status(400).json({ error: 'Tela não encontrada' });
    }
    await tela
      .destroy({ logging: false })
      .then(() => {})
      .catch(function(err) {
        if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
          return res.status(400).json({
            error: 'Erro ao excluir tela. A tela possui uma ou mais ligações.',
          });
        }
      });
    return res.send();
  }
}
export default new TelaController();
