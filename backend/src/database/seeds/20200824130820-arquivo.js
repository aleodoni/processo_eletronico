'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'arquivo', schema: 'spa2' },
            [
                {
                    arq_nome: 'fatura.pdf',
                    pro_id: null,
                    man_id: 281,
                    arq_tipo: 'application/pdf',
                    arq_removendo: false,
                    arq_doc_id: 281,
                    arq_doc_tipo: 'manifestação',
                    versao: 0,
                    tpd_id: 7,
                    arq_data: '2020-06-15',
                    arq_login: 'tarcisio.socher'
                }
            ],
            {}

        );

        await queryInterface.sequelize.query('select setval(\'spa2.arquivo_arq_id_seq\', coalesce(max(arq_id), 0)+1, false) from spa2.arquivo;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'arquivo', schema: 'spa2' },
        null,
        {}
    )
};
