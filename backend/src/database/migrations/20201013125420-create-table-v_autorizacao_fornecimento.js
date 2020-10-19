'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('v_autorizacao_fornecimento', {
            afo_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            for_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            afo_autorizacao: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            afo_numero_nad: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            afo_data: {
                type: Sequelize.DATE,
                allowNull: false
            },
            afo_valor_global: {
                type: Sequelize.DECIMAL(7, 2),
                allowNull: false
            },
            afo_tipo_empenho: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            afo_data_liquidacao: {
                type: Sequelize.DATE
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('v_autorizacao_fornecimento');
    }
};
