import Sequelize, { Model } from 'sequelize';

class VSigilo extends Model {
    static init(sequelize) {
        super.init(
            {
                sig_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                area_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                tpr_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                tpr_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                sig_login: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                set_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                }

            },
            {
                tableName: 'v_sigilo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VSigilo;
