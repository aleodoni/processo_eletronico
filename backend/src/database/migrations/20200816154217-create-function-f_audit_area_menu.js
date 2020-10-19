'use strict';

const functionName = 'spa2.f_audit_area_menu()';
const sql = `
'declare
   Chave     spa2.audit_banco.REG_CHAVE%type;
   Coluna    spa2.audit_banco.REG_COLUNA%type;
   Data      constant timestamp without time zone:= CURRENT_TIMESTAMP;
   Operacao  spa2.audit_banco.REG_OPERACAO%type;
   Tabela    constant spa2.audit_banco.REG_TABELA%type := ''area_menu'';
   Terminal  spa2.audit_banco.REG_TERMINAL%type;
   Usuario   spa2.audit_banco.REG_LOGIN%type;
   Valor     spa2.audit_banco.REG_VALOR_ANTERIOR%type;
begin
   -----> Usuário que faz a operação
   select session_user, coalesce(inet_client_addr(),''127.0.0.1'') into Usuario, Terminal;
   -----> Chave da linha alterada
   if (tg_op = ''INSERT'') then
      Chave:= trim(to_char(new.amu_id,''99999999''));
   else
      Chave:= trim(to_char(old.amu_id,''99999999''));
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
      if old.amu_id is not null then
         Coluna:= ''amu_id'';
         Valor:= trim(to_char(old.amu_id,''99999999''));
         insert into spa2.audit_banco
           (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
           values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
      end if;
      if old.set_id is not null then
         Coluna:= ''set_id'';
         Valor:= old.set_id;
         insert into spa2.audit_banco
           (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
           values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
      end if;
      if old.set_id is not null then
         Coluna:= ''mmu_id'';
         Valor:= old.mmu_id;
         insert into spa2.audit_banco
           (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
           values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
      end if;

   elsif (tg_op = ''UPDATE'') then
      Operacao := ''U'';
      if (new.amu_id is distinct from old.amu_id) then
         Coluna:= ''amu_id'';
         Valor:= trim(to_char(old.amu_id,''99999999''));
         insert into spa2.audit_banco
           (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
           values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
      end if;
      if (new.set_id is distinct from old.set_id) then
         Coluna:= ''set_id'';
         Valor:= old.set_id;
         insert into spa2.audit_banco
           (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
           values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
      end if;
      if (new.mmu_id is distinct from old.mmu_id) then
         Coluna:= ''mmu_id'';
         Valor:= old.mmu_id;
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
