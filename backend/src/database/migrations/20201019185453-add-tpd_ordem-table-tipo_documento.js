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
            'tpd_ordem', {
                type: sequelize.INTEGER
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
