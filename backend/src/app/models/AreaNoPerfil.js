import Sequelize, { Model } from 'sequelize';

class AreaNoPerfil extends Model {
  static init(sequelize) {
    super.init(
      {
        set_id: {
          type: Sequelize.STRING,
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
        tableName: 'area_no_perfil',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.PerfilArea, {
      foreignKey: 'pea_id',
    });
  }
}

export default AreaNoPerfil;
