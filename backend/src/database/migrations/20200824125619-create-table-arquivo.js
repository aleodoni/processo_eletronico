'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('arquivo', {
            arq_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            arq_nome: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            pro_id: {
                type: Sequelize.INTEGER,
                references: { model: 'processo', key: 'pro_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            man_id: {
                type: Sequelize.INTEGER
            },
            arq_tipo: {
                type: Sequelize.STRING(100)
            },
            arq_removendo: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            arq_doc_id: {
                type: Sequelize.INTEGER
            },
            arq_doc_tipo: {
                type: Sequelize.STRING(15)
            },
            versao: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            tpd_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'tipo_documento', key: 'tpd_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            arq_data: {
                type: Sequelize.DATE,
                allowNull: false
            },
            arq_login: {
                type: Sequelize.STRING(30),
                allowNull: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('arquivo');
    }
};
