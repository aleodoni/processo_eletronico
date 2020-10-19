'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'regra_aposentacao', schema: 'spa2' },
            [
                {
                    reg_id: 1,
                    reg_nome: 'Regra 1'
                },
                {
                    reg_id: 2,
                    reg_nome: 'Regra 2'
                }

            ],
            {}
        );

        await queryInterface.sequelize.query('select setval(\'spa2.regra_aposentacao_reg_id_seq\', coalesce(max(reg_id), 0)+1, false) from spa2.regra_aposentacao;');
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'regra_aposentacao', schema: 'spa2' },
        null,
        {}
    )
};
