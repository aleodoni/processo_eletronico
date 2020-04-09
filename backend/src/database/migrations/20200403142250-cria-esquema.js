'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createSchema('spa2');
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropSchema('spa2');
    }
};
