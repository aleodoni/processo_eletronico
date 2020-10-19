'use strict';

const viewName = 'spa2.v_decisao_pessoal';

const sql = `
SELECT a.pro_id,
a.tpr_id,
b.flu_id,
d.nod_id,
d.area_id,
d.nod_decisao,
e.man_visto_executiva,
b.tpr_prazo_recurso
FROM spa2.processo a,
spa2.tipo_processo b,
spa2.fluxo c,
spa2.nodo d,
spa2.manifestacao e
WHERE ((a.tpr_id = b.tpr_id) AND (b.flu_id = c.flu_id) AND (c.flu_id = d.flu_id) AND d.nod_decisao AND (a.pro_id = e.pro_id) AND ((d.area_id)::integer = e.man_id_area) AND b.tpr_pessoal);
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
