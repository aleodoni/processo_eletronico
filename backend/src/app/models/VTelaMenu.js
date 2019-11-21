import Sequelize, { Model } from 'sequelize';

class VTelaMenu extends Model {
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
        nome_pai: {
          type: Sequelize.STRING,
        },
        mmu_id: {
          type: Sequelize.INTEGER,
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
          type: Sequelize.STRING,
        },
      },
      {
        tableName: 'v_tela_menu',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }

}

export default VTelaMenu;
