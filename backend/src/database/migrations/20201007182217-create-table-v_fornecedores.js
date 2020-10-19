'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('v_fornecedores', {
            for_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            for_nome: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            for_cnpj_cpf: {
                type: Sequelize.STRING
            },
            for_fone: {
                type: Sequelize.STRING(30)
            },
            for_celular: {
                type: Sequelize.STRING(30)
            },
            for_email: {
                type: Sequelize.STRING(100)
            },
            for_contato: {
                type: Sequelize.STRING(100)
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('v_fornecedores');
    }
};
