'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('v_setor', {

            set_nome: {
                type: Sequelize.STRING(200)
            },
            set_sigla: {
                type: Sequelize.STRING(100)
            },
            set_inativacao: {
                type: Sequelize.DATE
            },
            set_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            set_id_superior: {
                type: Sequelize.INTEGER
            },
            set_ativo: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            set_tipo: {
                type: Sequelize.STRING(1),
                allowNull: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('v_setor');
    }
};
