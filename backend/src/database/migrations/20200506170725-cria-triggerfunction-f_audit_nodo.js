'use strict';

const sql = `
  CREATE FUNCTION spa2.f_audit_nodo()
      RETURNS trigger
      LANGUAGE 'plpgsql'
      COST 100
      VOLATILE NOT LEAKPROOF STRICT SECURITY DEFINER
  AS $BODY$
  declare
    Chave     spa2.audit_banco.REG_CHAVE%type;
    Coluna    spa2.audit_banco.REG_COLUNA%type;
    Data      constant timestamp without time zone:= CURRENT_TIMESTAMP;
    Operacao  spa2.audit_banco.REG_OPERACAO%type;
    Tabela    constant spa2.audit_banco.REG_TABELA%type := 'nodo';
    Terminal  spa2.audit_banco.REG_TERMINAL%type;
    Usuario   spa2.audit_banco.REG_LOGIN%type;
    Valor     spa2.audit_banco.REG_VALOR_ANTERIOR%type;
  begin
    -----> Usuário que faz a operação
    select session_user, coalesce(inet_client_addr(),'127.0.0.1') into Usuario, Terminal;
    -----> Chave da linha alterada
    if (tg_op = 'INSERT') then
        Chave:= trim(to_char(new.nod_id,'99999999'));
    else
        Chave:= trim(to_char(old.nod_id,'99999999'));
    end if;

    if (tg_op = 'INSERT') then
        -----> Na inserção não grava valores das COLUNAs
        Operacao:= 'I';
        Coluna:= NULL;
        Valor:= NULL;
        insert into spa2.audit_banco
          (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
          values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);

    elsif (tg_op = 'DELETE') then
        Operacao := 'D';
        if old.nod_id is not null then
          Coluna:= 'nod_id';
          Valor:= trim(to_char(old.nod_id,'99999999'));
          insert into spa2.audit_banco
            (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
            values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
        end if;
        if old.flu_id is not null then
          Coluna:= 'flu_id';
          Valor:= trim(to_char(old.flu_id,'99999999'));
          insert into spa2.audit_banco
            (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
            values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
        end if;
        if old.area_id is not null then
          Coluna:= 'area_id';
          Valor:= old.area_id;
          insert into spa2.audit_banco
            (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
            values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
        end if;
        if old.nod_inicio is not null then
          Coluna:= 'nod_inicio';
          Valor:= old.nod_inicio::text;
          insert into spa2.audit_banco
            (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
            values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
        end if;
        if old.nod_fim is not null then
          Coluna:= 'nod_fim';
          Valor:= old.nod_fim::text;
          insert into spa2.audit_banco
            (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
            values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
        end if;
        
    elsif (tg_op = 'UPDATE') then
        Operacao := 'U';
        if (new.nod_id is distinct from old.nod_id) then
          Coluna:= 'nod_id';
          Valor:= trim(to_char(old.nod_id,'99999999'));
          insert into spa2.audit_banco
            (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
            values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
        end if;
        if (new.flu_id is distinct from old.flu_id) then
          Coluna:= 'flu_id';
          Valor:= trim(to_char(old.flu_id,'99999999'));
          insert into spa2.audit_banco
            (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
            values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
        end if;
        if (new.area_id is distinct from old.area_id) then
          Coluna:= 'area_id';
          Valor:= old.area_id;
          insert into spa2.audit_banco
            (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
            values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
        end if;
        if (new.nod_inicio is distinct from old.nod_inicio) then
          Coluna:= 'nod_inicio';
          Valor:= old.nod_inicio::text;
          insert into spa2.audit_banco
            (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
            values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
        end if;
        if (new.nod_fim is distinct from old.nod_fim) then
          Coluna:= 'nod_fim';
          Valor:= old.nod_fim::text;
          insert into spa2.audit_banco
            (REG_LOGIN, REG_TABELA, REG_CHAVE, REG_DATA, REG_OPERACAO, REG_TERMINAL, REG_COLUNA, REG_VALOR_ANTERIOR)
            values (Usuario, Tabela, Chave, Data, Operacao, Terminal, Coluna, Valor);
        end if;
        
    end if;
    if (tg_op = 'DELETE') then
        return null;
    else
        return new;
    end if;
  end;
  $BODY$;
`;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`${sql}`);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP FUNCTION spa2.f_audit_nodo();`);
    }
};
