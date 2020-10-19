'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'tipo_manifestacao', schema: 'spa2' },
            [
                {
                    tmn_id: 1,
                    tmn_nome: 'Informação',
                    versao: 0,
                    tmn_publica: true
                },
                {
                    tmn_id: 2,
                    tmn_nome: 'Parecer',
                    versao: 0,
                    tmn_publica: true
                },
                {
                    tmn_id: 3,
                    tmn_nome: 'Atesto',
                    versao: 0,
                    tmn_publica: true
                },
                {
                    tmn_id: 4,
                    tmn_nome: 'Manifestação da Executiva',
                    versao: 0,
                    tmn_publica: false
                },
                {
                    tmn_id: 5,
                    tmn_nome: 'Manifestação da presidência',
                    versao: 0,
                    tmn_publica: false
                },
                {
                    tmn_id: 6,
                    tmn_nome: 'Ciência do processo',
                    versao: 0,
                    tmn_publica: false
                },
                {
                    tmn_id: 7,
                    tmn_nome: 'Manifestação de averbação',
                    versao: 0,
                    tmn_publica: false
                },
                {
                    tmn_id: 8,
                    tmn_nome: 'Ciência da averbação',
                    versao: 0,
                    tmn_publica: false
                },
                {
                    tmn_id: 9,
                    tmn_nome: 'Aval de horário especial',
                    versao: 0,
                    tmn_publica: false
                },
                {
                    tmn_id: 10,
                    tmn_nome: 'Cálculo de tempo de serviço',
                    versao: 0,
                    tmn_publica: false
                },
                {
                    tmn_id: 11,
                    tmn_nome: 'Ciência do cálculo de aposentadoria',
                    versao: 0,
                    tmn_publica: false
                },
                {
                    tmn_id: 12,
                    tmn_nome: 'Discordância de cálculo',
                    versao: 0,
                    tmn_publica: false
                },
                {
                    tmn_id: 13,
                    tmn_nome: 'Parecer sobre legalidade e regularidade',
                    versao: 0,
                    tmn_publica: false
                },
                {
                    tmn_id: 14,
                    tmn_nome: 'Correção ou esclarecimentos',
                    versao: 0,
                    tmn_publica: false
                },
                {
                    tmn_id: 15,
                    tmn_nome: 'Manifestação de órgão externo',
                    versao: 0,
                    tmn_publica: false
                }

            ],
            {}

        );

        await queryInterface.sequelize.query('select setval(\'spa2.tipo_manifestacao_tmn_id_seq\', coalesce(max(tmn_id), 0)+1, false) from spa2.tipo_manifestacao;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'tipo_manifestacao', schema: 'spa2' },
        null,
        {}
    )
};
