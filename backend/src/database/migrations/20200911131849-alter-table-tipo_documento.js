'use strict';

const sequelize = require('sequelize');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addColumn({
                tableName: 'tipo_documento',
                schema: 'spa2'
            },
            'tpd_visivel', {
                type: sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
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
            // await queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_decisao');
            // queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_interessado');
            // queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_ciencia');
            // queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_averbacao');
            // queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_ciencia_averbacao');
            // queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_aval_horario');
            // queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_contagem_tempo');
            // queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_ciencia_calculo');
            await transaction.commit();

            return Promise.resolve();
        } catch (err) {
            await transaction.rollback();
            return Promise.reject(err);
        }
    }
};
