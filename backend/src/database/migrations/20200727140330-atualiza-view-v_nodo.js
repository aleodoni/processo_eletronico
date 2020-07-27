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
        WHEN (a.nod_inicio = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS inicio,
    CASE
        WHEN (a.nod_fim = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS fim,
a.nod_dias_prazo,
a.nod_ordem,
a.nod_aval_executiva,
    CASE
        WHEN (a.nod_aval_executiva = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS aval_executiva,
a.nod_decisao,
    CASE
        WHEN (a.nod_decisao = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS decisao,
a.nod_interessado,
    CASE
        WHEN (a.nod_interessado = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS interessado,
a.nod_ciencia,
    CASE
        WHEN (a.nod_ciencia = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS ciencia,
a.nod_averbacao,
    CASE
        WHEN (a.nod_averbacao = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS averbacao,
a.nod_ciencia_averbacao,
    CASE
        WHEN (a.nod_ciencia_averbacao = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS ciencia_averbacao,
a.nod_aval_horario,
    CASE
        WHEN (a.nod_aval_horario = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS aval_horario,
a.nod_contagem_tempo,
    CASE
        WHEN (a.nod_contagem_tempo = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS contagem_tempo,
a.nod_ciencia_calculo,
    CASE
        WHEN (a.nod_ciencia_calculo = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS ciencia_calculo,
a.nod_parecer_projuris_aposentadoria,
    CASE
        WHEN (a.nod_parecer_projuris_aposentadoria = true) THEN 'Sim'::text
        ELSE 'Não'::text
    END AS parecer_projuris_aposentadoria
FROM spa2.nodo a,
spa2.fluxo b,
spa2.v_area c
WHERE ((a.flu_id = b.flu_id) AND ((a.area_id)::text = (c.set_id)::text))
ORDER BY a.nod_id;
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
