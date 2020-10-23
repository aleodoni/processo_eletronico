'use strict';

const viewName = 'spa2.v_autorizacao';

const sql = `
SELECT genero.gen_id,
    genero.gen_nome,
    genero.gen_visivel,
        CASE
            WHEN (genero.gen_visivel = true) THEN 'Sim'::text
            ELSE 'Não'::text
        END AS visivel
   FROM spa2.genero;
`;

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${viewName} AS ${sql}`);
            await transaction.commit();
            return Promise.resolve();
        } catch (err) {
            await transaction.rollback();
            return Promise.reject(err);
        }
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
