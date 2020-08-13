'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'membro_comissao', schema: 'spa2' },
            [
                {
                    area_id: 2000,
                    mco_matricula: 2209,
                    mco_nome: 'Fábio Derosso Teixeira',
                    mco_area_id_membro: 27,
                    mco_ativo: true,
                    mco_login: 'fabio.teixeira'
                },
                {
                    area_id: 2000,
                    mco_matricula: 2100,
                    mco_nome: 'Ely Marcos de Oliveira',
                    mco_area_id_membro: 32,
                    mco_ativo: true,
                    mco_login: 'ely.oliveira'
                },
                {
                    area_id: 2000,
                    mco_matricula: 2082,
                    mco_nome: 'Adriana Bolzani Bach',
                    mco_area_id_membro: 289,
                    mco_ativo: true,
                    mco_login: 'adriana.bach'
                }

            ],
            {}

        );

        await queryInterface.sequelize.query('select setval(\'spa2.membro_comissao_mco_id_seq\', coalesce(max(mco_id), 0)+1, false) from spa2.membro_comissao;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'membro_comissao', schema: 'spa2' },
        null,
        {}
    )
};
