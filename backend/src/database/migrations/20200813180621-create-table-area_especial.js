'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('area_especial', {
            login: {
                type: Sequelize.STRING(100),
                allowNull: false,
                primaryKey: true
            },
            set_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            set_id_superior: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('area_especial');
    }
};
