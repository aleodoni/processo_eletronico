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
            'nod_parecer_projuris_aposentadoria', {
                type: sequelize.BOOLEAN,
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
            await queryInterface.removeColumn({ tableName: 'nodo', schema: 'spa2' }, 'nod_parecer_projuris_aposentadoria');
            await transaction.commit();

            return Promise.resolve();
        } catch (err) {
            await transaction.rollback();
            return Promise.reject(err);
        }
    }
};
