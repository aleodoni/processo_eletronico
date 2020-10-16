'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('arquivo_fornecedor', {
            aqf_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            aqf_nome: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            acf_cpf_cnpj: {
                type: Sequelize.STRING(14),
                allowNull: false
            },
            aqf_tipo: {
                type: Sequelize.STRING(200)
            },
            tpd_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'tipo_documento', key: 'tpd_id' },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            aqf_data_inclusao: {
                type: Sequelize.DATE,
                allowNull: false
            },
            aqf_data_vencimento: {
                type: Sequelize.DATE
            },
            aqf_num_bytes: {
                type: Sequelize.INTEGER
            },
            aqf_hash_arquivo: {
                type: Sequelize.STRING(200),
                allowNull: false
            }
        },
        {
            schema: 'spa2'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('arquivo_fornecedor');
    }
};
