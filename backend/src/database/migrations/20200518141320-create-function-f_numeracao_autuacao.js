'use strict';

const functionName = 'spa2.f_numeracao_autuacao()';
const sql = `
  'DECLARE
    id bigint;
    nome_sequence varchar;
  BEGIN
    --> descobre sequence a ser usada
    nome_sequence:= ''pro_'' || to_char(now(),''YYYY'') || ''_seq'';
    --> verifica se a sequence já existe
    perform relname
    from pg_namespace n inner join pg_class c on (n.oid = c.relnamespace)
    where c.relkind = ''S''
      and lower(n.nspname) = ''spa2''
      and lower(c.relname) = nome_sequence;
    --> se não existir, cria
    if not found then
      -- cria
      execute ''create sequence spa2.''|| quote_ident(nome_sequence);
      -- dá permissões necessárias
      execute ''grant select,update on spa2.''|| quote_ident(nome_sequence) || '' to "usuario.spa2"'';
    end if;
    id := nextval(nome_sequence);
    NEW.pro_id = id;
    NEW.pro_numero = id;
    NEW.pro_codigo = to_char(id,''FM00000'')||''/''||to_char(now(),''YYYY'');
    NEW.pro_ano = (to_char(now(),''YYYY''))::integer;
    RETURN NEW;
  END;'
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE FUNCTION ${functionName} RETURNS trigger LANGUAGE plpgsql STRICT SECURITY DEFINER AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP FUNCTION ${functionName}`);
    }
};
