'use strict';

const sequelize = require('sequelize');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addColumn({
                tableName: 'arquivo',
                schema: 'spa2'
            },
            'arq_hash', {
                type: sequelize.STRING(64)
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
            await transaction.commit();

            return Promise.resolve();
        } catch (err) {
            await transaction.rollback();
            return Promise.reject(err);
        }
    }
};
