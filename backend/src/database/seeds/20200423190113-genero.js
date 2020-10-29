'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'genero', schema: 'spa2' },
            [
                {
                    gen_id: 4,
                    gen_nome: 'Requerimentos RH',
                    versao: 0,
                    gen_visivel: true
                },
                {
                    gen_id: 6,
                    gen_nome: 'Baixa de bens',
                    versao: 0,
                    gen_visivel: true
                },
                {
                    gen_id: 7,
                    gen_nome: 'Execução de despesas',
                    versao: 0,
                    gen_visivel: true
                },
                {
                    gen_id: 29,
                    gen_nome: 'Presidência',
                    versao: 0,
                    gen_visivel: true
                },
                {
                    gen_id: 60,
                    gen_nome: 'Pronto pagamento',
                    versao: 0,
                    gen_visivel: true
                }
            ],
            {}

        );

        await queryInterface.sequelize.query('select setval(\'spa2.genero_gen_id_seq\', coalesce(max(gen_id), 0)+1, false) from spa2.genero;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'genero', schema: 'spa2' },
        null,
        {}
    )
};
