import Sequelize, { Model } from 'sequelize';

class Manifestacao extends Model {
    static init(sequelize) {
        super.init(
            {
                man_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.manifestacao_man_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                pro_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                tmn_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                tpd_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                man_data: {
                    type: Sequelize.NOW
                },
                man_login: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                man_visto_executiva: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                man_id_area: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                man_cancelada: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                man_login_cancelamento: {
                    type: Sequelize.STRING
                },
                man_data_cancelamento: {
                    type: Sequelize.NOW
                },
                versao: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }

            },
            {
                tableName: 'manifestacao',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default Manifestacao;
