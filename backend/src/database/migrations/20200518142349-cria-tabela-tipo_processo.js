'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tipo_processo', {
            tpr_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            tpr_nome: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            tpr_visualizacao: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            versao: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            gen_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'genero', key: 'gen_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            flu_id: {
                type: Sequelize.INTEGER,
                references: { model: 'fluxo', key: 'flu_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            tpr_pessoal: {
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
        return queryInterface.dropTable('tipo_processo');
    }
};
