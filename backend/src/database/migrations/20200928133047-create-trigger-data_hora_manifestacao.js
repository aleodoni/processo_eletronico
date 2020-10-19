'use strict';

const triggerName = 'data_hora_manifestacao';
const sql = `
    BEFORE INSERT ON spa2.manifestacao FOR EACH ROW EXECUTE PROCEDURE spa2.f_data_hora_manifestacao();
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE TRIGGER ${triggerName} ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('');
    }
};
