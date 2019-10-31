import Sequelize, { Model } from 'sequelize';

class Autorizacao extends Model {
  static init(sequelize) {
    super.init(
      {
        pessoa: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        pes_nome: Sequelize.STRING,
        set_id: Sequelize.INTEGER,
      },
      {
        tableName: 'v_cmcfuncionarios',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }
}

export default Autorizacao;
