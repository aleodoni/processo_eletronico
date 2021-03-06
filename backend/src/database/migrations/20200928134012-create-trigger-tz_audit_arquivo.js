'use strict';

const triggerName = 'tz_audit_arquivo';
const sql = `
    AFTER INSERT OR DELETE OR UPDATE ON spa2.arquivo FOR EACH ROW EXECUTE PROCEDURE spa2.f_audit_arquivo();
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE TRIGGER ${triggerName} ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('');
    }
};
