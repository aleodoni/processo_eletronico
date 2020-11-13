'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'tipo_documento', schema: 'spa2' },
        [
            { tpd_id: 2, tpd_nome: 'Decisão do TCE/PR que julgou legal a admissão do servidor', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 3, tpd_nome: 'Certidão de Tempo de Contribuição', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 4, tpd_nome: 'Laudo do IPMC atestando a invalidez permanente do servidor', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 5, tpd_nome: 'Ato Administrativo', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 6, tpd_nome: 'Ficha funcional', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 7, tpd_nome: 'Ficha financeira', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 8, tpd_nome: 'Ficha cadastral', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 9, tpd_nome: 'Contracheque', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 10, tpd_nome: 'Minuta do ato de inatividade', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 11, tpd_nome: 'Manifestação do TCE/PR', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 12, tpd_nome: 'Certidão de Abono de Permanência', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 13, tpd_nome: 'Ofício Judicial', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 14, tpd_nome: 'Diploma de Graduação', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 15, tpd_nome: 'Diploma de Pós Graduação', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 16, tpd_nome: 'Comprovante de matrícula', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 17, tpd_nome: 'Comprovante de incompatibilidade de horário de frequência às aulas com horário do expediente', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 18, tpd_nome: 'Comprovante de conclusão do curso', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 19, tpd_nome: 'Atestado de óbito', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 20, tpd_nome: 'Comprovante de despesa com funeral de servidor', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 21, tpd_nome: 'RG', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 22, tpd_nome: 'CPF', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 23, tpd_nome: 'Denúncia de irregularidade', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 24, tpd_nome: 'Relatório Final Processo Administrativo de Sindicância', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 25, tpd_nome: 'Relatório Final Processo Administrativo Disciplinar', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 26, tpd_nome: 'Prorrogação de prazo', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 27, tpd_nome: 'Aval da Comissão Executiva', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 28, tpd_nome: 'Decisão da Presidência', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 29, tpd_nome: 'Manifestação', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 30, tpd_nome: 'Visto executiva', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 31, tpd_nome: 'Ciência do processo', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 32, tpd_nome: 'Averbação', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 33, tpd_nome: 'Ciência da averbação', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 34, tpd_nome: 'Aval de horário especial', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 35, tpd_nome: 'Contagem de tempo de serviço', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 36, tpd_nome: 'Ciência do cálculo da aposentadoria', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 37, tpd_nome: 'Discordância de cálculo', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 38, tpd_nome: 'Capa de processo', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 39, tpd_nome: 'Parecer do Projuris sobre aposentadoria', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 40, tpd_nome: 'Correção de informações ou esclarecimentos', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 41, tpd_nome: 'Decisão de PAD', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 53, tpd_nome: 'Autorização de pagamento', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 54, tpd_nome: 'Arquivo de execução de despesa', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 51, tpd_nome: 'Cópia da autorização do Fornecimento ou de execução de serviços expedida pela Câmara', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 1 },
            { tpd_id: 42, tpd_nome: 'Nota fiscal / fatura discriminativa original', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 2 },
            { tpd_id: 46, tpd_nome: 'Comprovante de regularidade do FGTS', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 5 },
            { tpd_id: 52, tpd_nome: 'Certidão de Aposentadoria', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 55, tpd_nome: 'Extrato de Optante pelo Simples Nacional', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 3 },
            { tpd_id: 45, tpd_nome: 'Prova de regularidade conjunta, relativa a Tributos Federais e à Dívida Ativa da União', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 4 },
            { tpd_id: 44, tpd_nome: 'Prova de regularidade para com a Fazenda Estadual da sede da empresa', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 6 },
            { tpd_id: 43, tpd_nome: 'Prova de regularidade para com a Fazenda Municipal da sede da empresa', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 7 },
            { tpd_id: 47, tpd_nome: 'Prova de inexistência de débitos inadimplidos perante a Justiça do Trabalho (CNDT)', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 8 },
            { tpd_id: 56, tpd_nome: 'Relação dos funcionários cedidos, contendo nome, RG e o local de prestação dos serviço', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 9 },
            { tpd_id: 49, tpd_nome: 'Declaração do empregador ou responsável pela empresa sobre a regular quitação de todos os direitos', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 0 },
            { tpd_id: 48, tpd_nome: 'Cópia da folha de pagamento dos funcionários da empresa que atuaram na prestação dos serviços', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 1 },
            { tpd_id: 57, tpd_nome: 'Cópias das Folhas de Freqüência dos funcionários da empresa cedidos', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 2 },
            { tpd_id: 50, tpd_nome: 'Comprovação de recolhimento dos encargos previdenciários(INSS) relativo ao mês em que foi realizado ', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 3 },
            { tpd_id: 58, tpd_nome: 'Recolhimento do FGTS relativo aos funcionários (Guia de Recolhimento do FGTS – GRF)', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 4 },
            { tpd_id: 61, tpd_nome: 'Requerimento para auxílio funeral', versao: 0, tpd_visivel: true, tpd_solicitacao_pgto: false, tpd_ordem: null },
            { tpd_id: 59, tpd_nome: 'SEFIP, do mês anterior à Prestação de Serviço, com a relação dos trabalhadores constantes do arquivo e com o resumo das informações à Previdência Social constantes do arquivo', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 5 },
            { tpd_id: 60, tpd_nome: 'Arquivo complementar', versao: 0, tpd_visivel: false, tpd_solicitacao_pgto: true, tpd_ordem: 6 }
        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'tipo_documento', schema: 'spa2' },
        null,
        {}
    )
};
