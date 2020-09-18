'use strict';

const viewName = 'spa2.v_dados_processo_pas_pad';

const sql = `
SELECT a.pro_id,
a.pro_codigo,
a.pro_assunto,
a.pro_numero,
to_char(timezone('America/Sao_Paulo'::text, a.pro_autuacao), 'DD/MM/YYYY - HH24:MI'::text) AS pro_autuacao,
timezone('America/Sao_Paulo'::text, a.pro_autuacao) AS pro_autuacao_data,
a.usu_autuador,
to_char(timezone('America/Sao_Paulo'::text, a.pro_ultimo_tramite), 'DD/MM/YYYY - HH24:MI'::text) AS pro_ultimo_tramite,
a.usu_finalizador,
a.nod_id,
a.area_id,
a.set_id_finalizador,
a.pro_iniciativa,
a.pro_tipo_iniciativa,
a.area_id_iniciativa,
a.tpr_id,
a.pro_ano,
b.tpr_nome,
b.tpr_visualizacao,
c.gen_nome,
b.flu_id,
d.flu_nome,
e.set_nome AS area_atual_processo,
    CASE
        WHEN (b.tpr_visualizacao = 0) THEN 'Normal'::text
        WHEN (b.tpr_visualizacao = 1) THEN 'Restrito'::text
        WHEN (b.tpr_visualizacao = 2) THEN 'Sigiloso'::text
        ELSE NULL::text
    END AS visualizacao
FROM (((((spa2.processo a
 JOIN spa2.tipo_processo b ON ((a.tpr_id = b.tpr_id)))
 JOIN spa2.genero c ON ((b.gen_id = c.gen_id)))
 LEFT JOIN spa2.fluxo d ON ((d.flu_id = b.flu_id)))
 JOIN spa2.v_area e ON ((e.set_id = (a.area_id)::integer)))
 JOIN spa2.nodo i ON ((a.nod_id = i.nod_id)));
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
