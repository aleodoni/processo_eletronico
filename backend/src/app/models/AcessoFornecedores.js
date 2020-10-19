import Sequelize, { Model } from 'sequelize';

class AcessoFornecedores extends Model {
    static init(sequelize) {
        super.init(
            {
                acf_cpf_cnpj: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                acf_acesso: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                acf_ativo: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true
                }
            },
            {
                tableName: 'acesso_fornecedores',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default AcessoFornecedores;
