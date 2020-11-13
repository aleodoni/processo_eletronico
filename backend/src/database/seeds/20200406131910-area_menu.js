'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'area_menu', schema: 'spa2' },
            [
                { amu_id: 1, set_id: '027', versao: 0, mmu_id: 1 },
                { amu_id: 2, set_id: '032', versao: 0, mmu_id: 2 },
                { amu_id: 109, set_id: '288', versao: 0, mmu_id: 2 },
                { amu_id: 139, set_id: '287', versao: 0, mmu_id: 2 },
                { amu_id: 378, set_id: '398', versao: 0, mmu_id: 2 },
                { amu_id: 379, set_id: '001', versao: 0, mmu_id: 2 },
                { amu_id: 381, set_id: '007', versao: 0, mmu_id: 2 },
                { amu_id: 382, set_id: '365', versao: 0, mmu_id: 2 },
                { amu_id: 383, set_id: '048', versao: 0, mmu_id: 2 },
                { amu_id: 384, set_id: '149', versao: 0, mmu_id: 2 },
                { amu_id: 385, set_id: '448', versao: 0, mmu_id: 2 },
                { amu_id: 386, set_id: '088', versao: 0, mmu_id: 2 },
                { amu_id: 388, set_id: '104', versao: 0, mmu_id: 2 },
                { amu_id: 389, set_id: '289', versao: 0, mmu_id: 2 },
                { amu_id: 390, set_id: '299', versao: 0, mmu_id: 2 },
                { amu_id: 392, set_id: '141', versao: 0, mmu_id: 2 },
                { amu_id: 394, set_id: '319', versao: 0, mmu_id: 2 },
                { amu_id: 395, set_id: '149', versao: 0, mmu_id: 2 },
                { amu_id: 396, set_id: '382', versao: 0, mmu_id: 2 },
                { amu_id: 397, set_id: '383', versao: 0, mmu_id: 2 },
                { amu_id: 404, set_id: '1500', versao: 0, mmu_id: 423 },
                { amu_id: 398, set_id: '098', versao: 0, mmu_id: 2 },
                { amu_id: 399, set_id: '100', versao: 0, mmu_id: 2 },
                { amu_id: 380, set_id: '004', versao: 0, mmu_id: 3 },
                { amu_id: 400, set_id: '168', versao: 0, mmu_id: 3 },
                { amu_id: 405, set_id: '385', versao: 0, mmu_id: 2 },
                { amu_id: 407, set_id: '459', versao: 0, mmu_id: 2 },
                { amu_id: 406, set_id: '065', versao: 0, mmu_id: 2 }
            ],
            {}
        );

        await queryInterface.sequelize.query('select setval(\'spa2.area_menu_amu_id_seq\', coalesce(max(amu_id), 0)+1, false) from spa2.area_menu;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'area_menu', schema: 'spa2' },
        null,
        {}
    )
};
