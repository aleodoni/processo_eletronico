'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'fluxo', schema: 'spa2' },
        [
            {
                flu_id: 2,
                flu_nome: 'Sindicância Administrativa'
            },
            {
                flu_id: 3,
                flu_nome: 'Processo Administrativo Disciplinar - PAD'
            },
            {
                flu_id: 4,
                flu_nome: 'Processo Administrativo de Revisão do PAD'
            },
            {
                flu_id: 5,
                flu_nome: 'Abono de Permanência'
            },
            {
                flu_id: 6,
                flu_nome: 'Desconto de pensão alimentícia em folha de pagamento'
            },
            {
                flu_id: 7,
                flu_nome: 'Folha de pagamento dos servidores e vereadores'
            },
            {
                flu_id: 8,
                flu_nome: 'Folha de pagamento de estagiários'
            },
            {
                flu_id: 9,
                flu_nome: 'Gratificação de Estímulo à Formação Acadêmica e Aperfeiçoamento'
            },
            {
                flu_id: 10,
                flu_nome: 'Horário Especial de Trabalho'
            },
            {
                flu_id: 11,
                flu_nome: 'Incorporação de Tempo de Contribuição'
            },
            {
                flu_id: 12,
                flu_nome: 'Indenização de licença-prêmio não fruída pelo servidor'
            },
            {
                flu_id: 13,
                flu_nome: 'Pagamento de Auxílio Funeral'
            },
            {
                flu_id: 14,
                flu_nome: 'Revisões e Retroativos'
            },
            {
                flu_id: 15,
                flu_nome: 'Solicitação de Aposentadoria'
            },
            {
                flu_id: 16,
                flu_nome: 'Certidão de de Tempo de Contribuição/Serviço'
            },
            {
                flu_id: 17,
                flu_nome: 'Aquisição de Bens e/ou Contratação de Serviços'
            },
            {
                flu_id: 18,
                flu_nome: 'Baixa de Bens'
            },
            {
                flu_id: 19,
                flu_nome: 'Pronto Pagamento'
            }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'fluxo', schema: 'spa2' },
        null,
        {}
    )
};
