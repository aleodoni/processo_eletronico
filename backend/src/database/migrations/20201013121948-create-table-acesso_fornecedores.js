'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('acesso_fornecedores', {
            acf_cpf_cnpj: {
                type: Sequelize.STRING(14),
                primaryKey: true,
                allowNull: false
            },
            acf_acesso: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            acf_ativo: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('acesso_fornecedores');
    }
};
