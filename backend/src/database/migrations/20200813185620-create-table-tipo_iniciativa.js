'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tipo_iniciativa', {
            tin_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            tin_nome: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            versao: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            pro_iniciativa: {
                type: Sequelize.STRING(10),
                allowNull: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tipo_iniciativa');
    }
};
