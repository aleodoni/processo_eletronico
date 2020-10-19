import Sequelize, { Model } from 'sequelize';

class VAutorizacaoArquivo extends Model {
    static init(sequelize) {
        super.init(
            {
                aut_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                fornecedor: {
                    type: Sequelize.STRING
                },
                cnpj_cpf: {
                    type: Sequelize.STRING
                },
                referencia: {
                    type: Sequelize.STRING
                },
                nota_fiscal: {
                    type: Sequelize.STRING
                },
                data_expedicao_nf: {
                    type: Sequelize.STRING
                },
                valor: {
                    type: Sequelize.STRING
                },
                agencia: {
                    type: Sequelize.STRING
                },
                conta_corrente: {
                    type: Sequelize.STRING
                },
                data_cadastro: {
                    type: Sequelize.STRING
                },
                banco: {
                    type: Sequelize.STRING
                },
                fone: {
                    type: Sequelize.STRING
                },
                email: {
                    type: Sequelize.STRING
                },
                contato: {
                    type: Sequelize.STRING
                },
                aut_fatura_boleto: {
                    type: Sequelize.BOOLEAN
                }
            },
            {
                tableName: 'v_autorizacao_arquivo',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VAutorizacaoArquivo;
