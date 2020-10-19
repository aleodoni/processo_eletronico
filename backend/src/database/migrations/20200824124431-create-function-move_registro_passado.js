'use strict';

const functionName = 'spa2.move_registro_passado()';
const sql = `
'  insert into spa2.audit_banco_passado
select *
from spa2.audit_banco;
delete from spa2.audit_banco;

insert into spa2.audit_sistema_passado
select *
from spa2.audit_sistema;
delete from spa2.audit_sistema;
';
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE FUNCTION ${functionName} RETURNS void LANGUAGE sql STRICT AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP FUNCTION ${functionName}`);
    }
};
