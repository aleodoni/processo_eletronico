'use strict';

const viewName = 'spa2.v_tela_menu';

const sql = `
SELECT a.men_id,
a.men_id_pai,
d.men_nome AS nome_pai,
b.mmu_id,
b.mmu_nome,
a.men_nome,
a.men_url,
c.tel_id,
c.tel_nome,
a.men_ordem_pai,
a.tel_interna
FROM (((spa2.menu a
 JOIN spa2.modelo_menu b ON ((a.mmu_id = b.mmu_id)))
 JOIN spa2.tela c ON ((c.tel_id = a.tel_id)))
 LEFT JOIN spa2.menu d ON ((d.men_id = a.men_id_pai)));
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
