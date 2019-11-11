/* eslint-disable consistent-return */
/* eslint-disable func-names */
import Sequelize from 'sequelize';
import Menu from '../models/Menu';
import VMenu from '../models/VMenu';
import DataHoraAtual from '../models/DataHoraAtual';
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

  async dataAtual(req, res) {
    const dataAtual = await DataHoraAtual.findAll({
      attributes: ['data_hora_atual'],
      logging: false,
    });
    return res.json(dataAtual);
  }

  async montaMenu(req, res) {
    const { Op } = Sequelize;
    const menu = await VMenu.findAll({
      attributes: [
        'men_id',
        'men_id_pai',
        'set_id',
        'mmu_nome',
        'men_nome',
        'men_url',
        'men_icone',
        'tel_id',
        'tel_nome',
        'men_ordem_pai',
        'men_ordem_filho',
      ],
      where: {
        men_id_pai: {
          [Op.is]: null,
        },
        set_id: {
          [Op.eq]: req.params.area,
        },
      },
      order: [['men_ordem_pai', 'ASC']],
      logging: false,
    })
      .then(function(pai) {
        const items = new Array();
        for (let i = 0; i < pai.length; i++) {
          const objeto = {};
          objeto.label = pai[i].dataValues.men_nome;
          objeto.icon = pai[i].dataValues.men_icone;
          if (pai[i].dataValues.men_url !== null) {
            // objeto.command = pai[i].dataValues.men_url;
            objeto.url = pai[i].dataValues.men_url;
            // objeto.command = eval(comando);
          }
          items.push(objeto);
        }
        // console.log(items)
        return res.json(items);
      })
      .catch(function(err) {});
  }
}
export default new MenuController();
