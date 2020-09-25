'use strict';

const viewName = 'spa2.v_processo_origem';

const sql = `
SELECT a.pro_id AS pro_id_origem,
a.pro_codigo AS processo_origem,
c.pro_id AS pro_id_atual,
c.pro_codigo AS processo_atual,
d.tpr_id,
d.tpr_nome
FROM spa2.processo a,
spa2.processo_origem b,
spa2.processo c,
spa2.tipo_processo d
WHERE ((a.pro_id = b.pro_id_pai) AND (b.pro_id_atual = c.pro_id) AND (a.tpr_id = d.tpr_id));
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
