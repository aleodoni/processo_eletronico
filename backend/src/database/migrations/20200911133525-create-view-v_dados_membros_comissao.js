'use strict';

const viewName = 'spa2.v_dados_membros_comissao';

const sql = `
SELECT a.cop_id,
    a.pro_id,
        CASE
            WHEN a.cop_presidente THEN 'Presidente'::text
            ELSE 'Membro'::text
        END AS cargo,
    b.mco_matricula AS matricula,
    b.mco_nome AS nome,
    b.mco_login AS login,
    c.set_nome AS area
   FROM spa2.comissao_processante a,
    spa2.membro_comissao b,
    spa2.v_area c
  WHERE ((a.mco_id = b.mco_id) AND (b.mco_area_id_membro = c.set_id) AND b.mco_ativo)
  ORDER BY a.pro_id, a.cop_presidente DESC;
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
