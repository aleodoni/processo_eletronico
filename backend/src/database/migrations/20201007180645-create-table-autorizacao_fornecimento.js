'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('autorizacao_fornecimento', {
            aut_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            for_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            aut_referencia: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            aut_nf: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            aut_data_expedicao_nf: {
                type: Sequelize.DATE,
                allowNull: false
            },
            aut_valor: {
                type: Sequelize.DECIMAL(9, 2),
                allowNull: false
            },
            ban_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'banco', key: 'ban_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            aut_ban_agencia: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            aut_ban_conta_corrente: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            aut_data_cadastro: {
                type: Sequelize.DATE,
                allowNull: false
            },
            pro_id: {
                type: Sequelize.INTEGER,
                references: { model: 'processo', key: 'pro_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('autorizacao_fornecimento');
    }
};
