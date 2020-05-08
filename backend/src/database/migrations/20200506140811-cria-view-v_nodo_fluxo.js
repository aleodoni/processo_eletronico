'use strict';

const viewName = 'spa2.v_nodo_fluxo';

const sql = `
SELECT
    a.nod_id,
    a.flu_id,
    ((((b.set_nome)::text || '('::text) || a.nod_ordem) || ')'::text) AS set_nome
FROM
    spa2.nodo a,
    spa2.setor b
WHERE
    ((a.area_id)::integer = b.set_id)
ORDER BY
    a.nod_ordem;
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
