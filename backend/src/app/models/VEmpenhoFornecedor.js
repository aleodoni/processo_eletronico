import Sequelize, { Model } from 'sequelize';

class VEmpenhoFornecedor extends Model {
    static init(sequelize) {
        super.init(
            {
                emf_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                emf_numero_empenho: {
                    type: Sequelize.INTEGER
                },
                emf_ano_empenho: {
                    type: Sequelize.INTEGER
                },
                for_id: {
                    type: Sequelize.INTEGER
                },
                emf_valor_global: {
                    type: Sequelize.DECIMAL(7, 2)
                },
                afo_data_liquidacao: {
                    type: Sequelize.DATEONLY
                },
                emf_data_emissao: {
                    type: Sequelize.INTEGER
                }
            },
            {
                tableName: 'v_empenho_fornecedor',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VEmpenhoFornecedor;
