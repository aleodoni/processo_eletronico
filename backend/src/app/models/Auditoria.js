import Sequelize, { Model } from 'sequelize';

class Auditoria extends Model {
  static init(sequelize) {
    super.init(
      {
        rea_data: {
          type: Sequelize.NOW,
          primaryKey: true,
          allowNull: false,
        },
        rea_tela: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        rea_login: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        rea_terminal: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        rea_operacao: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        rea_campo: {
          type: Sequelize.STRING,
        },
        rea_valor_anterior: {
          type: Sequelize.STRING,
        },
        rea_chave: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'regapl_spa2',
        schema: 'auditoria',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }
}

export default Auditoria;
