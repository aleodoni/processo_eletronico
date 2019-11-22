import Sequelize, { Model } from 'sequelize';

class VTipoProcesso extends Model {
  static init(sequelize) {
    super.init(
      {
        tpr_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        gen_id: {
          type: Sequelize.INTEGER,
        },
        tpr_visualizacao: {
          type: Sequelize.INTEGER,
        },
        tpr_nome: {
          type: Sequelize.STRING,
        },
        gen_nome: {
          type: Sequelize.STRING,
        },
        visualizacao: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: 'v_tipo_processo',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }

}

export default VTipoProcesso;
