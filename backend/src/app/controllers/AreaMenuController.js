/* eslint-disable consistent-return */
/* eslint-disable func-names */
import AreaMenu from '../models/AreaMenu';

class AreaMenuController {
  async index(req, res) {
    const areaMenus = await AreaMenu.findAll({
      attributes: ['amu_id', 'set_id', 'mmu_id'],
      logging: false,
    });
    return res.json(areaMenus);
  }

  async store(req, res) {
    const { amu_id, set_id, mmu_id } = await AreaMenu.create(req.body, {
      logging: false,
    });
    return res.json({
      amu_id,
      set_id,
      mmu_id,
    });
  }

  async update(req, res) {
    const areaMenu = await AreaMenu.findByPk(req.params.id, { logging: false });
    if (!areaMenu) {
      return res.status(400).json({ error: 'Área de menu não encontrado' });
    }
    await areaMenu.update(req.body, { logging: false });
    return res.json(areaMenu);
  }

  async delete(req, res) {
    const areaMenu = await AreaMenu.findByPk(req.params.id, { logging: false });
    if (!areaMenu) {
      return res.status(400).json({ error: 'Área de menu não encontrado' });
    }
    await areaMenu
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
export default new AreaMenuController();
