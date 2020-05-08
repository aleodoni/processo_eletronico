'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'razao_tramite', schema: 'spa2' },
        [
            {
                raz_id: 82,
                raz_nome: 'Encaminhamento'
            },
            {
                raz_id: 105,
                raz_nome: 'Verificação'
            }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'razao_tramite', schema: 'spa2' },
        null,
        {}
    )
};
