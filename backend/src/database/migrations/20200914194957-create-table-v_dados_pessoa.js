'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('v_dados_pessoa', {
            pes_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            pes_celular: {
                type: Sequelize.STRING(50)
            },
            pes_ci: {
                type: Sequelize.STRING(30)
            },
            pes_email: {
                type: Sequelize.STRING(200)
            },
            fone: {
                type: Sequelize.STRING(50)
            },
            pes_matricula: {
                type: Sequelize.STRING(5)
            },
            pes_nome: {
                type: Sequelize.STRING(200)
            },
            pes_cpf: {
                type: Sequelize.BIGINT
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('v_dados_pessoa');
    }
};
