'use strict';

const viewName = 'spa2.v_area_combo';
const sql = `
  SELECT "Setor".set_id,
    "Setor".set_nome,
    "Setor".set_tipo
  FROM spa2.setor "Setor"
  WHERE "Setor".set_id = "Setor".set_id_area
  ORDER BY "Setor".set_nome;
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
    }
};
