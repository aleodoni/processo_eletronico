'use strict';

const viewName = 'spa2.v_processos_area';

const sql = `
 SELECT a.pro_id,
    a.pro_codigo,
    b.tpr_nome,
    (a.area_id)::integer AS area_id,
    a.pro_nome,
    a.usu_autuador,
    c.nod_aval_executiva,
    b.tpr_pessoal,
        CASE
            WHEN b.tpr_pessoal THEN 'Sim'::text
            ELSE 'Não'::text
        END AS pessoal,
    c.nod_fim,
    c.nod_decisao,
    c.nod_averbacao,
    c.nod_dias_prazo,
        CASE
            WHEN (date_part('day'::text, (now() - (( SELECT t.tra_envio
               FROM spa2.tramite t
              WHERE (t.pro_id = a.pro_id)
              ORDER BY t.tra_id DESC
             LIMIT 1))::timestamp with time zone)) > (c.nod_dias_prazo)::double precision) THEN 1
            WHEN (date_part('day'::text, (now() - (( SELECT t.tra_envio
               FROM spa2.tramite t
              WHERE (t.pro_id = a.pro_id)
              ORDER BY t.tra_id DESC
             LIMIT 1))::timestamp with time zone)) = ((c.nod_dias_prazo - 1))::double precision) THEN 2
            WHEN (date_part('day'::text, (now() - (( SELECT t.tra_envio
               FROM spa2.tramite t
              WHERE (t.pro_id = a.pro_id)
              ORDER BY t.tra_id DESC
             LIMIT 1))::timestamp with time zone)) < ((c.nod_dias_prazo - 2))::double precision) THEN 3
            ELSE 3
        END AS alerta,
    c.nod_ciencia,
    c.nod_ciencia_averbacao,
    c.nod_aval_horario,
    c.nod_contagem_tempo,
    c.nod_ciencia_calculo,
    c.nod_parecer_projuris_aposentadoria
   FROM spa2.processo a,
    spa2.tipo_processo b,
    spa2.nodo c
  WHERE ((a.tpr_id = b.tpr_id) AND (a.set_id_finalizador IS NULL) AND (a.usu_finalizador IS NULL) AND (a.nod_id = c.nod_id))
  ORDER BY
        CASE
            WHEN (date_part('day'::text, (now() - (( SELECT t.tra_envio
               FROM spa2.tramite t
              WHERE (t.pro_id = a.pro_id)
              ORDER BY t.tra_id DESC
             LIMIT 1))::timestamp with time zone)) > (c.nod_dias_prazo)::double precision) THEN 1
            WHEN (date_part('day'::text, (now() - (( SELECT t.tra_envio
               FROM spa2.tramite t
              WHERE (t.pro_id = a.pro_id)
              ORDER BY t.tra_id DESC
             LIMIT 1))::timestamp with time zone)) = ((c.nod_dias_prazo - 1))::double precision) THEN 2
            WHEN (date_part('day'::text, (now() - (( SELECT t.tra_envio
               FROM spa2.tramite t
              WHERE (t.pro_id = a.pro_id)
              ORDER BY t.tra_id DESC
             LIMIT 1))::timestamp with time zone)) < ((c.nod_dias_prazo - 2))::double precision) THEN 3
            ELSE 3
        END;
`;

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
            await queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${viewName} AS ${sql}`);
            await transaction.commit();
            return Promise.resolve();
        } catch (err) {
            await transaction.rollback();
            return Promise.reject(err);
        }
    },

    down: (queryInterface, Sequelize) => {
        return Promise.resolve();
    }
};
