'use strict';

const viewName = 'spa2.v_nodo';

const sql = `
    SELECT a.nod_id,
        a.nod_inicio,
        a.nod_fim,
        a.flu_id,
        a.area_id,
        b.flu_nome AS fluxo,
        c.set_nome AS area,
        CASE
            WHEN a.nod_inicio = true THEN 'Sim'::text
            ELSE 'Não'::text
        END AS inicio,
        CASE
            WHEN a.nod_fim = true THEN 'Sim'::text
            ELSE 'Não'::text
        END AS fim,
        a.nod_dias_prazo,
        a.nod_ordem,
        a.nod_aval_executiva,
        CASE
            WHEN a.nod_aval_executiva = true THEN 'Sim'::text
            ELSE 'Não'::text
        END AS aval_executiva
    FROM spa2.nodo a,
        spa2.fluxo b,
        spa2.v_area c
    WHERE a.flu_id = b.flu_id
        AND a.area_id::text = c.set_id::text
    ORDER BY a.nod_id;
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
