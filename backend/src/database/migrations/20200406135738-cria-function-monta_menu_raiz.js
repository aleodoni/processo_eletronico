'use strict';

const functionName = 'spa2.monta_menu_raiz(area character varying)';
const sql = `
    'DECLARE
        pai   spa2.v_menu;
        retorno text;
        rotuloPai integer := 0;
    BEGIN
        retorno = E''{\n'';
        FOR pai IN
            SELECT
                *
            FROM
                spa2.v_menu
            WHERE
                set_id = area
                AND men_id_pai is null
                ORDER by men_ordem_pai
        LOOP
            rotuloPai = rotuloPai + 1;
            retorno = retorno || spa2.monta_menu(pai, area, rotuloPai, 1);
        END LOOP;
        retorno = left(retorno, -2) || E''\n''; -- retira última vírgula
        retorno = retorno || E''}'';
        RETURN retorno;
    END;'
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE FUNCTION ${functionName} RETURNS text LANGUAGE plpgsql STABLE STRICT AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP FUNCTION ${functionName}`);
    }
};
