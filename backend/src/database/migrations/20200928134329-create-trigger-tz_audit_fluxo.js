'use strict';

const triggerName = 'tz_audit_fluxo';
const sql = `
    AFTER INSERT OR DELETE OR UPDATE ON spa2.fluxo FOR EACH ROW EXECUTE PROCEDURE spa2.f_audit_fluxo();
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE TRIGGER ${triggerName} ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('');
    }
};
