'use strict';

const triggerName = 'numeracao_autuacao';
const sql = `
    BEFORE INSERT ON spa2.processo FOR EACH ROW EXECUTE PROCEDURE spa2.f_numeracao_autuacao();
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE TRIGGER ${triggerName} ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('');
    }
};
