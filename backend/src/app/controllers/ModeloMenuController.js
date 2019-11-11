/* eslint-disable consistent-return */
/* eslint-disable func-names */
import ModeloMenu from '../models/ModeloMenu';
import ModeloMenuValidator from '../validators/ModeloMenuValidator';

class ModeloMenuController {
  async index(req, res) {
    const modeloMenus = await ModeloMenu.findAll({
      order: ['mmu_nome'],
      attributes: ['mmu_id', 'mmu_nome'],
      logging: false,
    });
    return res.json(modeloMenus);
  }

  async store(req, res) {
    const validator = new ModeloMenuValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const { mmu_id, mmu_nome } = await ModeloMenu.create(req.body, {
      logging: false,
    });
    return res.json({
      mmu_id,
      mmu_nome,
    });
  }

  async update(req, res) {
    const validator = new ModeloMenuValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const menu = await ModeloMenu.findByPk(req.params.id, { logging: false });
    if (!menu) {
      return res.status(400).json({ error: 'Modelo de menu não encontrado' });
    }
    await menu.update(req.body, { logging: false });
    return res.json(menu);
  }

  async delete(req, res) {
    const menu = await ModeloMenu.findByPk(req.params.id, { logging: false });
    if (!menu) {
      return res.status(400).json({ error: 'Modelo de menu não encontrado' });
    }
    await menu
      .destroy({ logging: false })
      .then(() => {})
      .catch(function(err) {
        if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
          return res.status(400).json({
            error:
              'Erro ao excluir modelo de menu. O modelo de menu possui uma ou mais ligações.',
          });
        }
      });
    return res.send();
  }
}
export default new ModeloMenuController();
