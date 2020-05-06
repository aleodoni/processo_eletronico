'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('proximo_tramite', {
            prx_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            prx_prioridade: {
                type: Sequelize.INTEGER,
                defaultValue: 10
            },
            nod_id: {
                type: Sequelize.INTEGER,
                references: { model: 'nodo', key: 'nod_id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            nod_id_proximo: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'nodo', key: 'nod_id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            raz_id: {
                type: Sequelize.INTEGER,
                references: { model: 'razao_tramite', key: 'raz_id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'

            },
            versao: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            flu_id: {
                type: Sequelize.INTEGER,
                references: { model: 'fluxo', key: 'flu_id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('proximo_tramite');
    }
};
