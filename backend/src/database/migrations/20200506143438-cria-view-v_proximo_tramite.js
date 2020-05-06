'use strict';

const viewName = 'spa2.v_proximo_tramite';

const sql = `
SELECT
    a.prx_id,
    a.nod_id,
    a.nod_id_proximo,
    a.raz_id,
    a.flu_id,
    b.set_nome AS nodo,
    c.set_nome AS nodo_proximo,
    d.raz_nome,
    a.prx_prioridade
FROM
    spa2.proximo_tramite a,
    spa2.v_nodo_fluxo b,
    spa2.v_nodo_fluxo c,
    spa2.razao_tramite d
WHERE
    ((a.nod_id = b.nod_id) AND (a.nod_id_proximo = c.nod_id) AND (a.raz_id = d.raz_id));
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
