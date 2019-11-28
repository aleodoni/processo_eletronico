import Sequelize, { Model } from 'sequelize';

class VDadosPessoa extends Model {
  static init(sequelize) {
    super.init(
      {
        pes_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        pes_celular: {
          type: Sequelize.STRING,
        },
        pes_ci: {
          type: Sequelize.STRING,
        },
        pes_cpf: {
          type: Sequelize.STRING,
        },
        pes_email: {
          type: Sequelize.STRING,
        },
        fone: {
          type: Sequelize.STRING,
        },
        pes_matricula: {
          type: Sequelize.INTEGER,
        },
        pes_nome: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: 'v_dados_pessoa',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }
}

export default VDadosPessoa;
