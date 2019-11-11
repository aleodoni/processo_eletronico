import Sequelize, { Model } from 'sequelize';

class VMenu extends Model {
  static init(sequelize) {
    super.init(
      {
        men_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        men_id_pai: {
          type: Sequelize.INTEGER,
        },
        set_id: {
          type: Sequelize.STRING,
        },
        mmu_nome: {
          type: Sequelize.STRING,
        },
        men_nome: {
          type: Sequelize.STRING,
        },
        men_url: {
          type: Sequelize.STRING,
        },
        tel_id: {
          type: Sequelize.INTEGER,
        },
        tel_nome: {
          type: Sequelize.STRING,
        },
        men_ordem_pai: {
          type: Sequelize.INTEGER,
        },
        men_ordem_filho: {
          type: Sequelize.INTEGER,
        },
      },
      {
        tableName: 'v_menu',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }

}

export default VMenu;
