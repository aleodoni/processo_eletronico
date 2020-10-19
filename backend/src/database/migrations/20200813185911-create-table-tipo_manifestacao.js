'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tipo_manifestacao', {
            tmn_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            tmn_nome: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            versao: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            tmn_publica: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tipo_manifestacao');
    }
};
