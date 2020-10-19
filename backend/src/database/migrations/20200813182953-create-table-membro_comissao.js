'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('membro_comissao', {
            mco_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            area_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            mco_matricula: {
                type: Sequelize.STRING(5),
                allowNull: false
            },
            mco_nome: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            mco_area_id_membro: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            mco_ativo: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            },
            mco_login: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('membro_comissao');
    }
};
