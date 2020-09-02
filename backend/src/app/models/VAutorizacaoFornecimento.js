import Sequelize, { Model } from 'sequelize';

class VAutorizacaoFornecimento extends Model {
    static init(sequelize) {
        super.init(
            {
                afo_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                for_id: {
                    type: Sequelize.INTEGER
                },
                afo_autorizacao: {
                    type: Sequelize.INTEGER
                },
                afo_numero_nad: {
                    type: Sequelize.INTEGER
                },
                afo_data: {
                    type: Sequelize.DATEONLY
                },
                afo_valor_global: {
                    type: Sequelize.DECIMAL(7, 2)
                },
                afo_tipo_empenho: {
                    type: Sequelize.INTEGER
                },
                afo_data_liquidacao: {
                    type: Sequelize.DATEONLY
                }
            },
            {
                tableName: 'v_autorizacao_fornecimento',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VAutorizacaoFornecimento;
