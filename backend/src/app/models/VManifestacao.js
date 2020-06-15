import Sequelize, { Model } from 'sequelize';

class VManifestacao extends Model {
    static init(sequelize) {
        super.init(
            {
                man_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                pro_id: {
                    type: Sequelize.INTEGER
                },
                tmn_id: {
                    type: Sequelize.INTEGER
                },
                tmn_nome: {
                    type: Sequelize.STRING
                },
                man_login: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                man_id_area: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                set_nome: {
                    type: Sequelize.STRING
                },
                man_cancelada: {
                    type: Sequelize.BOOLEAN
                },
                man_login_cancelamento: {
                    type: Sequelize.STRING
                },
                man_visto_executiva: {
                    type: Sequelize.STRING
                },
                man_data_cancelamento: {
                    type: Sequelize.NOW
                },
                man_data: {
                    type: Sequelize.NOW
                },
                nod_id: {
                    type: Sequelize.INTEGER
                },
                man_ciencia: {
                    type: Sequelize.STRING
                },
                man_averbacao: {
                    type: Sequelize.STRING
                },
                man_ciencia_averbacao: {
                    type: Sequelize.STRING
                }

            },
            {
                tableName: 'v_manifestacao',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VManifestacao;
