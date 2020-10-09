'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('banco', {
            ban_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            ban_numero: {
                type: Sequelize.STRING(4),
                allowNull: false
            },
            ban_nome: {
                type: Sequelize.STRING(120),
                allowNull: false
            }
        },

        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('banco');
    }
};
