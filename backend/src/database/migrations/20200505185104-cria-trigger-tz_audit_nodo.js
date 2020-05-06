'use strict';

const sql = `
  CREATE TRIGGER tz_audit_nodo
    AFTER INSERT OR DELETE OR UPDATE 
  ON spa2.nodo
    FOR EACH ROW
      EXECUTE PROCEDURE spa2.f_audit_nodo();
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP TRIGGER tz_audit_nodo ON spa2.nodo`);
    }
};
