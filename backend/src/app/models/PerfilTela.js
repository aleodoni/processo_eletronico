import Sequelize, { Model } from 'sequelize';

class PerfilTela extends Model {
  static init(sequelize) {
    super.init(
      {
        pet_id: {
          type: Sequelize.INTEGER,
          defaultValue: "nextval('spa2.perfil_tela_pet_id_seq')",
          primaryKey: true,
          autoIncrement: true,
        },
        pet_nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        pet_descricao: {
          type: Sequelize.STRING,
        },
        versao: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        tableName: 'perfil_tela',
        schema: 'spa2',
        sequelize,
        operatorsAliases: false,
      }
    );

    return this;
  }
}

export default PerfilTela;
