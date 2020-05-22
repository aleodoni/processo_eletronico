'use strict';

const functionName = 'spa2.formata_cpf_cnpj(par_cpf character varying)';
const sql = `
'BEGIN
IF char_length(par_cpf) = 11 THEN
RETURN substring(par_cpf FROM 1 FOR 3) || ''.'' || substring(par_cpf FROM 4 FOR 3) || ''.'' || substring(par_cpf FROM 7 FOR 3) || ''-'' || substring(par_cpf FROM 10 FOR 2);
else
IF char_length(par_cpf) = 14 THEN
RETURN substring(par_cpf FROM 1 FOR 2) || ''.'' ||
substring(par_cpf FROM 3 FOR 3) || ''.'' ||
substring(par_cpf FROM 6 FOR 3) || ''/'' ||
substring(par_cpf FROM 9 FOR 4) || ''-'' ||
substring(par_cpf FROM 13 FOR 2);
else
Return '' '';
END IF;
END IF;
END;
';
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE FUNCTION ${functionName} RETURNS character varying LANGUAGE plpgsql STRICT SECURITY DEFINER AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP FUNCTION ${functionName}`);
    }
};
