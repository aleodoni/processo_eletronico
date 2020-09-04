'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('nome_pas_pad', {
            nom_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            nom_matricula: {
                type: Sequelize.STRING(5),
                allowNull: false
            },
            nom_nome: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            nom_area_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            nom_area_nome: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            pro_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'processo', key: 'pro_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            nom_login: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('nome_pas_pad');
    }
};
