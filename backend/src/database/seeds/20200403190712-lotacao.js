'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'lotacao', schema: 'spa2' },
        [
            {
                matricula: '2179',
                pes_nome: 'ALEXANDRE ODONI',
                set_id: 171,
                pes_login: 'alexandre.odoni'
            },
            {
                matricula: '2159',
                pes_nome: 'GERALDO WEHMHOFF',
                set_id: 171,
                pes_login: 'geraldo.wehmhoff'
            },
            {
                matricula: '2209',
                pes_nome: 'FÁBIO DEROSSO TEIXEIRA',
                set_id: 171,
                pes_login: 'fabio.teixeira'
            },
            {
                matricula: '2154',
                pes_nome: 'DEINI ANDERSON SARTOR PORTO',
                set_id: 171,
                pes_login: 'deini.porto'
            },
            {
                matricula: '2246',
                pes_nome: 'BRUNO SILVA DE OLIVEIRA',
                set_id: 172,
                pes_login: 'bruno.oliveira'
            },
            {
                matricula: '2180',
                pes_nome: 'RODRIGO GOMES FERRARO',
                set_id: 27,
                pes_login: 'rodrigo.ferraro'
            }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'lotacao', schema: 'spa2' },
        null,
        {}
    )
};
