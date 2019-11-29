import Sequelize, { Model } from 'sequelize';

class Tela extends Model {
    static init(sequelize) {
        super.init(
            {
                tel_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.tela_tel_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                tel_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }
            },
            {
                tableName: 'tela',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default Tela;
