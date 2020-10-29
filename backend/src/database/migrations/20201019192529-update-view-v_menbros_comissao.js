'use strict';

const viewName = 'spa2.v_membros_comissao';

const sql = `
SELECT a.mco_id,
    a.area_id,
    a.mco_area_id_membro,
    a.mco_matricula,
    a.mco_nome,
    a.mco_login,
    b.set_nome,
    a.mco_ativo,
        CASE
            WHEN a.mco_ativo THEN 'Sim'::text
            ELSE 'Não'::text
        END AS ativo
   FROM spa2.membro_comissao a,
    spa2.v_area b
  WHERE (a.mco_area_id_membro = b.set_id);
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
