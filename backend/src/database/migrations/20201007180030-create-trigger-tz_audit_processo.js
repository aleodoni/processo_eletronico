'use strict';

const triggerName = 'tz_audit_processo';
const sql = `
AFTER INSERT OR DELETE OR UPDATE ON spa2.processo FOR EACH ROW EXECUTE PROCEDURE spa2.f_audit_processo();
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE TRIGGER ${triggerName} ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('');
    }
};
