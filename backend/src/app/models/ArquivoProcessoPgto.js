import Sequelize, { Model } from 'sequelize';

class ArquivoProcessoPgto extends Model {
    static init(sequelize) {
        super.init(
            {
                arq_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                arq_nome: {
                    type: Sequelize.STRING
                },
                arq_nome_visivel: {
                    type: Sequelize.STRING
                },
                pro_id: {
                    type: Sequelize.INTEGER
                },
                arq_tipo: {
                    type: Sequelize.STRING
                },
                arq_doc_id: {
                    type: Sequelize.INTEGER
                },
                pro_ano: {
                    type: Sequelize.INTEGER
                },
                arq_data: {
                    type: Sequelize.STRING
                },
                arq_login: {
                    type: Sequelize.STRING
                },
                arq_hash: {
                    type: Sequelize.STRING
                },
                arq_cancelado: {
                    type: Sequelize.BOOLEAN
                },
                tpd_id: {
                    type: Sequelize.INTEGER
                },
                tpd_nome: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_arquivo_processo_pgto',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default ArquivoProcessoPgto;
