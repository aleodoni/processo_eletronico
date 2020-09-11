'use strict';

const viewName = 'spa2.v_area_tramitacao_pessoal';

const sql = `
SELECT a.pes_login,
c.set_id AS area_id,
c.set_nome
FROM spa2.lotacao a,
spa2.setor b,
spa2.setor c
WHERE ((a.set_id = b.set_id) AND (b.set_id_area = c.set_id));
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
