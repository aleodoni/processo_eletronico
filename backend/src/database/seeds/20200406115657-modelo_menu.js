'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'modelo_menu', schema: 'spa2' },
        [
            {
                mmu_id: 1,
                mmu_nome: 'Modelo informática',
                versao: 0
            },
            {
                mmu_id: 2,
                mmu_nome: 'Modelo área comum',
                versao: 0
            },
            {
                mmu_id: 3,
                mmu_nome: 'Modelo área contabilidade',
                versao: 0
            },
            {
                mmu_id: 4,
                mmu_nome: 'Modelo gabinetes',
                versao: 0
            }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'modelo_menu', schema: 'spa2' },
        null,
        {}
    )
};
