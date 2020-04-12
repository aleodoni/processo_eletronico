import Sequelize, { Model } from 'sequelize';

class Lotacao extends Model {
    static init(sequelize) {
        super.init(
            {
                matricula: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    primaryKey: true
                },
                pes_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                set_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                pes_login: {
                    type: Sequelize.STRING,
                    allowNull: false
                }

            },
            {
                tableName: 'lotacao',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default Lotacao;
