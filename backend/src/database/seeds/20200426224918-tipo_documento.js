'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        { tableName: 'tipo_documento', schema: 'spa2' },
        [
            {
                tpd_id: 2,
                tpd_nome: 'Decisão do TCE/PR que julgou legal a admissão do servidor',
                versao: 0
            },
            {
                tpd_id: 3,
                tpd_nome: 'Certidão de Tempo de Contribuição',
                versao: 0
            },
            {
                tpd_id: 4,
                tpd_nome: 'Certidão de Tempo de Serviço consolidada com o tempo no cargo efetivo que ocupa',
                versao: 0
            },
            {
                tpd_id: 5,
                tpd_nome: 'Laudo do IPMC atestando a invalidez permanente do servidor',
                versao: 0
            },
            {
                tpd_id: 6,
                tpd_nome: 'Ato Administrativo',
                versao: 0
            },
            {
                tpd_id: 7,
                tpd_nome: 'Ficha funcional',
                versao: 0
            },
            {
                tpd_id: 8,
                tpd_nome: 'Ficha financeira',
                versao: 0
            },
            {
                tpd_id: 9,
                tpd_nome: 'Ficha cadastral',
                versao: 0
            },
            {
                tpd_id: 10,
                tpd_nome: 'Contracheque',
                versao: 0
            },
            {
                tpd_id: 11,
                tpd_nome: 'Minuta do ato de inatividade',
                versao: 0
            },
            {
                tpd_id: 12,
                tpd_nome: 'Manifestação do TCE/PR',
                versao: 0
            },
            {
                tpd_id: 13,
                tpd_nome: 'Certidão de Abono de Permanência',
                versao: 0
            },
            {
                tpd_id: 14,
                tpd_nome: 'Ofício Judicial',
                versao: 0
            },
            {
                tpd_id: 15,
                tpd_nome: 'Diploma de Graduação',
                versao: 0
            },
            {
                tpd_id: 16,
                tpd_nome: 'Diploma de Pós Graduação',
                versao: 0
            },
            {
                tpd_id: 17,
                tpd_nome: 'Comprovante de matrícula',
                versao: 0
            },
            {
                tpd_id: 18,
                tpd_nome: 'Comprovante de incompatibilidade de horário de frequência às aulas com horário do expediente',
                versao: 0
            },
            {
                tpd_id: 19,
                tpd_nome: 'Comprovante de conclusão do curso',
                versao: 0
            },
            {
                tpd_id: 20,
                tpd_nome: 'Atestado de óbito',
                versao: 0
            },
            {
                tpd_id: 21,
                tpd_nome: 'Comprovante de despesa com funeral de servidor',
                versao: 0
            },
            {
                tpd_id: 22,
                tpd_nome: 'RG',
                versao: 0
            },
            {
                tpd_id: 23,
                tpd_nome: 'CPF',
                versao: 0
            },
            {
                tpd_id: 24,
                tpd_nome: 'Denúncia de irregularidade',
                versao: 0
            },
            {
                tpd_id: 25,
                tpd_nome: 'Relatório Final Processo Administrativo de Sindicância',
                versao: 0
            },
            {
                tpd_id: 26,
                tpd_nome: 'Relatório Final Processo Administrativo Disciplinar',
                versao: 0
            },
            {
                tpd_id: 27,
                tpd_nome: 'Prorrogação de prazo',
                versao: 0
            }

        ],
        {}
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'tipo_documento', schema: 'spa2' },
        null,
        {}
    )
};
