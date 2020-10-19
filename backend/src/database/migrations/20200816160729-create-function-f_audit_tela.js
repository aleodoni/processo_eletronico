'use strict';

const functionName = 'spa2.f_audit_tela()';
const sql = `
'declare
Chave     spa2.audit_banco.REG_CHAVE%type;
Coluna    spa2.audit_banco.REG_COLUNA%type;
Data      constant timestamp without time zone:= CURRENT_TIMESTAMP;
Operacao  spa2.audit_banco.REG_OPERACAO%type;
Tabela    constant spa2.audit_banco.REG_TABELA%type := ''tela'';
Terminal  spa2.audit_banco.REG_TERMINAL%type;
Usuario   spa2.audit_banco.REG_LOGIN%type;
Valor     spa2.audit_banco.REG_VALOR_ANTERIOR%type;
begin
-----> Usuário que faz a operação
select session_user, coalesce(inet_client_addr(),''127.0.0.1'') into Usuario, Terminal;
-----> Chave da linha alterada
if (tg_op = ''INSERT'') then
   Chave:= trim(to_char(new.tel_id,''99999999''));
else
   Chave:= trim(to_char(old.tel_id,''99999999''));
end if;

if (tg_op = ''INSERT'') then
   -----> Na inserção não grava valores das COLUNAs
   Operacao:= ''I'';
   Coluna:= NULL;
   Valor:= NULL;
   insert into spa2.audit_banco
     (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
     values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);

elsif (tg_op = ''DELETE'') then
   Operacao := ''D'';
   if old.tel_id is not null then
      Coluna:= ''tel_id'';
      Valor:= trim(to_char(old.tel_id,''99999999''));
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if old.tel_nome is not null then
      Coluna:= ''tel_nome'';
      Valor:= old.tel_nome;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;

elsif (tg_op = ''UPDATE'') then
   Operacao := ''U'';
   if (new.tel_id is distinct from old.tel_id) then
      Coluna:= ''tel_id'';
      Valor:= trim(to_char(old.tel_id,''99999999''));
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;
   if (new.tel_nome is distinct from old.tel_nome) then
      Coluna:= ''tel_nome'';
      Valor:= old.tel_nome;
      insert into spa2.audit_banco
        (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
        values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
   end if;

end if;
if (tg_op = ''DELETE'') then
   return null;
else
   return new;
end if;
end;
';

`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE FUNCTION ${functionName} RETURNS trigger LANGUAGE plpgsql STRICT SECURITY DEFINER AS ${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP FUNCTION ${functionName}`);
    }
};
