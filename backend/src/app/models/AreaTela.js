import Sequelize, { Model } from 'sequelize';

class AreaTela extends Model {
  static init(sequelize) {
    super.init(
      {
        atl_id: {
          type: Sequelize.INTEGER,
          defaultValue: "nextval('spa2.area_tela_atl_id_seq')",
          primaryKey: true,
          autoIncrement: true,
        },
        set_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tel_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        versao: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        tableName: 'area_tela',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }
}

export default AreaTela;
