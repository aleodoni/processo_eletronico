'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`
        CREATE SEQUENCE spa2.pro_2019_seq
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
        `);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('DROP SEQUENCE spa2.pro_2019_seq');
    }
};
