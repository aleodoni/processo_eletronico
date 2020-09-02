import Sequelize, { Model } from 'sequelize';

class VFornecedores extends Model {
    static init(sequelize) {
        super.init(
            {
                for_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                for_nome: {
                    type: Sequelize.STRING
                },
                for_cnpj_cpf: {
                    type: Sequelize.STRING
                },
                for_fone: {
                    type: Sequelize.STRING
                },
                for_celular: {
                    type: Sequelize.STRING
                },
                for_email: {
                    type: Sequelize.STRING
                },
                for_contato: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'v_fornecedores',
                schema: 'spa2',
                sequelize,
                operatorsAliases: false
            }
        );

        return this;
    }
}

export default VFornecedores;
