'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'manifestacao', schema: 'spa2' },
            [
                {
                    pro_id: 1,
                    tmn_id: 2,
                    man_login: 'tarcisio.socher',
                    man_id_area: 32,
                    man_cancelada: false,
                    man_login_cancelamento: null,
                    versao: 0,
                    man_visto_executiva: 'Não necessário',
                    man_data_cancelamento: null,
                    man_data: '2020-06-15',
                    nod_id: 188,
                    man_ciencia: 'Não necessário',
                    man_averbacao: 'Não necessário',
                    man_ciencia_averbacao: 'Não necessário',
                    man_aval_horario: 'Não necessário',
                    man_contagem_tempo: 'Não necessário',
                    man_ciencia_calculo: 'Não necessário',
                    man_tramitada: false,
                    man_parecer_projuris_aposentadoria: 'Não necessário'
                }
            ],
            {}

        );

        await queryInterface.sequelize.query('select setval(\'spa2.manifestacao_man_id_seq\', coalesce(max(man_id), 0)+1, false) from spa2.manifestacao;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'manifestacao', schema: 'spa2' },
        null,
        {}
    )
};
