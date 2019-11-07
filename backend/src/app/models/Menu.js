import Sequelize, { Model } from 'sequelize';

class Tela extends Model {
  static init(sequelize) {
    super.init(
      {
        men_id: {
          type: Sequelize.INTEGER,
          defaultValue: "nextval('spa2.menu_men_id_seq')",
          primaryKey: true,
          autoIncrement: true,
        },
        men_id_pai: {
          type: Sequelize.INTEGER,
        },
        men_nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        men_url: {
          type: Sequelize.STRING,
        },
        tel_id: {
          type: Sequelize.INTEGER,
        },
        versao: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        tableName: 'menu',
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
  }
}

export default Tela;
