'use strict';

const functionName = 'spa2.monta_menu(pai spa2.v_menu, area character varying, rotulopai integer, nivel integer)';
const sql = `
    'DECLARE
        filho        spa2.v_menu;
        retorno      text := '''';
        recuo        text := repeat('' '',nivel * 4);
    BEGIN
        IF nivel = 1 THEN
            retorno = retorno || recuo || ''"id'' || rotuloPai || ''": '' || E''{\n''|| recuo || ''"name":"''|| pai.men_nome || E''",\n'';
        ELSE
            retorno = retorno || recuo || E''{\n''|| recuo || ''"name":"''|| pai.men_nome || E''",\n'';
        END IF;
        IF (pai.men_url is not null) THEN
            retorno = retorno || recuo || ''"url": "''|| pai.men_url || E''"\n'';
        ELSE
            retorno = retorno || recuo || E''"children":[\n'';
            FOR filho IN SELECT *
                FROM spa2.v_menu
                WHERE set_id = area
                  AND men_id_pai = pai.men_id
                ORDER BY men_ordem_pai
            LOOP
                retorno = retorno || spa2.monta_menu(filho, area, rotuloPai * 10, nivel + 1);
            END LOOP;
            retorno = left(retorno, -2) || E''\n''; -- retira última vírgula
            retorno = retorno || recuo || E'']\n'';
        END IF;
        retorno = retorno || recuo || E''},\n'';
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
