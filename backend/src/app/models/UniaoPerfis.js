import Sequelize, { Model } from 'sequelize';

class UniaoPerfis extends Model {
  static init(sequelize) {
    super.init(
      {
        pet_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        pea_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        versao: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        tableName: 'uniao_perfis',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.PerfilTela, {
      foreignKey: 'pet_id',
    });

    this.belongsTo(models.PerfilArea, {
      foreignKey: 'pea_id',
    });
  }
}

export default UniaoPerfis;
