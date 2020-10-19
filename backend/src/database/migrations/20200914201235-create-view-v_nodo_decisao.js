'use strict';

const viewName = 'spa2.v_nodo_decisao';

const sql = `
SELECT a.pro_id,
b.nod_id,
b.nod_decisao
FROM spa2.processo a,
spa2.nodo b
WHERE (a.nod_id = b.nod_id);
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
