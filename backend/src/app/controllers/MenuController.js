/* eslint-disable consistent-return */
/* eslint-disable func-names */
import Menu from '../models/Menu';
import MenuValidator from '../validators/MenuValidator';

class MenuController {
  async index(req, res) {
    const menus = await Menu.findAll({
      order: ['men_nome'],
      attributes: [
        'men_id',
        'men_id_pai',
        'men_nome',
        'men_url',
        'tel_id',
        'men_icone',
      ],
      logging: false,
    });
    return res.json(menus);
  }

  async store(req, res) {
    const validator = new MenuValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const {
      men_id,
      men_id_pai,
      men_nome,
      men_url,
      tel_id,
      men_icone,
    } = await Menu.create(req.body, {
      logging: false,
    });
    return res.json({
      men_id,
      men_id_pai,
      men_nome,
      men_url,
      tel_id,
      men_icone,
    });
  }

  async update(req, res) {
    const validator = new MenuValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const menu = await Menu.findByPk(req.params.id, { logging: false });
    if (!menu) {
      return res.status(400).json({ error: 'Menu não encontrado' });
    }
    await menu.update(req.body, { logging: false });
    return res.json(menu);
  }

  async delete(req, res) {
    const menu = await Menu.findByPk(req.params.id, { logging: false });
    if (!menu) {
      return res.status(400).json({ error: 'Menu não encontrado' });
    }
    await menu
      .destroy({ logging: false })
      .then(() => {})
      .catch(function(err) {
        if (err.toString().includes('SequelizeForeignKeyConstraintError')) {
          return res.status(400).json({
            error: 'Erro ao excluir menu. O menu possui uma ou mais ligações.',
          });
        }
      });
    return res.send();
  }
}
export default new MenuController();
