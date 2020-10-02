'use strict';

const triggerName = 'td_arquivo';
const sql = `
    BEFORE DELETE ON spa2.arquivo FOR EACH ROW EXECUTE PROCEDURE spa2.ftd_arquivo();
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE TRIGGER ${triggerName} ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('');
    }
};
