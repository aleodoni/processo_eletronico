'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            { tableName: 'area_especial', schema: 'spa2' },
            [
                {
                    login: 'fabio.teixeira',
                    set_id: 399,
                    set_id_superior: 398
                }

            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        { tableName: 'area_especial', schema: 'spa2' },
        null,
        {}
    )
};
