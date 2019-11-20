/* eslint-disable consistent-return */
/* eslint-disable func-names */
import Sequelize from 'sequelize';
import Menu from '../models/Menu';
import DataHoraAtual from '../models/DataHoraAtual';
import MenuValidator from '../validators/MenuValidator';
require('dotenv/config');

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
        'mmu_id',
        'men_ordem_pai',
        'men_ordem_filho',
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
      mmu_id,
      men_ordem_pai,
      men_ordem_filho,
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
      mmu_id,
      men_ordem_pai,
      men_ordem_filho,
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
    const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
      host: process.env.DB_HOST,
      dialect: 'postgres',
      define: {
        timestamps: false,
        underscoredAll: true,
      },
      pool: {
        max: 7,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
    const area = req.params.area;
    
    let sql = "select spa2.monta_menu_raiz('"+area+"')";
    sequelize.query(sql,{
      logging: false,
      plain: true,
      raw: true,
    }).then(retorno => {
      return res.json(retorno.monta_menu_raiz);
    });
  }
  
}
export default new MenuController();
