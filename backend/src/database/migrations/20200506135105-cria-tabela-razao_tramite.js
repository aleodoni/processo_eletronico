'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('razao_tramite', {
            raz_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            raz_nome: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        },
        {
            schema: 'spa2'
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('razao_tramite');
    }
};
