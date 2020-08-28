'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('manifestacao', {
            man_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            pro_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'processo', key: 'pro_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            tmn_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'tipo_manifestacao', key: 'tmn_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            man_login: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            man_id_area: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            man_cancelada: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            man_login_cancelamento: {
                type: Sequelize.STRING(30)
            },
            versao: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            man_visto_executiva: {
                type: Sequelize.STRING(15),
                defaultValue: 'Não necessário',
                allowNull: false
            },
            man_data_cancelamento: {
                type: Sequelize.DATE
            },
            man_data: {
                type: Sequelize.DATE,
                allowNull: false
            },
            nod_id: {
                type: Sequelize.INTEGER
            },
            man_ciencia: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: 'Não necessário'
            },
            man_averbacao: {
                type: Sequelize.STRING(25),
                allowNull: false,
                defaultValue: 'Não necessário'
            },
            man_ciencia_averbacao: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: 'Não necessário'
            },
            man_aval_horario: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: 'Não necessário'
            },
            man_contagem_tempo: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: 'Não necessário'
            },
            man_ciencia_calculo: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: 'Não necessário'
            },
            man_tramitada: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            man_parecer_projuris_aposentadoria: {
                type: Sequelize.STRING(50),
                defaultValue: 'Não necessário',
                allowNull: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('manifestacao');
    }
};
