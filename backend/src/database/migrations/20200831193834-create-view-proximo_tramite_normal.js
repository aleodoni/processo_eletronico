'use strict';

const viewName = 'spa2.proximo_tramite_normal';

const sql = `
SELECT pro.pro_id,
    prx.prx_id,
    prx.nod_id,
    prx.nod_id_proximo,
    prx.raz_id,
    raz.raz_nome,
    set.set_id,
    set.set_nome,
    set.set_sigla
   FROM (((((spa2.tipo_processo tpr
     JOIN spa2.processo pro USING (tpr_id))
     JOIN spa2.proximo_tramite prx ON (((tpr.flu_id = prx.flu_id) AND (pro.nod_id = prx.nod_id))))
     JOIN spa2.razao_tramite raz ON ((raz.raz_id = prx.raz_id)))
     JOIN spa2.nodo nod ON ((nod.nod_id = prx.nod_id_proximo)))
     JOIN spa2.setor set ON (((nod.area_id)::integer = set.set_id)))
  ORDER BY prx.prx_prioridade, raz.raz_nome, set.set_sigla, set.set_nome;
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
