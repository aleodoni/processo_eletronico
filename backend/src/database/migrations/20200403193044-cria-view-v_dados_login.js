'use strict';

const viewName = 'spa2.v_dados_login';
const sql = `
    SELECT
        a.set_id,
        a.set_nome AS nome_setor,
        a.set_sigla AS nome_sigla,
        b.matricula,
        b.pes_nome AS nome,
        b.pes_login AS login,
        area.set_id AS set_id_area,
        area.set_nome AS nome_area
    FROM
        spa2.setor a,
        spa2.lotacao b,
        spa2.setor area
    WHERE
        ((a.set_id = b.set_id) AND
        (a.set_id_area = area.set_id) AND
        (a.set_ativo = true))
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
