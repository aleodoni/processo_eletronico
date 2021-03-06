'use strict';

const triggerName = 'tz_audit_razao_tramite';
const sql = `
AFTER INSERT OR DELETE OR UPDATE ON spa2.razao_tramite FOR EACH ROW EXECUTE PROCEDURE spa2.f_audit_razao_tramite();
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE TRIGGER ${triggerName} ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('');
    }
};
