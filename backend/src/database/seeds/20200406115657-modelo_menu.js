'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
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
        );

        await queryInterface.sequelize.query('select setval(\'spa2.modelo_menu_mmu_id_seq\', coalesce(max(mmu_id), 0)+1, false) from spa2.modelo_menu;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'modelo_menu', schema: 'spa2' },
        null,
        {}
    )
};
