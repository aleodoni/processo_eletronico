'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('audit_sistema', {
            rea_tela: {
                type: Sequelize.STRING
            },
            rea_login: {
                type: Sequelize.STRING,
                allowNull: false
            },
            rea_terminal: {
                type: Sequelize.STRING,
                allowNull: false
            },
            rea_data: {
                type: Sequelize.DATE,
                allowNull: false
            },
            rea_operacao: {
                type: Sequelize.STRING(1),
                allowNull: false
            },
            rea_campo: {
                type: Sequelize.STRING
            },
            rea_valor_anterior: {
                type: Sequelize.STRING
            },
            rea_chave: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('audit_sistema');
    }
};
