'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('v_cmclotacaousuario', {
            set_id: {
                type: Sequelize.STRING(20),
                primaryKey: true,
                allowNull: false
            },
            set_nome: {
                type: Sequelize.STRING(200)
            },
            set_sigla: {
                type: Sequelize.STRING(100)
            },
            modelolotacao: {
                type: Sequelize.INTEGER
            },
            nivellotacao: {
                type: Sequelize.INTEGER
            },
            ativo: {
                type: Sequelize.STRING(1)
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('v_cmclotacaousuario');
    }
};
