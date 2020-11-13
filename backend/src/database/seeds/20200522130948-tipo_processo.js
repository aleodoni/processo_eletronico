'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'tipo_processo', schema: 'spa2' },
        [
            { tpr_id: 27, tpr_nome: 'Não público', tpr_visualizacao: 2, versao: 0, gen_id: 29, flu_id: null, tpr_pessoal: false, tpr_prazo_recurso: 0, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 28, tpr_nome: 'Baixa de bens', tpr_visualizacao: 0, versao: 0, gen_id: 6, flu_id: 18, tpr_pessoal: false, tpr_prazo_recurso: 0, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 29, tpr_nome: 'Pronto pagamento', tpr_visualizacao: 0, versao: 0, gen_id: 60, flu_id: 19, tpr_pessoal: false, tpr_prazo_recurso: 0, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 21, tpr_nome: 'Averbação de tempo de serviço', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 11, tpr_pessoal: true, tpr_prazo_recurso: 0, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 17, tpr_nome: 'Abono de permanência', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 5, tpr_pessoal: true, tpr_prazo_recurso: 0, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 25, tpr_nome: 'Desconto em folha de pagamento por determinação judicial', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 6, tpr_pessoal: true, tpr_prazo_recurso: 0, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 23, tpr_nome: 'Aposentadoria voluntária', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 15, tpr_pessoal: true, tpr_prazo_recurso: 0, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 22, tpr_nome: 'Auxílio funeral', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 13, tpr_pessoal: true, tpr_prazo_recurso: 0, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 20, tpr_nome: 'Gratificação de estímulo à formação acadêmica e aperfeiçoamento', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 9, tpr_pessoal: true, tpr_prazo_recurso: 2, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 247, tpr_nome: 'Revisão de desconto de pensão alimentícia', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 6, tpr_pessoal: true, tpr_prazo_recurso: 30, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 248, tpr_nome: 'Recurso', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 14, tpr_pessoal: true, tpr_prazo_recurso: 10, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 15, tpr_nome: 'Processo Administrativo Disciplinar - PAD', tpr_visualizacao: 2, versao: 0, gen_id: 29, flu_id: 3, tpr_pessoal: false, tpr_prazo_recurso: 0, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 16, tpr_nome: 'Processo Administrativo de Sindicância - PAS', tpr_visualizacao: 2, versao: 0, gen_id: 29, flu_id: 2, tpr_pessoal: false, tpr_prazo_recurso: 0, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 249, tpr_nome: 'Processo administrativo de revisão do PAD', tpr_visualizacao: 2, versao: 0, gen_id: 4, flu_id: 4, tpr_pessoal: false, tpr_prazo_recurso: 10, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 242, tpr_nome: 'Revisões e retroativos', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 14, tpr_pessoal: true, tpr_prazo_recurso: 10, tpr_visivel: false, tpr_tramitacao_aberta: false },
            { tpr_id: 26, tpr_nome: 'Demais', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: null, tpr_pessoal: true, tpr_prazo_recurso: 10, tpr_visivel: false, tpr_tramitacao_aberta: false },
            { tpr_id: 250, tpr_nome: 'Aposentadoria por iniciativa da administração', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 240, tpr_pessoal: true, tpr_prazo_recurso: 10, tpr_visivel: false, tpr_tramitacao_aberta: false },
            { tpr_id: 30, tpr_nome: 'Execução de despesas', tpr_visualizacao: 0, versao: 0, gen_id: 7, flu_id: 241, tpr_pessoal: false, tpr_prazo_recurso: 0, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 251, tpr_nome: 'Aquisição de Bens e/ou Contratação de Serviços', tpr_visualizacao: 0, versao: 0, gen_id: 7, flu_id: 17, tpr_pessoal: false, tpr_prazo_recurso: 10, tpr_visivel: false, tpr_tramitacao_aberta: true },
            { tpr_id: 18, tpr_nome: 'Folha de pagamento - Geral', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 7, tpr_pessoal: false, tpr_prazo_recurso: 10, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 252, tpr_nome: 'Folha de pagamento complementar', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 7, tpr_pessoal: false, tpr_prazo_recurso: 10, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 241, tpr_nome: 'Horário especial de trabalho', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 10, tpr_pessoal: true, tpr_prazo_recurso: 0, tpr_visivel: true, tpr_tramitacao_aberta: false },
            { tpr_id: 253, tpr_nome: 'Indenização de licença-prêmio', tpr_visualizacao: 0, versao: 0, gen_id: 4, flu_id: 242, tpr_pessoal: true, tpr_prazo_recurso: 10, tpr_visivel: true, tpr_tramitacao_aberta: false }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'tipo_processo', schema: 'spa2' },
        null,
        {}
    )
};
