'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('menu', {
            men_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            men_id_pai: {
                type: Sequelize.INTEGER,
                references: { model: 'menu', key: 'men_id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            men_nome: {
                type: Sequelize.STRING(60),
                allowNull: false
            },
            men_url: {
                type: Sequelize.STRING(200)
            },
            tel_id: {
                type: Sequelize.INTEGER,
                references: { model: 'tela', key: 'tel_id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            versao: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            mmu_id: {
                type: Sequelize.INTEGER,
                references: { model: 'modelo_menu', key: 'mmu_id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            men_ordem_pai: {
                type: Sequelize.INTEGER
            },
            tel_interna: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('menu');
    }
};
