'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'setor', schema: 'spa2' },
        [
            {
                set_nome: 'Diretoria Geral',
                set_sigla: 'DG',
                set_id: 1,
                set_id_area: 1,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Diretoria De Informática',
                set_sigla: 'DIF',
                set_id: 27,
                set_id_area: 27,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Desenvolvimento De Sistemas',
                set_sigla: 'DDS-1',
                set_id: 171,
                set_id_area: 27,
                set_ativo: true,
                set_tipo: 'N'
            },
            {
                set_nome: 'Divisão De Suporte Em Informática',
                set_sigla: 'DSI-2',
                set_id: 172,
                set_id_area: 27,
                set_ativo: true,
                set_tipo: 'N'
            }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'setor', schema: 'spa2' },
        null,
        {}
    )
};
