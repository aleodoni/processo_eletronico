'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('comissao_processante', {
            cop_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            mco_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'membro_comissao', key: 'mco_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            pro_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'processo', key: 'pro_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            cop_presidente: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('comissao_processante');
    }
};
