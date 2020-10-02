'use strict';

const triggerName = 'tz_audit_area_menu';
const sql = `
    AFTER INSERT OR DELETE OR UPDATE ON spa2.area_menu FOR EACH ROW EXECUTE PROCEDURE spa2.f_audit_area_menu();
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE TRIGGER ${triggerName} ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('');
    }
};
