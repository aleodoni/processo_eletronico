'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'fluxo', schema: 'spa2' },
            [
                { flu_id: 7, flu_nome: 'Folha de pagamento dos servidores e vereadores' },
                { flu_id: 6, flu_nome: 'Desconto em folha de pagamento por determinação judicial' },
                { flu_id: 14, flu_nome: 'Recurso - pessoal' },
                { flu_id: 5, flu_nome: 'Abono de permanência' },
                { flu_id: 17, flu_nome: 'Aquisição de bens e/ou contratação de serviços' },
                { flu_id: 18, flu_nome: 'Baixa de bens' },
                { flu_id: 16, flu_nome: 'Certidão de tempo de contribuição/serviço' },
                { flu_id: 9, flu_nome: 'Gratificação de estímulo à formação acadêmica e aperfeiçoamento' },
                { flu_id: 10, flu_nome: 'Horário especial de trabalho' },
                { flu_id: 11, flu_nome: 'Incorporação de tempo de contribuição' },
                { flu_id: 13, flu_nome: 'Pagamento de auxílio funeral' },
                { flu_id: 4, flu_nome: 'Processo administrativo de revisão do PAD' },
                { flu_id: 3, flu_nome: 'Processo administrativo disciplinar - PAD' },
                { flu_id: 19, flu_nome: 'Pronto pagamento' },
                { flu_id: 2, flu_nome: 'Sindicância administrativa' },
                { flu_id: 15, flu_nome: 'Solicitação de aposentadoria voluntária' },
                { flu_id: 12, flu_nome: 'Demais' },
                { flu_id: 240, flu_nome: 'Solicitação de aposentadoria por iniciativa da administração' },
                { flu_id: 241, flu_nome: 'Execução de despesas' },
                { flu_id: 242, flu_nome: 'Indenização de licença-prêmio' }
            ],
            {}
        );

        await queryInterface.sequelize.query('select setval(\'spa2.fluxo_flu_id_seq\', coalesce(max(flu_id), 0)+1, false) from spa2.fluxo;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'fluxo', schema: 'spa2' },
        null,
        {}
    )
};
