'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('setor', {
            set_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            set_nome: {
                type: Sequelize.STRING(200)
            },
            set_sigla: {
                type: Sequelize.STRING(100)
            },
            set_inativacao: {
                type: Sequelize.DATE
            },
            set_id_area: {
                type: Sequelize.INTEGER
            },
            set_ativo: {
                type: Sequelize.BOOLEAN
            },
            set_tipo: {
                type: Sequelize.STRING(1)
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('setor');
    }
};
