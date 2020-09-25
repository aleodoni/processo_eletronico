'use strict';

const viewName = 'spa2.v_sigilo';

const sql = `
SELECT a.sig_id,
a.area_id,
a.tpr_id,
a.sig_login,
b.set_nome,
c.tpr_nome
FROM spa2.sigilo a,
spa2.v_area b,
spa2.tipo_processo c
WHERE ((a.area_id = b.set_id) AND (a.tpr_id = c.tpr_id));
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
