import Sequelize, { Model } from 'sequelize';

class VManifestacaoProcesso extends Model {
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
                tmn_nome: {
                    type: Sequelize.STRING
                },
                man_login: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                set_nome: {
                    type: Sequelize.STRING
                },
                man_data: {
                    type: Sequelize.NOW
                }

            },
            {
                tableName: 'v_manifestacao_processo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VManifestacaoProcesso;
