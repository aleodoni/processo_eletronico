'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tramite', {
            tra_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            pro_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            raz_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            login_envia: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            area_id_envia: {
                type: Sequelize.INTEGER
            },
            area_id_recebe: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            nod_id_envia: {
                type: Sequelize.INTEGER
            },
            nod_id_recebe: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            tra_inicial: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            versao: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            tra_envio: {
                type: Sequelize.DATE,
                allowNull: false
            },
            tra_retorno_discordancia: {
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
        return queryInterface.dropTable('tramite');
    }
};
