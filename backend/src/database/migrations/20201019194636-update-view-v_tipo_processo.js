'use strict';

const viewName = 'spa2.v_tipo_processo';

const sql = `
SELECT a.tpr_id,
    b.gen_id,
    c.flu_id,
    a.tpr_visualizacao,
    a.tpr_nome,
    b.gen_nome,
        CASE
            WHEN (a.tpr_visualizacao = 0) THEN 'Normal'::text
            WHEN (a.tpr_visualizacao = 1) THEN 'Restrito'::text
            WHEN (a.tpr_visualizacao = 2) THEN 'Sigiloso'::text
            ELSE NULL::text
        END AS visualizacao,
    c.flu_nome,
    a.tpr_pessoal,
        CASE
            WHEN (a.tpr_pessoal = true) THEN 'Sim'::text
            ELSE 'Não'::text
        END AS pessoal,
    a.tpr_prazo_recurso,
    a.tpr_visivel,
        CASE
            WHEN (a.tpr_visivel = true) THEN 'Sim'::text
            ELSE 'Não'::text
        END AS visivel,
    a.tpr_tramitacao_aberta,
        CASE
            WHEN (a.tpr_tramitacao_aberta = true) THEN 'Sim'::text
            ELSE 'Não'::text
        END AS tramitacao_aberta
   FROM ((spa2.tipo_processo a
     JOIN spa2.genero b ON ((a.gen_id = b.gen_id)))
     LEFT JOIN spa2.fluxo c ON ((c.flu_id = a.flu_id)));
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

    down: async(queryInterface, Sequelize) => {
        // await queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
