import Sequelize, { Model } from 'sequelize';

class DataHoraAtual extends Model {
  static init(sequelize) {
    super.init(
      {
        data_hora_atual: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        tableName: 'v_data_hora',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }
}

export default DataHoraAtual;
