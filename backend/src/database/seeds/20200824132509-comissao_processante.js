'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'comissao_processante', schema: 'spa2' },
            [
                {
                    mco_id: 2,
                    pro_id: 1,
                    cop_presidente: true
                },
                {
                    mco_id: 1,
                    pro_id: 1,
                    cop_presidente: false
                }
            ],
            {}

        );

        await queryInterface.sequelize.query('select setval(\'spa2.comissao_processante_cop_id_seq\', coalesce(max(cop_id), 0)+1, false) from spa2.comissao_processante;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'comissao_processante', schema: 'spa2' },
        null,
        {}
    )
};
