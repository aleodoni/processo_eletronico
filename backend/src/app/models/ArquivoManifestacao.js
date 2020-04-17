import Sequelize, { Model } from 'sequelize';

class ArquivoManifestacao extends Model {
    static init(sequelize) {
        super.init(
            {
                arq_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                arq_nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                man_id: {
                    type: Sequelize.INTEGER
                },
                arq_tipo: {
                    type: Sequelize.STRING
                },
                pro_id: {
                    type: Sequelize.INTEGER
                },
                data: {
                    type: Sequelize.STRING
                },
                man_login: {
                    type: Sequelize.STRING
                },
                situacao: {
                    type: Sequelize.STRING
                },
                man_login_cancelamento: {
                    type: Sequelize.STRING
                },
                data_cancelamento: {
                    type: Sequelize.STRING
                },
                tmn_nome: {
                    type: Sequelize.STRING
                },
                set_nome: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_arquivos_manifestacao',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default ArquivoManifestacao;
