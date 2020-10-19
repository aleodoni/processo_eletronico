'use strict';

const viewName = 'spa2.v_processo_envia';

const sql = `
SELECT a.pro_id,
a.pro_codigo,
a.area_id,
b.tpr_nome
FROM spa2.processo a,
spa2.tipo_processo b
WHERE ((a.tpr_id = b.tpr_id) AND (a.pro_encerramento IS NULL) AND (a.usu_finalizador IS NULL))
ORDER BY a.pro_codigo DESC;
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
