'use strict';

const viewName = 'spa2.v_menu_autorizacao';
const sql = `
    SELECT
        c.men_id,
        c.men_id_pai,
        a.set_id,
        b.mmu_nome,
        c.men_nome,
        c.men_url,
        d.tel_id,
        d.tel_nome,
        c.men_ordem_pai
    FROM
        spa2.area_menu a,
        spa2.modelo_menu b,
        spa2.menu c,
        spa2.tela d
    WHERE ((a.mmu_id = b.mmu_id) AND (b.mmu_id = c.mmu_id) AND (d.tel_id = c.tel_id));
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
