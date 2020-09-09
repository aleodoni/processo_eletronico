import Sequelize, { Model } from 'sequelize';

class Banco extends Model {
    static init(sequelize) {
        super.init(
            {
                ban_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.banco_ban_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                ban_numero: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                ban_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'banco',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default Banco;
