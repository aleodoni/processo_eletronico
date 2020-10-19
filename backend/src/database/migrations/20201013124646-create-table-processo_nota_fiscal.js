'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('processo_nota_fiscal', {
            pnf_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            pro_id_pai: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'processo', key: 'pro_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            pnf_nota_fiscal: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('processo_nota_fiscal');
    }
};
