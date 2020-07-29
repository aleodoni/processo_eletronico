import Sequelize, { Model } from 'sequelize';

class Sigilo extends Model {
    static init(sequelize) {
        super.init(
            {
                sig_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.sigilo_sig_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                area_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                tpr_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                sig_login: {
                    type: Sequelize.STRING,
                    allowNull: false
                }

            },
            {
                tableName: 'sigilo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default Sigilo;
