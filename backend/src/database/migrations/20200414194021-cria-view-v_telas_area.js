'use strict';

const viewName = 'spa2.v_telas_area';
const sql = `
    SELECT
        v_menu_autorizacao.tel_id,
        v_menu_autorizacao.tel_nome,
        (v_menu_autorizacao.set_id)::integer AS set_id
    FROM
        spa2.v_menu_autorizacao;
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
