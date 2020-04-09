'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('lotacao', {
            matricula: {
                type: Sequelize.STRING(5),
                allowNull: false,
                primaryKey: true
            },
            pes_nome: {
                type: Sequelize.STRING(200)
            },
            set_id: {
                type: Sequelize.INTEGER,
                references: { model: 'setor', key: 'set_id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            pes_login: {
                type: Sequelize.STRING(100)
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('lotacao');
    }
};
