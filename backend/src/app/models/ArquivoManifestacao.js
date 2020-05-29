import Sequelize, { Model } from 'sequelize';

class ArquivoManifestacao extends Model {
    static init(sequelize) {
        super.init(
            {
                contador: {
                    type: Sequelize.STRING
                },
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
                data: {
                    type: Sequelize.STRING
                },
                arq_login: {
                    type: Sequelize.STRING
                },
                tpd_nome: {
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
