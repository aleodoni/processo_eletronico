import Sequelize, { Model } from 'sequelize';

class ModeloMenu extends Model {
  static init(sequelize) {
    super.init(
      {
        mmu_id: {
          type: Sequelize.INTEGER,
          defaultValue: "nextval('spa2.modelo_menu_mmu_id_seq')",
          primaryKey: true,
          autoIncrement: true,
        },
        mmu_nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        versao: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        tableName: 'modelo_menu',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }
}

export default ModeloMenu;
