'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('audit_banco_passado', {
            reg_tabela: {
                type: Sequelize.STRING,
                allowNull: false
            },
            reg_login: {
                type: Sequelize.STRING,
                allowNull: false
            },
            reg_terminal: {
                type: Sequelize.STRING,
                allowNull: false
            },
            reg_data: {
                type: Sequelize.DATE,
                allowNull: false
            },
            reg_operacao: {
                type: Sequelize.STRING(1),
                allowNull: false
            },
            reg_coluna: {
                type: Sequelize.STRING
            },
            reg_chave: {
                type: Sequelize.STRING,
                allowNull: false
            },
            reg_valor_anterior: {
                type: Sequelize.STRING
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('audit_banco_passado');
    }
};
