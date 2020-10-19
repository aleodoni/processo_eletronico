'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`
        DO
        $do$
        BEGIN
            IF NOT EXISTS (SELECT * FROM pg_catalog.pg_roles WHERE rolname = 'usuario.spa2') THEN
                CREATE ROLE "usuario.spa2";
            END IF;
        END
        $do$;
        `);
    },

    down: (queryInterface, Sequelize) => {
        // return queryInterface.sequelize.query('DROP ROLE "usuario.spa2"');
        return queryInterface.sequelize.query('');
    }
};
