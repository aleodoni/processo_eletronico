'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('area_menu', {
            amu_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            set_id: {
                type: Sequelize.STRING(4),
                allowNull: false
            },
            mmu_id: {
                type: Sequelize.INTEGER,
                references: { model: 'modelo_menu', key: 'mmu_id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            versao: {
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
        return queryInterface.dropTable('area_menu');
    }
};
