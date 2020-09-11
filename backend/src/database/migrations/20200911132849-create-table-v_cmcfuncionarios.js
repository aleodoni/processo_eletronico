'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('v_cmcfuncionarios', {
            matricula: {
                type: Sequelize.STRING(5),
                primaryKey: true,
                allowNull: false
            },
            pessoa: {
                type: Sequelize.INTEGER
            },
            pes_nome: {
                type: Sequelize.STRING(200)
            },
            funcao: {
                type: Sequelize.INTEGER
            },
            set_id: {
                type: Sequelize.INTEGER
            },
            ind_estagiario: {
                type: Sequelize.INTEGER
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('v_cmcfuncionarios');
    }
};
