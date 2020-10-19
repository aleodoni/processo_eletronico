'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('v_empenho_fornecedor', {
            emf_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            emf_numero_empenho: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            emf_ano_empenho: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            for_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            emf_valor_global: {
                type: Sequelize.DECIMAL(9, 2),
                allowNull: false
            },
            emf_data_emissao: {
                type: Sequelize.DATE,
                allowNull: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('v_empenho_fornecedor');
    }
};
