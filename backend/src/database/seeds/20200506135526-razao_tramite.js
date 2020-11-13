'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'razao_tramite', schema: 'spa2' },
        [
            { raz_id: 82, raz_nome: 'Encaminhamento' },
            { raz_id: 105, raz_nome: 'Verificação' },
            { raz_id: 106, raz_nome: 'Ciência' },
            { raz_id: 107, raz_nome: 'Encerramento' },
            { raz_id: 116, raz_nome: 'Nova CTC' },
            { raz_id: 117, raz_nome: 'Ciência da averbação' },
            { raz_id: 119, raz_nome: 'Ciência da decisão' },
            { raz_id: 120, raz_nome: 'Discordância de cálculo' },
            { raz_id: 118, raz_nome: 'Aval de concessão' },
            { raz_id: 121, raz_nome: 'Correção de informações ou esclarecimentos' },
            { raz_id: 122, raz_nome: 'Envio ao Tribunal de Contas' },
            { raz_id: 123, raz_nome: 'Novas diligências ou agravamento da penalidade' },
            { raz_id: 124, raz_nome: 'Anexação atesto' },
            { raz_id: 125, raz_nome: 'Informação de disponibilidade financeira orçamentária' },
            { raz_id: 126, raz_nome: 'Pagamento' }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'razao_tramite', schema: 'spa2' },
        null,
        {}
    )
};
