'use strict';

const functionName = 'spa2.numerar_processo(ano integer)';
const sql = `
'
declare
  nome_sequence varchar;
begin
--> descobre sequence a ser usada

nome_sequence:= ''pro_'' || to_char(ano,''FM0999'') || ''_seq'';

--> verifica se a sequence já existe
perform relname
from pg_namespace n inner join pg_class c on (n.oid = c.relnamespace)
where c.relkind=''S''
  and lower(n.nspname)=''spa2''  -- namespace = schema
  and lower(c.relname)=nome_sequence;
--> se não existir, cria
if not found then
  -- cria
  execute ''create sequence spa2.''|| quote_ident(nome_sequence);
  -- dá permissões necessárias
  execute ''grant select,update on spa2.''|| quote_ident(nome_sequence) || '' to "usuario.spa2"'';
end if;
--> retorna o próximo valor da sequence
return nextval(''spa2.''||nome_sequence);
end;
';
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE FUNCTION ${functionName} RETURNS integer LANGUAGE plpgsql STRICT SECURITY DEFINER AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP FUNCTION ${functionName}`);
    }
};
