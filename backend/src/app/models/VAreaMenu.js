import Sequelize, { Model } from 'sequelize';

class VAreaMenu extends Model {
  static init(sequelize) {
    super.init(
      {
        amu_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        mmu_id: {
          type: Sequelize.INTEGER,
        },
        set_id: {
          type: Sequelize.STRING,
        },
        mmu_nome: {
          type: Sequelize.STRING,
        },
        set_nome: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: 'v_area_menu',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }

}

export default VAreaMenu;
