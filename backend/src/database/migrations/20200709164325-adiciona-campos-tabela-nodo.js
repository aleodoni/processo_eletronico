'use strict';

const sequelize = require('sequelize');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addColumn({
                tableName: 'nodo',
                schema: 'spa2'
            },
            'nod_decisao', {
                type: sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }, { transaction });

            await queryInterface.addColumn({
                tableName: 'nodo',
                schema: 'spa2'
            },
            'nod_interessado', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }, { transaction });

            await queryInterface.addColumn({
                tableName: 'nodo',
                schema: 'spa2'
            },
            'nod_ciencia', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }, { transaction });

            await queryInterface.addColumn({
                tableName: 'nodo',
                schema: 'spa2'
            },
            'nod_averbacao', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }, { transaction });

            await queryInterface.addColumn({
                tableName: 'nodo',
                schema: 'spa2'
            },
            'nod_ciencia_averbacao', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }, { transaction });

            await queryInterface.addColumn({
                tableName: 'nodo',
                schema: 'spa2'
            },
            'nod_aval_horario', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }, { transaction });

            await queryInterface.addColumn({
                tableName: 'nodo',
                schema: 'spa2'
            },
            'nod_contagem_tempo', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }, { transaction });

            await queryInterface.addColumn({
                tableName: 'nodo',
                schema: 'spa2'
            },
            'nod_ciencia_calculo', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }, { transaction });

            await transaction.commit();

            return Promise.resolve();
        } catch (err) {
            await transaction.rollback();
            return Promise.reject(err);
        }
    },

    down: async(queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_decisao');
            queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_interessado');
            queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_ciencia');
            queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_averbacao');
            queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_ciencia_averbacao');
            queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_aval_horario');
            queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_contagem_tempo');
            queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_ciencia_calculo');
            await transaction.commit();

            return Promise.resolve();
        } catch (err) {
            await transaction.rollback();
            return Promise.reject(err);
        }
    }
};
