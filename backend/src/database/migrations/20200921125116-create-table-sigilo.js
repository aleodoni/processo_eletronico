'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('sigilo', {
            sig_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            area_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            tpr_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'tipo_processo', key: 'tpr_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            sig_login: {

                type: Sequelize.STRING(50),
                allowNull: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('sigilo');
    }
};
