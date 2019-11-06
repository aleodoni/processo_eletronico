import Sequelize, { Model } from 'sequelize';

class TelaNoPerfil extends Model {
  static init(sequelize) {
    super.init(
      {
        tel_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        pet_id: {
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
        tableName: 'tela_no_perfil',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Tela, {
      foreignKey: 'tel_id',
    });

    this.belongsTo(models.PerfilTela, {
      foreignKey: 'pet_id',
    });
  }
}

export default TelaNoPerfil;
