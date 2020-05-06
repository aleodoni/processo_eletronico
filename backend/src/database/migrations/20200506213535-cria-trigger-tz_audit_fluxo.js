'use strict';

const sql = `
CREATE TRIGGER tz_audit_fluxo
AFTER INSERT OR DELETE OR UPDATE 
ON spa2.fluxo
FOR EACH ROW
EXECUTE PROCEDURE spa2.f_audit_fluxo();
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP TRIGGER tz_audit_fluxo ON spa2.fluxo;`);
    }
};
