'use strict';

const triggerName = 'tz_audit_nodo';
const sql = `
    AFTER INSERT OR DELETE OR UPDATE ON spa2.nodo FOR EACH ROW EXECUTE PROCEDURE spa2.f_audit_nodo();
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE TRIGGER ${triggerName} ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('');
    }
};
