'use strict';

const sequelize = require('sequelize');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addColumn({
                tableName: 'processo',
                schema: 'spa2'
            },
            'pro_processo_pai', {
                type: sequelize.STRING(14),
                allowNull: false,
                default: 'Não necessário'
            }, { transaction });

            await queryInterface.addColumn({
                tableName: 'processo',
                schema: 'spa2'
            },
            'pro_ip_externo', {
                type: sequelize.STRING(15),
                allowNull: false,
                default: 'Não necessário'
            }, { transaction });

            await queryInterface.addColumn({
                tableName: 'processo',
                schema: 'spa2'
            },
            'pro_enviado_externo', {
                type: sequelize.BOOLEAN,
                allowNull: false,
                default: false
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
