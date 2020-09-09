import Sequelize, { Model } from 'sequelize';

class AutorizacaoFornecimento extends Model {
    static init(sequelize) {
        super.init(
            {
                aut_id: {
                    type: Sequelize.INTEGER,
                    defaultValue: "nextval('spa2.autorizacao_fornecimento_aut_id_seq')",
                    primaryKey: true,
                    autoIncrement: true
                },
                for_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                ban_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                aut_data_expedicao_nf: {
                    type: Sequelize.DATEONLY,
                    allowNull: false
                },
                aut_valor: {
                    type: Sequelize.DECIMAL(9, 2)
                },
                aut_referencia: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                aut_nf: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                aut_ban_agencia: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                aut_ban_conta_corrente: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                aut_data_cadastro: {
                    type: Sequelize.NOW
                },
                pro_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }
            },
            {
                tableName: 'autorizacao_fornecimento',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default AutorizacaoFornecimento;
