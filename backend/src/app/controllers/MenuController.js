/* eslint-disable consistent-return */
/* eslint-disable func-names */
import Sequelize from 'sequelize';
import Menu from '../models/Menu';
import VTelaMenu from '../models/VTelaMenu';
import VMenuPai from '../models/VMenuPai';
import DataHoraAtual from '../models/DataHoraAtual';
import MenuValidator from '../validators/MenuValidator';
import AuditoriaController from './AuditoriaController';
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
        'mmu_id',
        'men_ordem_pai',
      ],
      logging: false,
    });
    return res.json(menus);
  }

  async telaMenu(req, res) {
    const telaMenus = await VTelaMenu.findAll({
      order: ['mmu_nome','men_ordem_pai'],
      attributes: [
        'men_id',
        'men_id_pai',
        'nome_pai',
        'mmu_id',
        'mmu_nome',
        'men_nome',
        'men_url',
        'tel_id',
        'tel_nome',
        'men_ordem_pai',
      ],
      logging: false,
    });
    return res.json(telaMenus);
  }

  async telaPai(req, res) {
    const telaPai = await VMenuPai.findAll({
      attributes: [
        'men_id',
        'nome_pai',
      ],
      logging: false,
    });
    return res.json(telaPai);
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
      mmu_id,
      men_ordem_pai,
    } = await Menu.create(req.body, {
      logging: false,
    });
    //auditoria de inserção
    AuditoriaController.audita(req.body, req, 'I', men_id);
    //
    return res.json({
      men_id,
      men_id_pai,
      men_nome,
      men_url,
      tel_id,
      mmu_id,
      men_ordem_pai,
    });
  }

  async update(req, res) {
    const validator = new MenuValidator();
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }
    const menu = await Menu.findByPk(req.params.id, { logging: false });
    //auditoria de edição
    AuditoriaController.audita(
      menu._previousDataValues,
      req,
      'U',
      req.params.id
    );
    //
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
      .then(auditoria => {
        //auditoria de deleção
        AuditoriaController.audita(
          menu._previousDataValues,
          req,
          'D',
          req.params.id
        );
        //
      })
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
