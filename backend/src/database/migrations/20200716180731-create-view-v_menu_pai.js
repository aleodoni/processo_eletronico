'use strict';

const viewName = 'spa2.v_menu_pai';

const sql = `
SELECT a.men_id,
    (((a.men_nome)::text || ' - '::text) || (b.mmu_nome)::text) AS nome_pai
   FROM spa2.menu a,
    spa2.modelo_menu b
  WHERE ((a.men_id_pai IS NULL) AND (a.mmu_id = b.mmu_id))
  ORDER BY (((a.men_nome)::text || ' - '::text) || (b.mmu_nome)::text);
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
