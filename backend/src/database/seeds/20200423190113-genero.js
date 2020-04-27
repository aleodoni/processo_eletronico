'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'genero', schema: 'spa2' },
        [
            {
                gen_id: 4,
                gen_nome: 'Requerimentos RH',
                versao: 0
            },
            {
                gen_id: 6,
                gen_nome: 'Baixa de bens',
                versao: 0
            },
            {
                gen_id: 7,
                gen_nome: 'Execução de despesas',
                versao: 0
            },
            {
                gen_id: 29,
                gen_nome: 'Presidência',
                versao: 0
            },
            {
                gen_id: 60,
                gen_nome: 'Pronto pagamento',
                versao: 0
            }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'genero', schema: 'spa2' },
        null,
        {}
    )
};
