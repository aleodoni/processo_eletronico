'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'genero', schema: 'spa2' },
        [
            {
                gen_id: 1,
                gen_nome: 'Genero de processo 01',
                versao: 0
            },
            {
                gen_id: 2,
                gen_nome: 'Genero de processo 02',
                versao: 0
            },
            {
                gen_id: 3,
                gen_nome: 'Genero de processo 03',
                versao: 0
            },
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'genero', schema: 'spa2' },
        null,
        {}
    )
};
