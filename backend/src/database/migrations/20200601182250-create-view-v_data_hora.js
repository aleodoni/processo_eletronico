'use strict';

const viewName = 'spa2.v_data_hora';
const sql = `
    SELECT
        to_char(timezone('America/Sao_Paulo'::text, now()), 'DD-MM-YYYY HH24:MI:SS'::text) AS data_hora_atual;
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
