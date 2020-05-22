'use strict';

const viewName = 'spa2.v_processos_area';

const sql = `
SELECT a.pro_id,
a.pro_codigo,
b.tpr_nome,
(a.area_id)::integer AS area_id,
a.usu_autuador,
c.nod_aval_executiva
FROM spa2.processo a,
spa2.tipo_processo b,
spa2.nodo c
WHERE ((a.tpr_id = b.tpr_id) AND (a.set_id_finalizador IS NULL) AND (a.usu_finalizador IS NULL) AND (a.nod_id = c.nod_id));
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
