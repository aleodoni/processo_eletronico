import Sequelize, { Model } from 'sequelize';

class PerfilArea extends Model {
  static init(sequelize) {
    super.init(
      {
        pea_id: {
          type: Sequelize.INTEGER,
          defaultValue: "nextval('spa2.perfil_area_pea_id_seq')",
          primaryKey: true,
          autoIncrement: true,
        },
        pea_nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        pea_descricao: {
          type: Sequelize.STRING,
        },
        versao: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        tableName: 'perfil_area',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }
}

export default PerfilArea;
