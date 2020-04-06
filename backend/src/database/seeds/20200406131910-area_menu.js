'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'area_menu', schema: 'spa2' },
        [
            {
                amu_id: 1,
                set_id: '027',
                mmu_id: 1,
                versao: 0
            },
            {
                amu_id: 2,
                set_id: '032',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 109,
                set_id: '288',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 139,
                set_id: '287',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 3,
                set_id: '168',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 378,
                set_id: '389',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 379,
                set_id: '001',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 380,
                set_id: '004',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 381,
                set_id: '007',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 382,
                set_id: '365',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 383,
                set_id: '048',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 384,
                set_id: '149',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 385,
                set_id: '448',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 386,
                set_id: '088',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 387,
                set_id: '143',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 388,
                set_id: '104',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 389,
                set_id: '289',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 390,
                set_id: '299',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 391,
                set_id: '131',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 392,
                set_id: '141',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 393,
                set_id: '122',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 394,
                set_id: '319',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 395,
                set_id: '149',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 396,
                set_id: '382',
                mmu_id: 2,
                versao: 0
            },
            {
                amu_id: 397,
                set_id: '383',
                mmu_id: 2,
                versao: 0
            }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'area_menu', schema: 'spa2' },
        null,
        {}
    )
};
